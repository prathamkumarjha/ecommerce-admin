"use client";
import { ApiAlert } from "@/components/ui/api-alert";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Store } from "@prisma/client";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { AlertModal } from "@/components/deletion-alert";
import { useState } from "react";
import { useOrigin } from "@/hooks/use-origin";
import { useRouter } from "next/navigation";
const formSchema = z.object({
  newName: z.string().min(1, { message: "store name cannot be empty" }),
});

interface SettingsFormProps {
  initialData: Store;
}

const Settings: React.FC<SettingsFormProps> = ({ initialData }) => {
  const params = useParams();

  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const storeId = params.storeId;

  const onDelete = async () => {
    try {
      setLoading(true);
      const response = await axios.delete(`/api/stores/${storeId}`);
    } catch (error) {
      console.error("Error deleting store:", error);
    } finally {
      window.location.reload();
    }
  };

  const name = initialData.name;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newName: name,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const change = await axios.patch(`/api/stores/${storeId}`, values);
    } catch (error) {
      toast.error("name change failed");
      console.log("rename", error);
    } finally {
      toast.success("rename completed");
      router.refresh();
    }
  };

  const origin = useOrigin();
  return (
    <>
      <div className="pl-10 pr-10">
        <div className="pb-8 my-6">
          <AlertModal
            isOpen={open}
            onClose={() => {
              setOpen(false);
            }}
            onConfirm={onDelete}
            loading={loading}
          />
          <b>
            <div className="text-3xl pt-4  flex justify-between">
              Store Settings{" "}
              <Button variant="destructive" onClick={() => setOpen(true)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </b>

          <div className="text-muted-foreground mt-4">
            manage store preferences
          </div>
        </div>
        <Separator />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 pb-8"
          >
            <FormField
              control={form.control}
              name="newName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} className="w-44 h-8" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
        <Separator />
      </div>
      <div className="px-8 pt-4">
        <ApiAlert
          title="NEXT_PUBLIC_API_URL"
          description={`${origin}/api/${initialData.id}`}
          variant="public"
        />
      </div>
    </>
  );
};

export default Settings;
