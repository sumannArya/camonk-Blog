import { useState, useEffect } from "react";
import { useBlogs, useBlog } from "../api";
import { BlogCompactCard } from "./BlogCompactCard";
import { BlogArticle } from "./BlogArticle";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { AlertCircle, PanelLeft } from "lucide-react";
import { cn } from "@/lib/utils";


export function BlogSplitView() {
    const { data: blogs, isLoading: isListLoading, error: listError } = useBlogs();
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    // Auto-select first blog when loaded
    useEffect(() => {
        if (blogs && blogs.length > 0 && !selectedId) {
            setSelectedId(blogs[0].id);
        }
    }, [blogs, selectedId]);

    const { data: selectedBlog, isLoading: isDetailLoading } = useBlog(selectedId || "");

    if (isListLoading) {
        return (
            <div className="flex h-[calc(100vh-100px)] gap-6">
                <div className="w-1/3 space-y-4 overflow-hidden">
                    {[1, 2, 3, 4].map((i) => (
                        <Skeleton key={i} className="h-24 w-full rounded-lg" />
                    ))}
                </div>
                <div className="w-2/3">
                    <Skeleton className="h-[400px] w-full rounded-xl" />
                </div>
            </div>
        );
    }

    if (listError) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center space-y-4">
                <AlertCircle className="w-12 h-12 text-destructive" />
                <h3 className="text-xl font-semibold">Error loading blogs</h3>
            </div>
        );
    }

    return (

        <div className="flex bg-background w-full relative min-h-screen">
            {/* Sidebar List - Mobile: Fixed Drawer, Desktop: Sticky Sidebar */}
            <div
                className={cn(
                    "bg-gray-50/95 backdrop-blur-sm dark:bg-muted/95 border-r z-30 transition-all duration-300 ease-in-out flex flex-col",
                    // Mobile Styles
                    "fixed inset-0 w-full h-full",
                    // Desktop Styles (Sticky)
                    "lg:sticky lg:top-16 lg:h-[calc(100vh-64px)] lg:bg-gray-50/50",
                    isSidebarOpen
                        ? "translate-x-0 lg:translate-x-0 lg:w-1/3 opacity-100"
                        : "-translate-x-full lg:translate-x-0 lg:w-0 opacity-0 lg:overflow-hidden lg:border-none"
                )}
            >
                {/* Sidebar Header/Close for Mobile (Optional, but we have the close button) */}
                <div className="p-4 space-y-3 min-w-[300px] h-full overflow-y-auto custom-scrollbar pb-20 relative">
                    <div className="flex items-center justify-between mb-2 px-1">
                        <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Recent Posts</span>
                        {/* Close Button (Mobile & Desktop inside sidebar) */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="hover:bg-background/80"
                            onClick={() => setIsSidebarOpen(false)}
                            title="Close Sidebar"
                        >
                            <PanelLeft className="h-4 w-4" />
                        </Button>
                    </div>

                    {blogs?.map((blog) => (
                        <BlogCompactCard
                            key={blog.id}
                            post={blog}
                            isActive={selectedId === blog.id}
                            onClick={() => {
                                setSelectedId(blog.id);
                                if (window.innerWidth < 1024) {
                                    setIsSidebarOpen(false);
                                } else {
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Global Toggle Button (Visible when sidebar is closed) */}
            <div className={cn(
                "fixed top-24 left-4 z-40 transition-all duration-300",
                isSidebarOpen ? "opacity-0 pointer-events-none" : "opacity-100"
            )}>
                <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 rounded-full shadow-md bg-background/80 backdrop-blur border-primary/20 hover:border-primary text-primary"
                    onClick={() => setIsSidebarOpen(true)}
                    title="Open Menu"
                >
                    <PanelLeft className="h-4 w-4" />
                </Button>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 bg-background relative w-full h-full p-0">
                {selectedBlog ? (
                    <div className="max-w-4xl mx-auto pb-20 lg:pb-0 min-h-[50vh]">
                        <BlogArticle blog={selectedBlog} hideBackButton={true} />
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-[50vh] text-muted-foreground">
                        {isDetailLoading ? (
                            <div className="space-y-4 w-full max-w-lg p-8">
                                <Skeleton className="h-8 w-32" />
                                <Skeleton className="h-64 w-full rounded-xl" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-2/3" />
                                </div>
                            </div>
                        ) : (
                            <p>Select an article to read</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
