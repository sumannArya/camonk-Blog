import { cn } from "@/lib/utils";
import type { BlogPost } from "../types";
import { Badge } from "@/components/ui/badge";

interface BlogCompactCardProps {
    post: BlogPost;
    isActive: boolean;
    onClick: () => void;
}

export function BlogCompactCard({ post, isActive, onClick }: BlogCompactCardProps) {
    return (
        <div
            onClick={onClick}
            className={cn(
                "flex flex-col gap-2 p-4 cursor-pointer transition-all duration-200 border-l-4 hover:bg-muted/50",
                isActive
                    ? "border-primary bg-muted"
                    : "border-transparent hover:border-border"
            )}
        >
            <div className="flex justify-between items-start gap-2">
                <h4 className={cn(
                    "font-medium text-sm line-clamp-2 leading-tight",
                    isActive ? "text-primary" : "text-foreground"
                )}>
                    {post.title}
                </h4>
            </div>

            <p className="text-xs text-muted-foreground line-clamp-2">
                {post.description}
            </p>

            <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5 font-normal">
                    {post.category[0]}
                </Badge>
                <span className="text-[10px] text-muted-foreground ml-auto">
                    {new Date(post.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </span>
            </div>
        </div>
    );
}
