import { SalesSystemDashboard } from "./dashboard-shell";
import type { CurrentUser } from "./types";

export function SalesSystemLandingPage({ currentUser }: { currentUser: CurrentUser }) {
  return <SalesSystemDashboard currentUser={currentUser} />;
}
