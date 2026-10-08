"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import {
  PortfolioSeparateInvoice,
  SeparateMonthlyStatementGroup,
  SeparateStatementPropertyItem,
  StatementDetailData,
  BillingHistoryItem,
} from "../../types/invoicesTypes";
import {
  PORTFOLIO_SEPARATE_INVOICES,
  SEPARATE_MONTHLY_STATEMENTS_DATA,
  getSinglePropertyStatementDetailData,
} from "../../data/invoicesData";
import { ReusableTable } from "@/components/reusable/ReusableTable";
import { Pagination } from "@/components/reusable/Pagination";
import { CustomSelect } from "@/components/ui/CustomSelect";
import {
  createPortfolioSeparateInvoicesColumns,
  createSeparateStatementItemsColumns,
} from "./PortfolioSeparateColumns";
import StatementDetailsModal from "./StatementDetailsModal";
import PaymentReceiptModal from "../PaymentReceiptModal";

export type PortfolioTab = "invoices" | "statements";

export interface PortfolioSeparateInvoicesProps {
  initialTab?: PortfolioTab;
}

export const PortfolioSeparateInvoices: React.FC<
  PortfolioSeparateInvoicesProps
> = ({ initialTab = "invoices" }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<PortfolioTab>(initialTab);

  // Invoices Tab State
  const [invoices] = useState<PortfolioSeparateInvoice[]>(
    PORTFOLIO_SEPARATE_INVOICES
  );
  const [invoiceSearchQuery, setInvoiceSearchQuery] = useState("");
  const [invoiceStatus, setInvoiceStatus] = useState("All Status");
  const [invoicePage, setInvoicePage] = useState(1);
  const [invoiceItemsPerPage, setInvoiceItemsPerPage] = useState(25);

  // Statements Tab State
  const [statementGroups] = useState<SeparateMonthlyStatementGroup[]>(
    SEPARATE_MONTHLY_STATEMENTS_DATA
  );
  const [expandedGroupIds, setExpandedGroupIds] = useState<string[]>([
    "group-aug-2026",
  ]);
  const [statementSearchQuery, setStatementSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("2026");
  const [selectedMonth, setSelectedMonth] = useState("All Month");
  const [selectedProperty, setSelectedProperty] = useState("All Properties");
  const [statementPage, setStatementPage] = useState(1);
  const [statementItemsPerPage, setStatementItemsPerPage] = useState(25);

  // Modals State
  const [selectedStatement, setSelectedStatement] =
    useState<StatementDetailData | null>(null);
  const [isStatementModalOpen, setIsStatementModalOpen] = useState(false);

  const [receiptModalData, setReceiptModalData] =
    useState<BillingHistoryItem | null>(null);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);

  // Toggle Accordion Group
  const toggleGroup = (groupId: string) => {
    setExpandedGroupIds((prev) =>
      prev.includes(groupId)
        ? prev.filter((id) => id !== groupId)
        : [...prev, groupId]
    );
  };

  // Filtered Invoices for Tab 1
  const filteredInvoices = useMemo(() => {
    return invoices.filter((inv) => {
      const matchesSearch =
        invoiceSearchQuery.trim() === "" ||
        inv.id.toLowerCase().includes(invoiceSearchQuery.toLowerCase()) ||
        inv.propertyAddress
          .toLowerCase()
          .includes(invoiceSearchQuery.toLowerCase()) ||
        inv.serviceType
          .toLowerCase()
          .includes(invoiceSearchQuery.toLowerCase());

      const matchesStatus =
        invoiceStatus === "All Status" ? true : inv.status === invoiceStatus;

      return matchesSearch && matchesStatus;
    });
  }, [invoices, invoiceSearchQuery, invoiceStatus]);

  // Filtered Statement Groups for Tab 2
  const filteredStatementGroups = useMemo(() => {
    return statementGroups
      .map((group) => {
        const matchesYear =
          selectedYear === "All Year"
            ? true
            : group.month.includes(selectedYear);

        const matchesMonth =
          selectedMonth === "All Month"
            ? true
            : group.month.toLowerCase().includes(selectedMonth.toLowerCase());

        if (!matchesYear || !matchesMonth) return null;

        // Filter items inside group based on search and property dropdown
        const filteredItems = group.items.filter((item) => {
          const matchesSearch =
            statementSearchQuery.trim() === "" ||
            item.propertyAddress
              .toLowerCase()
              .includes(statementSearchQuery.toLowerCase()) ||
            group.month
              .toLowerCase()
              .includes(statementSearchQuery.toLowerCase());

          const matchesProp =
            selectedProperty === "All Properties"
              ? true
              : item.propertyAddress.toLowerCase() ===
                selectedProperty.toLowerCase();

          return matchesSearch && matchesProp;
        });

        if (
          filteredItems.length === 0 &&
          (statementSearchQuery.trim() !== "" ||
            selectedProperty !== "All Properties")
        ) {
          return null;
        }

        return {
          ...group,
          items: filteredItems,
        };
      })
      .filter(Boolean) as SeparateMonthlyStatementGroup[];
  }, [
    statementGroups,
    statementSearchQuery,
    selectedYear,
    selectedMonth,
    selectedProperty,
  ]);

  // Handle View Receipt on Tab 1
  const handleViewReceipt = (invoice: PortfolioSeparateInvoice) => {
    setReceiptModalData({
      id: "rcpt-" + invoice.rawId,
      transactionId: "#TX 12458",
      billedTo: "Sarah Sidd",
      paymentCompletionDate: invoice.issueDate,
      amount: invoice.amount,
      paymentMethod: "Online",
      companyName: "HALF STACHE",
      companyCategory: "Lawn Care",
      invoiceId: invoice.id,
      propertyAddress: invoice.propertyAddress,
      completedService: invoice.serviceType,
      totalVisit: "03",
      serviceCompletionDate: "Aug 27, 2026",
    });
    setIsReceiptModalOpen(true);
  };

  // Handle View Details on Tab 1
  const handleViewInvoiceDetails = (invoice: PortfolioSeparateInvoice) => {
    router.push(`/customer/invoices/${invoice.rawId || "inv-1024"}`);
  };

  // Handle View Statement Modal on Tab 2
  const handleViewStatementItem = (
    item: SeparateStatementPropertyItem,
    monthName: string
  ) => {
    const detail = getSinglePropertyStatementDetailData(
      item.propertyAddress,
      monthName.slice(0, 3) + " " + monthName.slice(-4)
    );
    setSelectedStatement(detail);
    setIsStatementModalOpen(true);
  };

  // Handle Download Single Statement Item
  const handleDownloadStatementItem = (
    item: SeparateStatementPropertyItem
  ) => {
    console.log("Download statement for property:", item.propertyAddress);
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  // Handle Download All
  const handleDownloadAll = () => {
    console.log(
      "Download all statements for separate billing, year:",
      selectedYear
    );
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  // Invoices Columns
  const invoiceColumns = useMemo(
    () =>
      createPortfolioSeparateInvoicesColumns({
        onViewReceipt: handleViewReceipt,
        onViewDetails: handleViewInvoiceDetails,
      }),
    []
  );

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Segmented Tab Switcher matching Figma Screenshots */}
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

      {/* Main Content Card */}
      <div className="bg-card-bg rounded-sm border border-border shadow-2xs">
        {activeTab === "invoices" ? (
          /* TAB 1: ALL INVOICES (Separate Billing - Figma Screenshot 1) */
          <div>
            {/* Header Section */}
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
          /* TAB 2: MONTHLY STATEMENTS ACCORDION (Separate Billing - Figma Screenshot 3) */
          <div>
            {/* Header with Search, Year, Month, Properties, Download All */}
            <div className="p-4 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-3">
              <h2 className="text-lg md:text-xl font-medium text-primary-heading shrink-0">
                Monthly Statements
              </h2>

              <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3">
                {/* Search Input */}
                <div className="relative w-full sm:w-48">
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
                <div className="w-full sm:w-26">
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
                <div className="w-full sm:w-30">
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
                    ]}
                    size="sm"
                    align="right"
                  />
                </div>

                {/* Properties Select (New for Separate Billing) */}
                <div className="w-full sm:w-36">
                  <CustomSelect
                    value={selectedProperty}
                    onChange={(val) => {
                      setSelectedProperty(val);
                      setStatementPage(1);
                    }}
                    options={[
                      "All Properties",
                      "124 Oak Street",
                      "82 Birch Road, Unit 4",
                      "907 Spruce Street, Suite 5",
                      "789 Elm Avenue, Floor 3",
                      "402 Oak Drive, Building B",
                    ]}
                    size="sm"
                    align="right"
                  />
                </div>

                {/* Download All Button */}
                <button
                  type="button"
                  onClick={handleDownloadAll}
                  className="bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-medium px-4 py-2 rounded-xs shadow-2xs transition-colors cursor-pointer whitespace-nowrap text-center"
                >
                  Download All
                </button>
              </div>
            </div>

            {/* Accordion List matching Figma Screenshot 3 */}
            <div className="border-t border-border">
              {filteredStatementGroups.length === 0 ? (
                <div className="p-8 text-center text-sm text-secondary-subheading">
                  No monthly statements found for the selected period.
                  <button
                    type="button"
                    onClick={() => {
                      setStatementSearchQuery("");
                      setSelectedYear("2026");
                      setSelectedMonth("All Month");
                      setSelectedProperty("All Properties");
                    }}
                    className="block mx-auto mt-2 text-xs text-primary hover:underline font-medium cursor-pointer"
                  >
                    Reset filters
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {filteredStatementGroups.map((group) => {
                    const isExpanded = expandedGroupIds.includes(group.id);

                    const nestedColumns = createSeparateStatementItemsColumns({
                      onView: (item) =>
                        handleViewStatementItem(item, group.month),
                      onDownload: handleDownloadStatementItem,
                    });

                    return (
                      <div key={group.id} className="w-full">
                        {/* Accordion Bar Header */}
                        <button
                          type="button"
                          onClick={() => toggleGroup(group.id)}
                          className="w-full py-3.5 px-4 sm:px-5 flex items-center justify-between text-left hover:bg-page-bg/50 transition-colors cursor-pointer"
                        >
                          <div className="flex items-center gap-2.5">
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4 text-secondary-subheading shrink-0" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-secondary-subheading shrink-0" />
                            )}
                            <span className="text-xs sm:text-sm md:text-base font-medium text-txt-primary">
                              {group.month} - {group.propertiesCount} - Amount{" "}
                              {group.totalAmount}
                            </span>
                          </div>
                        </button>

                        {/* Accordion Expanded Content: Nested Table */}
                        {isExpanded && (
                          <div className="border-t border-border-subtle bg-card-bg">
                            <ReusableTable
                              data={group.items}
                              columns={nestedColumns}
                              keyExtractor={(item) => item.id}
                              emptyMessage="No properties found for this statement."
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Pagination at the bottom matching Figma */}
            <div className="border-t border-border">
              <Pagination
                currentPage={statementPage}
                totalPages={4}
                itemsPerPage={statementItemsPerPage}
                onPageChange={setStatementPage}
                onItemsPerPageChange={setStatementItemsPerPage}
                pageSizeOptions={[10, 25, 50]}
              />
            </div>
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
            console.log(
              "Download statement:",
              selectedStatement.statementTitle
            );
            if (typeof window !== "undefined") {
              window.print();
            }
          }}
        />
      )}

      {/* Payment Receipt Modal (Figma Screenshot 2) */}
      {receiptModalData && (
        <PaymentReceiptModal
          isOpen={isReceiptModalOpen}
          onClose={() => {
            setIsReceiptModalOpen(false);
            setReceiptModalData(null);
          }}
          receiptData={{
            transactionId: receiptModalData.transactionId,
            customerName: receiptModalData.billedTo,
            propertyAddress: receiptModalData.propertyAddress,
            paymentDate: receiptModalData.paymentCompletionDate,
            totalPaid: receiptModalData.amount,
            paymentMethod: receiptModalData.paymentMethod,
            invoiceId: receiptModalData.invoiceId,
            companyName: receiptModalData.companyName,
            companyCategory: receiptModalData.companyCategory,
            completedService: receiptModalData.completedService,
            totalVisit: receiptModalData.totalVisit,
            serviceCompletionDate: receiptModalData.serviceCompletionDate,
          }}
        />
      )}
    </div>
  );
};

export default PortfolioSeparateInvoices;
