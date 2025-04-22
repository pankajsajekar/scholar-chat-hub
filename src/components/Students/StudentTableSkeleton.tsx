
import { Skeleton } from "@/components/ui/skeleton";

export const StudentTableSkeleton = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-10 w-1/4" />
        <Skeleton className="h-10 w-1/4" />
      </div>
      <div className="border rounded-md">
        <div className="p-4 space-y-4">
          {Array(5).fill(0).map((_, i) => (
            <div key={i} className="flex justify-between items-center">
              <Skeleton className="h-6 w-1/6" />
              <Skeleton className="h-6 w-1/6" />
              <Skeleton className="h-6 w-1/6" />
              <Skeleton className="h-6 w-1/6" />
              <Skeleton className="h-6 w-1/6" />
              <Skeleton className="h-6 w-1/6" />
              <Skeleton className="h-6 w-1/6" />
              <Skeleton className="h-6 w-1/6" />
              <Skeleton className="h-6 w-1/6" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
