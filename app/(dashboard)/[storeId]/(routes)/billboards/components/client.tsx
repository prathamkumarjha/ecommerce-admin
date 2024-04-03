"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Billboard } from "@prisma/client";
import { DataTable } from "@/components/ui/data-table";
import { BillboardColumn, columns } from "./columns";

interface BillBoardClientProps {
  data: BillboardColumn[];
}
export const BillboardsClient: React.FC<BillBoardClientProps> = ({ data }) => {
  const params = useParams();
  const router = useRouter();
  const handleAddNewClick = () => {
    router.push(`/${params.storeId}/billboards/new`);
  };

  return (
    <>
      <div className="p-4 flex justify-between">
        <div>
          <b className="text-3xl">Billboards ({data.length})</b>
          <div className="text-muted-foreground">
            Manage billboards for your store
          </div>
        </div>
        <Button onClick={handleAddNewClick}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} />
    </>
  );
};

export default BillboardsClient;
