
import { Badge } from "@/components/ui/badge";

export const InternshipBadge = ({ hasInternship, details }: { hasInternship?: boolean; details?: string }) => {
  if (!hasInternship) {
    return <Badge variant="secondary">No</Badge>;
  }
  return (
    <Badge variant="default" title={details || ""}>
      Yes
    </Badge>
  );
};
