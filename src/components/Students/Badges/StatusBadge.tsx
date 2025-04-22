
import { Badge } from "@/components/ui/badge";

export const StatusBadge = ({ status }: { status?: string }) => {
  if (!status) return null;

  let variant: "default" | "destructive" | "outline" | "secondary" = "default";

  switch (status.toLowerCase()) {
    case "active":
      variant = "default";
      break;
    case "inactive":
      variant = "secondary";
      break;
    case "suspended":
      variant = "destructive";
      break;
    default:
      variant = "outline";
  }

  return <Badge variant={variant}>{status}</Badge>;
};
