"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

interface ContactStatusButtonProps {
  id: string;
  currentStatus: string;
}

export function ContactStatusButton({ id, currentStatus }: ContactStatusButtonProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleStatusChange = async (newStatus: string) => {
    if (newStatus === currentStatus) return;

    setIsUpdating(true);
    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update");
      }

      toast({
        title: "Status Updated",
        description: `Contact marked as ${newStatus}`,
      });

      router.refresh();
    } catch {
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {isUpdating && <Loader2 className="h-4 w-4 animate-spin" />}
      <Select
        value={currentStatus}
        onValueChange={handleStatusChange}
        disabled={isUpdating}
      >
        <SelectTrigger className="w-[120px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="new">New</SelectItem>
          <SelectItem value="read">Read</SelectItem>
          <SelectItem value="replied">Replied</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
