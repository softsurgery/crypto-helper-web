import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface PaginateButtonsProps {
  className?: string;
  page: number;
  nextCallback: () => void;
  previousCallback: () => void;
}
export function PaginateButtons({
  className,
  page,
  nextCallback,
  previousCallback,
}: PaginateButtonsProps) {
  return (
    <div className={cn('flex gap-2 justify-center items-center w-full',className)}>
      <Button className="flex gap-1 items-center" onClick={previousCallback} disabled={page <= 1}>
       <ArrowLeft className="h-5 w-5"/> Previous 
      </Button>
      <Button className="flex gap-1 items-center" onClick={nextCallback}>Next  <ArrowRight className="h-5 w-5"/></Button>
    </div>
  );
}
