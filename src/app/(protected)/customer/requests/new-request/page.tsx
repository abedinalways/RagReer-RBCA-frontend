import { Metadata } from "next";
import { NewRequest } from "@/features/customer/my-requests/components/NewRequest";
import { parseStepParam } from "@/features/customer/my-requests/utils/newRequestSteps.utils";

export const metadata: Metadata = { title: "New Requests" };

/**
 * The active wizard step is read from the URL (`?step=2`) on the server and
 * handed to the client form, so a refresh renders that same step directly
 * instead of restarting from step 1.
 */
export default async function NewRequestPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { step } = await searchParams;

  return <NewRequest initialStep={parseStepParam(step)} />;
}
