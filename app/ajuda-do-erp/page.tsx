import { redirect } from "next/navigation";
import { getCurrentAppSession } from "@/lib/auth";
import { HelpErpContent } from "@/components/projects/sales-system/help-erp-content";

export default async function Page() {
  const session = await getCurrentAppSession();

  if (!session) {
    redirect("/login");
  }

  return <HelpErpContent currentUser={session.user} />;
}
