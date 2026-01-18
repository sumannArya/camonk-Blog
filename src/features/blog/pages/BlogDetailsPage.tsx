import { useParams, useNavigate } from "react-router-dom";
import { useBlog } from "../api";
import { BlogArticle } from "../components/BlogArticle";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export function BlogDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: blog, isLoading, error } = useBlog(id!);

    if (isLoading) {
        return (
            <div className="max-w-4xl mx-auto p-6 space-y-8">
                <div className="space-y-4">
                    <Skeleton className="h-8 w-32" />
                    <Skeleton className="h-12 w-3/4" />
                    <Skeleton className="h-6 w-1/2" />
                </div>
                <Skeleton className="h-[400px] w-full rounded-xl" />
                <div className="space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                </div>
            </div>
        );
    }

    if (error || !blog) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
                <h2 className="text-2xl font-bold">Article not found</h2>
                <Button onClick={() => navigate("/")}>Return Home</Button>
            </div>
        );
    }

    return <BlogArticle blog={blog} />;
}
