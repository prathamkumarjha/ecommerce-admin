"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BillboardsClient({
  params,
}: {
  params: { storeId: string };
}) {
  const router = useRouter();
  const newer = "new";
  const handleAddNewClick = () => {
    router.push(`/${params.storeId}/billboards/${newer}`);
  };

  return (
    <>
      <div className="p-4 flex justify-between">
        <div>
          <b className="text-3xl">Billboards (0)</b>
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
    </>
  );
}
