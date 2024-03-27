"use client";

import { useRouter } from "next/router";
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

import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  newName: z.string().min(1, { message: "store name cannot be empty" }),
});

export default function Settings() {
  const params = useParams();

  const storeId = params.storeId;
  console.log(storeId);
  const onDelete = async () => {
    try {
      const response = await axios.delete(`/api/delete/${storeId}`);
    } catch (error) {
      console.error("Error deleting store:", error);
    } finally {
      window.location.reload();
    }
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newName: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    console.log(params);
  }
  return (
    <div className="pl-10 pr-10">
      <div className="pb-8 my-6">
        <b>
          <div className="text-3xl pt-4  flex justify-between">
            Store Settings{" "}
            <Button variant="destructive" onClick={onDelete}>
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-8">
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
  );
}
