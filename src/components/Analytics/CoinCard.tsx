import { cn } from "@/lib/utils";
import { Card, CardContent } from "../ui/card";

interface CourseCardProps {
  className?: string;
  image?: string;
  title?: string;
  description?: string;
}

export const CourseCard = ({
  className,
  image,
  title,
  description,
}: CourseCardProps) => {
  return (
    <Card className={cn("inter-var", className)}>
      <CardContent className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-slate-950 dark:border-white/[0.2] border-black/[0.1] w-auto h-auto rounded-xl p-6 border flex flex-col transition-all duration-300 ease-in-out transform hover:scale-105">
        {/* Title */}
        <div className="text-xl font-bold text-neutral-600 dark:text-white truncate">
          {title}
        </div>
        {/* Description */}
        <div className="text-neutral-500 text-sm dark:text-neutral-300 my-2 line-clamp-2">
          {description}
        </div>
        {/* Image */}
        <div className="w-full mt-auto">
          <img
            src={image}
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </div>
      </CardContent>
    </Card>
  );
};