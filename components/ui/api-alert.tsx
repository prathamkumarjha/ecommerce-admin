"use client";

import { Badge, BadgeProps } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Server } from "lucide-react";
import { Copy } from "lucide-react";
import { Description } from "@radix-ui/react-dialog";
import toast from "react-hot-toast";
interface ApiAlertProps {
  title: string;
  description: string;
  variant: "public" | "admin";
}

const textMap: Record<ApiAlertProps["variant"], string> = {
  public: "public",
  admin: "Admin",
};

const variantMap: Record<ApiAlertProps["variant"], BadgeProps["variant"]> = {
  public: "secondary",
  admin: "destructive",
};

export const ApiAlert: React.FC<ApiAlertProps> = ({
  title,
  description,
  variant = "public",
}) => {
  const copy = () => {
    navigator.clipboard.writeText(description);
    toast.success("link copied");
  };
  return (
    <Alert className="api-alert bg-white border border-gray-300 p-4 rounded-md">
      <Server className="h-4 w-4" />
      <AlertTitle>
        {title}
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <div className="mt-2 flex justify-between items-center">
        <code className="whitespace-pre-wrap">
          <span className="bg-gray-100 rounded p-0">{description}</span>
        </code>
        <Copy className="h-4 w-4" onClick={copy} />
      </div>
    </Alert>
  );
};
