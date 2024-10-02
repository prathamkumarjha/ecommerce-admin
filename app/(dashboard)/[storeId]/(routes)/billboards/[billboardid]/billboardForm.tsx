"use client";
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
import { Billboard } from "@prisma/client";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { AlertModal } from "@/components/deletion-alert";
import { useState } from "react";
import ImageUpload from "@/components/ui/image-upload";
import { useRouter } from "next/navigation";
const formSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1),
});

interface BillboardFormProps {
  initialData: Billboard | null;
}

const BillboardForm: React.FC<BillboardFormProps> = ({ initialData }) => {
  const params = useParams();

  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const storeId = params.storeId;

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${storeId}/billboard/${initialData?.id}`);
    } catch (error) {
      console.error("Error deleting store:", error);
    } finally {
      router.refresh();
      router.push("./");
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: "",
      imageUrl: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (initialData) {
      try {
        await axios.patch(
          `/api/${storeId}/billboard/${initialData.id}`,
          values
        );
      } catch (error) {
        toast.error("BillBoard update failed");
        console.log("rename", error);
      } finally {
        toast.success("rename completed");

        router.push("./");
        router.refresh();
      }
    } else {
      try {
        await axios.post(`/api/${storeId}/billboard`, values);
      } catch (error) {
        toast.error("name change failed");
        console.log("rename", error);
      } finally {
        toast.success("rename completed");
        router.refresh();
        router.push("./");
      }
    }
  };

  return (
    <>
      <div className="pl-10 pr-10">
        <div className="pb-2 my-6">
          <AlertModal
            isOpen={open}
            onClose={() => {
              setOpen(false);
            }}
            onConfirm={onDelete}
            loading={loading}
          />
          <b>
            <div className="text-3xl flex justify-between">
              {initialData ? "BillBoard Settings" : "Create BillBoard"}
              {initialData ? (
                <Button variant="destructive" onClick={() => setOpen(true)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              ) : (
                ""
              )}
            </div>
          </b>

          <div className="text-muted-foreground">
            {initialData
              ? "create changes on your billboard"
              : "Add a new BillBoard"}
          </div>
        </div>
        <Separator />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 pb-8 pt-8"
          >
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload Image</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value ? [field.value] : []}
                      disabled={loading}
                      onChange={(url) => field.onChange(url)}
                      onRemove={() => field.onChange("")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-3 gap-8">
              <FormField
                control={form.control}
                name="label"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Label</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder=""
                        className="w-44 h-8"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </Form>
        <Separator />
      </div>
    </>
  );
};

export default BillboardForm;
