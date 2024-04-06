import prismadb from "@/lib/prismadb";
import ColorForm from "./colorForm";

const BillboardPage = async ({
  params,
}: {
  params: { storeId: string; colorId: string };
}) => {
  const color = await prismadb.color.findUnique({
    where: {
      id: params.colorId,
    },
  });

  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorForm initialData={color} />
      </div>
    </div>
  );
};

export default BillboardPage;
