import { useNavigate } from "react-router-dom";
import type { BlogPost } from "../types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Calendar, Share2, Bookmark } from "lucide-react";

interface BlogArticleProps {
    blog: BlogPost;
    hideBackButton?: boolean;
}

export function BlogArticle({ blog, hideBackButton = false }: BlogArticleProps) {
    const navigate = useNavigate();

    return (
        <article className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-500">
            {/* Navigation & Actions */}
            <div className="flex items-center justify-between py-2 border-b mb-4">
                {!hideBackButton && (
                    <Button variant="ghost" className="-ml-4 gap-2 hover:bg-transparent hover:text-primary" onClick={() => navigate("/")}>
                        <ArrowLeft className="w-4 h-4" />
                        Back to Articles
                    </Button>
                )}
                <div className={`flex gap-2 ${hideBackButton ? 'w-full justify-end' : ''}`}>
                    <Button variant="ghost" size="icon" title="Save for later">
                        <Bookmark className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Share">
                        <Share2 className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {/* Header */}
            <div className="space-y-6">
                <div className="flex flex-wrap gap-2">
                    {blog.category.map((cat) => (
                        <Badge key={cat} variant="secondary" className="px-3 py-1 text-xs font-bold uppercase tracking-wide hover:bg-primary hover:text-primary-foreground transition-colors">
                            {cat}
                        </Badge>
                    ))}
                </div>

                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
                    {blog.title}
                </h1>

                <div className="flex items-center gap-4 text-muted-foreground border-l-4 border-primary pl-4">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span className="font-medium">{new Date(blog.date).toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
                    </div>
                </div>

                {blog.author && (
                    <div className="flex items-center gap-3 pt-4 border-t">
                        <Avatar>
                            <AvatarImage src={blog.author.avatar} alt={blog.author.name} />
                            <AvatarFallback>{blog.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold">{blog.author.name}</span>
                            <span className="text-xs text-muted-foreground">{blog.author.role}</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Hero Image */}
            <div className="rounded-2xl overflow-hidden shadow-xl h-[280px] w-full relative group">
                <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="object-cover w-full h-full transform transition-duration-700 hover:scale-[1.01]"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl" />
            </div>

            {/* Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none text-foreground/90 prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-black prose-a:text-primary prose-img:rounded-xl">
                <p className="text-xl leading-relaxed font-medium text-muted-foreground mb-8">
                    {blog.description}
                </p>
                <div className="whitespace-pre-wrap leading-loose">
                    {blog.content}
                </div>
            </div>
        </article>
    );
}
