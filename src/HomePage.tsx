import { BlogSplitView } from "./features/blog/components/BlogSplitView";

export function HomePage() {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pt-4">
            <div className="flex flex-col items-center justify-center gap-4 text-center">
                <div className="space-y-2">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-black">CA MONK BLOG</h1>
                    <h4 className="text-xl font-normal tracking-tight lg:text-2xl text-black">Latest insights</h4>
                    <p className="text-xl text-muted-foreground max-w-[700px] mx-auto">
                        Discover trends, expert analysis, and in-depth guides.
                    </p>
                </div>
            </div>

            <div className="min-h-[600px]">
                <BlogSplitView />
            </div>
        </div>
    );
}
