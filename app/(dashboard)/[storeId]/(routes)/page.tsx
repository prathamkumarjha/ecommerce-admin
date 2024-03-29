import prismadb from "@/lib/prismadb";

interface DashBoardPageProps {
  params: { StoreId: string };
}

const DashBoardPage: React.FC<DashBoardPageProps> = async ({ params }) => {
  const store = await prismadb.store.findFirst({
    where: {
      id: params.StoreId,
    },
  });
  return <div>Active Store: {store?.name}</div>;
};

export default DashBoardPage;
