import type { CurrentUser } from "./types";

export const mockCurrentUser: CurrentUser = {
  id: "user-1",
  name: "Moyses Emanuel",
  email: "moyses@email.com",
  role: "admin" as CurrentUser["role"],
  createdAt: new Date().toISOString(),
  applications: [],
};