"use client";
import { ApiAlert } from "@/components/ui/api-alert";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Billboard } from "@prisma/client";
import { DataTable } from "@/components/ui/data-table";
import { ColorColumn, columns } from "./columns";
import { useOrigin } from "@/hooks/use-origin";
interface colorClientProps {
  data: ColorColumn[];
}
export const ColorsClient: React.FC<colorClientProps> = ({ data }) => {
  const params = useParams();
  const router = useRouter();
  const handleAddNewClick = () => {
    router.push(`/${params.storeId}/colors/new`);
  };

  const origin = useOrigin();
  return (
    <>
      <div className="p-4 flex justify-between">
        <div>
          <b className="text-3xl">colors ({data.length})</b>
          <div className="text-muted-foreground">
            Manage colors for your store
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
          description={`${origin}/api/${params.storeId}/collors/{categoryId}`}
          variant="public"
        />
      </div>
      <div className="px-8 pt-4">
        <ApiAlert
          title="POST"
          description={`${origin}/api/${params.storeId}/colors`}
          variant="admin"
        />
      </div>
      <div className="px-8 pt-4">
        <ApiAlert
          title="PATCH"
          description={`${origin}/api/${params.storeId}/colors/{categoryId}`}
          variant="admin"
        />
      </div>
      <div className="px-8 pt-4 pb-4">
        <ApiAlert
          title="DELETE"
          description={`${origin}/api/${params.storeId}/colors/{categoryId}`}
          variant="admin"
        />
      </div>
    </>
  );
};

export default ColorsClient;
