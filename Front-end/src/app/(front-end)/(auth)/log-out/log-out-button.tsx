"use client";
import { Logout } from "@/app/(front-end)/(auth)/log-out/log-out";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  className?: string;
};
const LogoutButton = ({ className }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleLogout = () => {
    Logout({ toast, router, setIsLoading });
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className={cn(" cursor-pointer", className)}
    >
      {isLoading ? "Logging out..." : "Logout"}
    </button>
  );
};

export default LogoutButton;
