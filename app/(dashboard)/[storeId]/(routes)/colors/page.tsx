import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";
import CategoriesClient from "./components/client";
import { ColorColumn } from "./components/columns";
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

  const categories = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedColors: ColorColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <>
      <CategoriesClient data={formattedColors} />
    </>
  );
}
