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
import { Billboard, category as Category } from "@prisma/client";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { AlertModal } from "@/components/deletion-alert";
import { useState } from "react";
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
  billboardId: z.string().min(1),
});

interface CategoryFormProps {
  initialData: Category | null;
  billboards: Billboard[];
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  initialData,
  billboards,
}) => {
  const params = useParams();

  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const storeId = params.storeId;

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${storeId}/categories/${initialData?.id}`);
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
      name: "",
      billboardId: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (initialData) {
      try {
        await axios.patch(
          `/api/${storeId}/categories/${initialData.id}`,
          values
        );
      } catch (error) {
        toast.error("Category update failed");
        console.log("rename", error);
      } finally {
        toast.success("rename completed");
        router.refresh();
        router.push("./");
      }
    } else {
      try {
        await axios.post(`/api/${storeId}/categories`, values);
      } catch (error) {
        toast.error("cateogory creation failed");
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
              {initialData ? "Category Settings" : "Create Category"}
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
              ? "create changes on your Category"
              : "Add a new Category"}
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Category name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-3 gap-8">
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
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </Form>
        <Separator />
      </div>
    </>
  );
};

export default CategoryForm;
