import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function dashboard({
  params,
}: {
  params: { storeId: string };
}) {
  try {
    const { userId } = auth();
    if (!userId) {
      redirect("/sign-in");
    }

    const store = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
      },
    });

    return store?.name;
  } catch (error) {
    console.error("Error fetching store:", error);
    return null;
  }
}
