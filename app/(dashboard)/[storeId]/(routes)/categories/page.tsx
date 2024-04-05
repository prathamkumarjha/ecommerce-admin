import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";
import CategoriesClient from "./components/client";
import { CategoryColumn as categoryColumn } from "./components/columns";
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

  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCategories: categoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboard.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <>
      <CategoriesClient data={formattedCategories} />
    </>
  );
}
