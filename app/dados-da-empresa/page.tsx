import { SalesSystemDashboard } from "@/components/projects/sales-system/dashboard-shell";
import { mockCurrentUser } from "@/components/projects/sales-system/mock-current-user";

export default function Page() {
  return (
    <SalesSystemDashboard
      currentUser={mockCurrentUser}
      initialMenuItem="Dados da empresa"
    />
  );
}