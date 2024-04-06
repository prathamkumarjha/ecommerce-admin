import prismadb from "@/lib/prismadb";
import SizeForm from "./sizeForm";

const BillboardPage = async ({
  params,
}: {
  params: { storeId: string; sizeId: string };
}) => {
  const size = await prismadb.size.findUnique({
    where: {
      id: params.sizeId,
    },
  });

  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeForm initialData={size} />
      </div>
    </div>
  );
};

export default BillboardPage;
