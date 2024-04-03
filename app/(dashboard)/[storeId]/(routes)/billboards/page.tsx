import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";
import BillboardsClient from "./components/client";
import { BillboardColumn } from "./components/columns";
import { format } from "date-fns";
export default async function billboards({
  params,
}: {
  params: { storeId: string };
}) {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <>
      <BillboardsClient data={formattedBillboards} />
    </>
  );
}
