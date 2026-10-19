import { PayrollItem, PayrollMetrics } from "../types";

/**
 * Downloads a structured CSV file of the payroll items.
 */
export function exportPayrollCsv(
  items: PayrollItem[],
  periodLabel: string
) {
  const headers = [
    "Crew Member",
    "Email",
    "Hours",
    "Hourly Rate",
    "Total Payable Amount",
    "Status",
  ];

  const rows = items.map((item) => [
    `"${item.name}"`,
    `"${item.email}"`,
    `"${item.hours}"`,
    `"${item.rate}"`,
    `"${item.totalPayable}"`,
    `"${item.status}"`,
  ]);

  const csvContent =
    "data:text/csv;charset=utf-8," +
    [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute(
    "download",
    `payroll_${periodLabel.replace(/[^a-zA-Z0-9]/g, "_")}.csv`
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Generates an executive print/PDF report of the payroll data.
 */
export function exportPayrollPdf(
  items: PayrollItem[],
  metrics: PayrollMetrics,
  periodLabel: string
) {
  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    if (typeof window !== "undefined") {
      window.print();
    }
    return;
  }

  const currentDate = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <title>Payroll Report - ${periodLabel}</title>
        <style>
          * { box-sizing: border-box; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            margin: 0;
            padding: 36px;
            color: #1e293b;
            background: #ffffff;
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            border-bottom: 2px solid #5980A6;
            padding-bottom: 20px;
            margin-bottom: 24px;
          }
          .brand-title {
            font-size: 22px;
            font-weight: 800;
            color: #0f172a;
            margin: 0;
            text-transform: uppercase;
            letter-spacing: -0.5px;
          }
          .doc-title {
            font-size: 15px;
            font-weight: 600;
            color: #5980A6;
            margin-top: 4px;
          }
          .period-pill {
            display: inline-block;
            background: #f1f5f9;
            color: #475569;
            padding: 3px 10px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 500;
            margin-top: 6px;
          }
          .meta-info {
            text-align: right;
            font-size: 12px;
            color: #64748b;
          }
          .meta-bold {
            font-weight: 700;
            color: #0f172a;
            font-size: 13px;
          }
          .metrics-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 14px;
            margin-bottom: 24px;
          }
          .metric-box {
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 12px 14px;
            background: #f8fafc;
          }
          .metric-lbl {
            font-size: 11px;
            font-weight: 600;
            color: #64748b;
            text-transform: uppercase;
          }
          .metric-val {
            font-size: 18px;
            font-weight: 800;
            color: #5980A6;
            margin-top: 4px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 13px;
            margin-top: 8px;
          }
          th {
            background-color: #f1f5f9;
            color: #475569;
            font-weight: 600;
            text-align: left;
            padding: 10px 14px;
            border-bottom: 1.5px solid #cbd5e1;
            font-size: 12px;
          }
          td {
            padding: 10px 14px;
            border-bottom: 1px solid #f1f5f9;
            color: #334155;
          }
          tr:nth-child(even) td {
            background-color: #fcfdfe;
          }
          .col-name {
            font-weight: 600;
            color: #0f172a;
          }
          .col-email {
            font-size: 11px;
            color: #64748b;
          }
          .col-amount {
            text-align: right;
            font-weight: 700;
            color: #0f172a;
          }
          .footer-note {
            margin-top: 36px;
            padding-top: 16px;
            border-top: 1px solid #e2e8f0;
            font-size: 11px;
            color: #94a3b8;
            display: flex;
            justify-content: space-between;
          }
          @media print {
            body { padding: 0; }
            @page { margin: 1.5cm; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <h1 class="brand-title">HALF STACHE</h1>
            <div class="doc-title">Staff Payroll Summary</div>
            <div class="period-pill">Pay Period: ${periodLabel}</div>
          </div>
          <div class="meta-info">
            <div class="meta-bold">Admin Console</div>
            <div>Generated: ${currentDate}</div>
            <div>Status: Operational</div>
          </div>
        </div>

        <div class="metrics-grid">
          <div class="metric-box">
            <div class="metric-lbl">Total Crew</div>
            <div class="metric-val">${metrics.totalCrew}</div>
          </div>
          <div class="metric-box">
            <div class="metric-lbl">Total Hours</div>
            <div class="metric-val">${metrics.totalHours}</div>
          </div>
          <div class="metric-box">
            <div class="metric-lbl">Avg. Hourly Rate</div>
            <div class="metric-val">${metrics.avgHourlyRate}</div>
          </div>
          <div class="metric-box">
            <div class="metric-lbl">Total Payable</div>
            <div class="metric-val">${metrics.totalPayable}</div>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Crew Member</th>
              <th>Hours</th>
              <th>Hourly Rate</th>
              <th>Status</th>
              <th style="text-align: right;">Total Payable Amount</th>
            </tr>
          </thead>
          <tbody>
            ${items
              .map(
                (item) => `
              <tr>
                <td>
                  <div class="col-name">${item.name}</div>
                  <div class="col-email">${item.email}</div>
                </td>
                <td>${item.hours}</td>
                <td>${item.rate}</td>
                <td>${item.status}</td>
                <td class="col-amount">${item.totalPayable}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>

        <div class="footer-note">
          <span>Half Stache RBCA Management Portal • Confidential Document</span>
          <span>Page 1 of 1</span>
        </div>

        <script>
          window.onload = function() {
            window.focus();
            window.print();
          };
        </script>
      </body>
    </html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();
}
