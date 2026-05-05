import { SalesSystemDashboard } from "./dashboard-shell";

import { DabiLoading } from "./dabi-loading";
import type { CurrentUser } from "./types";

export function SalesSystemLandingPage({
  currentUser: _currentUser,
}: {
  currentUser: CurrentUser;
}) {
  return <DabiLoading />;
}