"use client";

import { Modal } from "@/components/ui/modal";
import { useStoreModal } from "@/hooks/useStoreModal";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "name of the store is required",
  }),
});

export const StoreModal = () => {
  const storeModal = useStoreModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  const [disabled, setDisabled] = useState(false);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setDisabled(true);
      const response = await axios.post("/api/stores", values);
      toast.success("store created");
    } catch (error) {
      console.log("error in submission", error);
      toast.error("store creation failed");
    } finally {
      setDisabled(false);

      window.location.reload();
    }
  };

  return (
    <Modal
      title="Store Name"
      description="Give a name to your store"
      onClose={storeModal.onClose}
      isOpen={storeModal.isOpen}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Store Name</FormLabel>
                <FormControl>
                  <Input placeholder="E-Commerce" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end space-x-4">
            <Button
              className="mt-1"
              variant="outline"
              disabled={disabled}
              onClick={storeModal.onClose}
              type="button"
            >
              Cancel
            </Button>
            <Button className="mt-1" disabled={disabled} type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};
