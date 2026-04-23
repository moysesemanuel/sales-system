import { redirect } from "next/navigation";
import { getCurrentAppSession } from "@/lib/auth";
import { SalesSystemLandingPage } from "@/components/projects/sales-system/landing-page";

export default async function Page() {
  const session = await getCurrentAppSession();

  if (!session) {
    redirect("/login");
  }

  return <SalesSystemLandingPage currentUser={session.user} />;
}