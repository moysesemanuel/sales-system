import { SalesSystemDashboard } from "@/components/projects/sales-system/dashboard-shell";
import type { CurrentUser } from "@/components/projects/sales-system/types";

const mockCurrentUser: CurrentUser = {
    id: "user-1",
    name: "Moyses Emanuel",
    email: "moyses@example.com",
    role: "admin" as CurrentUser["role"],
    createdAt: new Date().toISOString(),
};

export default function ControleDeEstoquesPage() {
    return (
        <SalesSystemDashboard
            currentUser={mockCurrentUser}
            initialMenuItem="Controle de Estoques"
        />
    );
}