import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";
import BillboardsClient from "./components/client";

export default function billboards({
  params,
}: {
  params: { storeId: string };
}) {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const billboards = prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <>
      <BillboardsClient params={params} />
    </>
  );
}
