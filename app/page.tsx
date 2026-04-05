import { redirectToLogin, getCurrentAppSession } from "@/lib/auth";
import { SalesSystemLandingPage } from "@/components/projects/sales-system/landing-page";

export default async function Page() {
  const session = await getCurrentAppSession();

  if (!session) {
    redirectToLogin();
  }

  return <SalesSystemLandingPage />;
}
