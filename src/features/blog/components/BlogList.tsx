import { useBlogs } from "../api";
import { BlogCard } from "./BlogCard";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";

export function BlogList() {
    const { data: blogs, isLoading, error } = useBlogs();

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="flex flex-col space-y-3">
                        <Skeleton className="h-[200px] w-full rounded-xl" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[250px]" />
                            <Skeleton className="h-4 w-[200px]" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center space-y-4">
                <AlertCircle className="w-12 h-12 text-destructive" />
                <h3 className="text-xl font-semibold">Error loading blogs</h3>
                <p className="text-muted-foreground">
                    {(error as Error).message || "Something went wrong. Please make sure the server is running."}
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
            {blogs?.map((blog) => (
                <BlogCard key={blog.id} post={blog} />
            ))}
        </div>
    );
}
