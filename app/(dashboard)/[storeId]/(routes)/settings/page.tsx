import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

import SettingsForm from "./components/settings-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ApiAlert } from "@/components/ui/api-alert";

const SettingsPage = async ({ params }: { params: { storeId: string } }) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <div className="flex-col">
      <div>
        <SettingsForm initialData={store} />
      </div>
    </div>
  );
};

export default SettingsPage;
