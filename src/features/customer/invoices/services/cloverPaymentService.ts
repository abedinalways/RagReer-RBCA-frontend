/**
 * Clover Payment Gateway Service
 *
 * This service handles the integration with Clover's Hosted Checkout and E-Commerce API:
 * Reference: https://docs.clover.com/docs/ecommerce-accepting-payments-hosted-checkout
 *
 * Integration Architecture:
 * 1. Frontend requests a hosted checkout session from backend with invoice & amount details.
 * 2. Backend authenticates with Clover merchant API and returns the secure checkoutUrl.
 * 3. Frontend redirects the user's browser: window.location.href = checkoutUrl.
 * 4. User completes payment on Clover's PCI-compliant hosted page.
 * 5. Clover redirects back to successUrl (?payment=success&tx=...) or cancelUrl (?payment=failed).
 *
 * When the real backend endpoint is ready, simply uncomment the production fetch call below.
 * No UI components will need modification!
 */

export interface CloverCheckoutParams {
  invoiceId: string;
  amount: string;
  customerName?: string;
  customerEmail?: string;
  successUrl: string;
  cancelUrl: string;
}

export async function initiateCloverCheckout(
  params: CloverCheckoutParams,
  options?: { simulateFailure?: boolean }
): Promise<void> {
  // ==========================================================
  // [PRODUCTION INTEGRATION] - Uncomment when backend API is live:
  // ==========================================================
  /*
  const response = await fetch("/api/payments/clover/create-checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      invoiceId: params.invoiceId,
      amount: params.amount,
      customerName: params.customerName,
      customerEmail: params.customerEmail,
      successUrl: params.successUrl,
      cancelUrl: params.cancelUrl,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to initialize Clover payment session");
  }

  const { checkoutUrl } = await response.json();
  if (checkoutUrl) {
    window.location.href = checkoutUrl;
    return;
  }
  */

  // ==========================================================
  // [CLIENT DEMO / PRE-BACKEND SIMULATION]
  // Simulates network latency for Clover session creation
  // and redirects to return callback with exact Clover parameters.
  // ==========================================================
  await new Promise((resolve) => setTimeout(resolve, 800));

  if (options?.simulateFailure) {
    window.location.href = `${params.cancelUrl}${params.cancelUrl.includes("?") ? "&" : "?"}payment=failed&reason=card_declined`;
  } else {
    window.location.href = `${params.successUrl}${params.successUrl.includes("?") ? "&" : "?"}payment=success&tx=TX-12458`;
  }
}
