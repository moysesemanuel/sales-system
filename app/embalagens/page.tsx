import { redirect } from "next/navigation";
import { getCurrentAppSession } from "@/lib/auth";
import { SalesSystemDashboard } from "@/components/projects/sales-system/dashboard-shell";

export default async function Page() {
  const session = await getCurrentAppSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <SalesSystemDashboard
      currentUser={session.user}
      initialMenuItem="Embalagens"
    />
  );
}
