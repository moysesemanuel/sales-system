import { SalesSystemDashboard } from "@/components/projects/sales-system/dashboard-shell";

export default function Page() {
  const currentUser = {
    name: "Moyses Emanuel",
    email: "moyses@email.com",
  };

  return (
    <SalesSystemDashboard
      currentUser={currentUser}
      initialMenuItem="Dados da empresa"
    />
  );
}