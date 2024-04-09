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
import { product } from "@prisma/client";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { AlertModal } from "@/components/deletion-alert";
import { useState } from "react";
import ImageUpload from "@/components/ui/image-upload";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(1),
  images: z.object({ url: z.string() }).array(),
  price: z.coerce.number().min(1),
  categoryId: z.string().min(1),
  colorId: z.string().min(1),
  sizeId: z.string().min(1),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
});

interface ProductFormProps {
  initialData: product | null;
}

const ProductForm: React.FC<ProductFormProps> = ({ initialData }) => {
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
    defaultValues: initialData
      ? {
          ...initialData,
          price: parseFloat(String(initialData?.price)),
        }
      : {
          name: "",
          images: [],
          price: 0,
          categoryId: "",
          colorId: "",
          sizeId: "",
          isFeatured: false,
          isArchived: false,
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
        router.refresh();
        router.push("./");
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
              {initialData ? "Product Settings" : "Create Product"}
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
              ? "create changes on your product"
              : "Add a new product"}
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
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload Image</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value.map((image) => image.url)}
                      disabled={loading}
                      onChange={(url) =>
                        field.onChange([...field.value, { url }])
                      }
                      onRemove={(url) =>
                        field.onChange([
                          ...field.value.filter(
                            (current) => current.url !== url
                          ),
                        ])
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-3 gap-8">
              <FormField
                control={form.control}
                name="name"
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

            <FormField
              control={form.control}
              name="billboardId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Billboard</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a billboard"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {billboards.map((billboard) => (
                        <SelectItem key={billboard.id} value={billboard.id}>
                          {billboard.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
        <Separator />
      </div>
    </>
  );
};

export default ProductForm;
