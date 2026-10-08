"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import {
  PortfolioConsolidatedInvoice,
  MonthlyStatementItem,
  StatementDetailData,
  BillingHistoryItem,
} from "../../types/invoicesTypes";
import {
  PORTFOLIO_CONSOLIDATED_INVOICES,
  MONTHLY_STATEMENTS_DATA,
  getStatementDetailData,
} from "../../data/invoicesData";
import { ReusableTable } from "@/components/reusable/ReusableTable";
import { CustomSelect } from "@/components/ui/CustomSelect";
import {
  createPortfolioInvoicesColumns,
  createMonthlyStatementsColumns,
} from "./PortfolioConsolidatedColumns";
import StatementDetailsModal from "./StatementDetailsModal";
import PaymentReceiptModal from "../PaymentReceiptModal";

export type PortfolioTab = "invoices" | "statements";

export interface PortfolioConsolidatedInvoicesProps {
  initialTab?: PortfolioTab;
}

export const PortfolioConsolidatedInvoices: React.FC<
  PortfolioConsolidatedInvoicesProps
> = ({ initialTab = "invoices" }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<PortfolioTab>(initialTab);

  // Invoices Tab State
  const [invoices] = useState<PortfolioConsolidatedInvoice[]>(
    PORTFOLIO_CONSOLIDATED_INVOICES
  );
  const [invoiceSearchQuery, setInvoiceSearchQuery] = useState("");
  const [invoiceStatus, setInvoiceStatus] = useState("All Status");
  const [invoicePage, setInvoicePage] = useState(1);
  const [invoiceItemsPerPage, setInvoiceItemsPerPage] = useState(25);

  // Statements Tab State
  const [statements] = useState<MonthlyStatementItem[]>(
    MONTHLY_STATEMENTS_DATA
  );
  const [statementSearchQuery, setStatementSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("2026");
  const [selectedMonth, setSelectedMonth] = useState("All Month");
  const [statementPage, setStatementPage] = useState(1);
  const [statementItemsPerPage, setStatementItemsPerPage] = useState(25);

  // Modals State
  const [selectedStatement, setSelectedStatement] =
    useState<StatementDetailData | null>(null);
  const [isStatementModalOpen, setIsStatementModalOpen] = useState(false);

  const [receiptModalData, setReceiptModalData] =
    useState<BillingHistoryItem | null>(null);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);

  // Filtered Invoices
  const filteredInvoices = useMemo(() => {
    return invoices.filter((inv) => {
      const matchesSearch =
        invoiceSearchQuery.trim() === "" ||
        inv.id.toLowerCase().includes(invoiceSearchQuery.toLowerCase()) ||
        inv.propertiesCount.toLowerCase().includes(invoiceSearchQuery.toLowerCase()) ||
        inv.paymentType.toLowerCase().includes(invoiceSearchQuery.toLowerCase());

      const matchesStatus =
        invoiceStatus === "All Status" ? true : inv.status === invoiceStatus;

      return matchesSearch && matchesStatus;
    });
  }, [invoices, invoiceSearchQuery, invoiceStatus]);

  // Filtered Statements
  const filteredStatements = useMemo(() => {
    return statements.filter((stmt) => {
      const matchesSearch =
        statementSearchQuery.trim() === "" ||
        stmt.month.toLowerCase().includes(statementSearchQuery.toLowerCase()) ||
        stmt.propertiesCount.toLowerCase().includes(statementSearchQuery.toLowerCase());

      const matchesYear =
        selectedYear === "All Year" ? true : stmt.month.includes(selectedYear);

      const matchesMonth =
        selectedMonth === "All Month"
          ? true
          : stmt.month.toLowerCase().includes(selectedMonth.toLowerCase());

      return matchesSearch && matchesYear && matchesMonth;
    });
  }, [statements, statementSearchQuery, selectedYear, selectedMonth]);

  // Handle Action - View Receipt for Invoices
  const handleViewReceipt = (invoice: PortfolioConsolidatedInvoice) => {
    setReceiptModalData({
      id: "rcpt-" + invoice.rawId,
      transactionId: "#TX 12458",
      billedTo: "Sarah Sidd",
      paymentCompletionDate: invoice.issueDate,
      amount: invoice.amount,
      paymentMethod: "Online Payment",
      companyName: "Coastline Property Group",
      companyCategory: "Portfolio Management",
      invoiceId: invoice.id,
      completedService: "Consolidated Billing - " + invoice.propertiesCount,
      totalVisit: "18",
      serviceCompletionDate: invoice.servicePeriod,
    });
    setIsReceiptModalOpen(true);
  };

  // Handle Action - View Details for Invoices
  const handleViewInvoiceDetails = (invoice: PortfolioConsolidatedInvoice) => {
    router.push(`/customer/invoices/${invoice.rawId || "inv-1024"}`);
  };

  // Handle Action - View Statement Modal
  const handleViewStatement = (item: MonthlyStatementItem) => {
    const detailData = getStatementDetailData(item.month);
    setSelectedStatement(detailData);
    setIsStatementModalOpen(true);
  };

  // Handle Download Single Statement
  const handleDownloadStatement = (item: MonthlyStatementItem) => {
    console.log("Downloading statement for:", item.month);
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  // Handle Download All Statements
  const handleDownloadAllStatements = () => {
    console.log("Downloading all monthly statements for year:", selectedYear);
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  // Invoices Columns
  const invoiceColumns = useMemo(
    () =>
      createPortfolioInvoicesColumns({
        onViewReceipt: handleViewReceipt,
        onViewDetails: handleViewInvoiceDetails,
      }),
    []
  );

  // Statements Columns
  const statementColumns = useMemo(
    () =>
      createMonthlyStatementsColumns({
        onView: handleViewStatement,
        onDownload: handleDownloadStatement,
      }),
    []
  );

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Segmented Tab Switcher matching Figma Screenshot 1, 2, 3 */}
      <div className="flex items-center gap-1 bg-[#F2F4F7] p-1 rounded-sm w-fit border border-border/40">
        <button
          type="button"
          onClick={() => setActiveTab("invoices")}
          className={`px-5 py-2 text-xs sm:text-sm font-medium rounded-xs transition-all cursor-pointer ${
            activeTab === "invoices"
              ? "bg-primary text-white shadow-2xs"
              : "text-secondary-subheading hover:text-txt-primary hover:bg-white/40"
          }`}
        >
          Invoices
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("statements")}
          className={`px-5 py-2 text-xs sm:text-sm font-medium rounded-xs transition-all cursor-pointer ${
            activeTab === "statements"
              ? "bg-primary text-white shadow-2xs"
              : "text-secondary-subheading hover:text-txt-primary hover:bg-white/40"
          }`}
        >
          Statements
        </button>
      </div>

      {/* Main Content Card matching Figma Screenshots */}
      <div className="bg-card-bg rounded-sm border border-border shadow-2xs">
        {activeTab === "invoices" ? (
          /* TAB 1: ALL INVOICES (Figma Screenshots 1 & 2) */
          <div>
            {/* Header with Search and Filter */}
            <div className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <h2 className="text-lg md:text-xl font-medium text-primary-heading">
                All Invoices
              </h2>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {/* Search Input */}
                <div className="relative w-full sm:w-56">
                  <Search className="w-4 h-4 text-secondary-subheading absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={invoiceSearchQuery}
                    onChange={(e) => {
                      setInvoiceSearchQuery(e.target.value);
                      setInvoicePage(1);
                    }}
                    placeholder="Type to search"
                    className="w-full h-9 pl-9 pr-3 border border-border bg-input-bg rounded-md text-xs sm:text-sm text-txt-primary placeholder:text-secondary-subheading/70 focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary/50"
                  />
                </div>

                {/* Status Dropdown */}
                <div className="w-full sm:w-36">
                  <CustomSelect
                    value={invoiceStatus}
                    onChange={(val) => {
                      setInvoiceStatus(val);
                      setInvoicePage(1);
                    }}
                    options={["All Status", "Paid", "Due"]}
                    size="sm"
                    align="right"
                  />
                </div>
              </div>
            </div>

            {/* Invoices Table */}
            {filteredInvoices.length === 0 ? (
              <div className="p-8 text-center text-sm text-secondary-subheading">
                No invoices match your filter or search criteria.
                <button
                  type="button"
                  onClick={() => {
                    setInvoiceSearchQuery("");
                    setInvoiceStatus("All Status");
                  }}
                  className="block mx-auto mt-2 text-xs text-primary hover:underline font-medium cursor-pointer"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              <ReusableTable
                data={filteredInvoices}
                columns={invoiceColumns}
                keyExtractor={(item, idx) => item.rawId || idx}
                pagination={{
                  currentPage: invoicePage,
                  itemsPerPage: invoiceItemsPerPage,
                  onPageChange: setInvoicePage,
                  onItemsPerPageChange: setInvoiceItemsPerPage,
                }}
              />
            )}
          </div>
        ) : (
          /* TAB 2: MONTHLY STATEMENTS (Figma Screenshot 3) */
          <div>
            {/* Header with Search, Year, Month, Download All */}
            <div className="p-4 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-3">
              <h2 className="text-lg md:text-xl font-medium text-primary-heading shrink-0">
                Monthly Statements
              </h2>

              <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3">
                {/* Search Input */}
                <div className="relative w-full sm:w-52">
                  <Search className="w-4 h-4 text-secondary-subheading absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={statementSearchQuery}
                    onChange={(e) => {
                      setStatementSearchQuery(e.target.value);
                      setStatementPage(1);
                    }}
                    placeholder="Type to search"
                    className="w-full h-9 pl-9 pr-3 border border-border bg-input-bg rounded-md text-xs sm:text-sm text-txt-primary placeholder:text-secondary-subheading/70 focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary/50"
                  />
                </div>

                {/* Year Select */}
                <div className="w-full sm:w-28">
                  <CustomSelect
                    value={selectedYear}
                    onChange={(val) => {
                      setSelectedYear(val);
                      setStatementPage(1);
                    }}
                    options={["2026", "2025", "2024", "All Year"]}
                    size="sm"
                    align="right"
                  />
                </div>

                {/* Month Select */}
                <div className="w-full sm:w-32">
                  <CustomSelect
                    value={selectedMonth}
                    onChange={(val) => {
                      setSelectedMonth(val);
                      setStatementPage(1);
                    }}
                    options={[
                      "All Month",
                      "July",
                      "August",
                      "September",
                      "October",
                      "November",
                      "December",
                    ]}
                    size="sm"
                    align="right"
                  />
                </div>

                {/* Download All Button matching Figma Screenshot 3 */}
                <button
                  type="button"
                  onClick={handleDownloadAllStatements}
                  className="bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-medium px-4 py-2 rounded-xs shadow-2xs transition-colors cursor-pointer whitespace-nowrap text-center"
                >
                  Download All
                </button>
              </div>
            </div>

            {/* Statements Table */}
            {filteredStatements.length === 0 ? (
              <div className="p-8 text-center text-sm text-secondary-subheading">
                No monthly statements found for the selected period.
                <button
                  type="button"
                  onClick={() => {
                    setStatementSearchQuery("");
                    setSelectedYear("2026");
                    setSelectedMonth("All Month");
                  }}
                  className="block mx-auto mt-2 text-xs text-primary hover:underline font-medium cursor-pointer"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              <ReusableTable
                data={filteredStatements}
                columns={statementColumns}
                keyExtractor={(item, idx) => item.id || idx}
                pagination={{
                  currentPage: statementPage,
                  itemsPerPage: statementItemsPerPage,
                  onPageChange: setStatementPage,
                  onItemsPerPageChange: setStatementItemsPerPage,
                }}
              />
            )}
          </div>
        )}
      </div>

      {/* Statement Details Modal (Figma Screenshot 4) */}
      {selectedStatement && (
        <StatementDetailsModal
          isOpen={isStatementModalOpen}
          onClose={() => {
            setIsStatementModalOpen(false);
            setSelectedStatement(null);
          }}
          statementData={selectedStatement}
          onDownload={() => {
            console.log("Download statement:", selectedStatement.statementTitle);
            if (typeof window !== "undefined") {
              window.print();
            }
          }}
        />
      )}

      {/* Payment Receipt Modal */}
      {receiptModalData && (
        <PaymentReceiptModal
          isOpen={isReceiptModalOpen}
          onClose={() => {
            setIsReceiptModalOpen(false);
            setReceiptModalData(null);
          }}
          receiptData={receiptModalData}
        />
      )}
    </div>
  );
};

export default PortfolioConsolidatedInvoices;
