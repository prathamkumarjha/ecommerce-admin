"use client";
import { ApiAlert } from "@/components/ui/api-alert";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Billboard } from "@prisma/client";
import { DataTable } from "@/components/ui/data-table";
import { SizeColumn, columns } from "./columns";
import { useOrigin } from "@/hooks/use-origin";
interface sizeClientProps {
  data: SizeColumn[];
}
export const SizesClient: React.FC<sizeClientProps> = ({ data }) => {
  const params = useParams();
  const router = useRouter();
  const handleAddNewClick = () => {
    router.push(`/${params.storeId}/sizes/new`);
  };

  const origin = useOrigin();
  return (
    <>
      <div className="p-4 flex justify-between">
        <div>
          <b className="text-3xl">Sizes ({data.length})</b>
          <div className="text-muted-foreground">
            Manage sizes for your store
          </div>
        </div>
        <Button onClick={handleAddNewClick}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <div className="px-4">
        <DataTable searchKey="name" columns={columns} data={data} />
      </div>
      <div className="px-8 pt-4">
        <ApiAlert
          title="GET"
          description={`${origin}/api/${params.storeId}`}
          variant="public"
        />
      </div>
      <div className="px-8 pt-4">
        <ApiAlert
          title="GET"
          description={`${origin}/api/${params.storeId}/sizes/{categoryId}`}
          variant="public"
        />
      </div>
      <div className="px-8 pt-4">
        <ApiAlert
          title="POST"
          description={`${origin}/api/${params.storeId}/sizes`}
          variant="admin"
        />
      </div>
      <div className="px-8 pt-4">
        <ApiAlert
          title="PATCH"
          description={`${origin}/api/${params.storeId}/sizes/{categoryId}`}
          variant="admin"
        />
      </div>
      <div className="px-8 pt-4 pb-4">
        <ApiAlert
          title="DELETE"
          description={`${origin}/api/${params.storeId}/sizes/{categoryId}`}
          variant="admin"
        />
      </div>
    </>
  );
};

export default SizesClient;
