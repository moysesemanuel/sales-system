import { redirect } from "next/navigation";
import { getCurrentAppSession } from "@/lib/auth";
import { DabiLoading } from "@/components/projects/sales-system/dabi-loading";

export default async function Page() {
  const session = await getCurrentAppSession();

  if (!session) {
    redirect("/login");
  }

  return <DabiLoading />;
}
