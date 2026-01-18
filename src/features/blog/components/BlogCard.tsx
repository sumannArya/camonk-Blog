import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { BlogPost } from "../types";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BlogCardProps {
    post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
    const navigate = useNavigate();

    return (
        <Card className="group flex flex-col h-full overflow-hidden border-border/50 bg-card hover:border-primary/50 hover:shadow-lg transition-all duration-300">
            <div className="relative aspect-video overflow-hidden">
                <img
                    src={post.coverImage}
                    alt={post.title}
                    className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                />
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {post.category.map((cat) => (
                        <Badge key={cat} variant="secondary" className="bg-background/80 backdrop-blur-sm shadow-sm">
                            {cat}
                        </Badge>
                    ))}
                </div>
            </div>

            <CardHeader className="space-y-2 pb-2">
                <div className="flex items-center text-sm text-muted-foreground gap-4">
                    <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(post.date).toLocaleDateString(undefined, { dateStyle: 'medium' })}</span>
                    </div>
                    {/* Mocking read time since not in API */}
                    <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>5 min read</span>
                    </div>
                </div>
                <h3 className="text-xl font-bold tracking-tight line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                </h3>
            </CardHeader>

            <CardContent className="flex-grow">
                <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
                    {post.description}
                </p>
            </CardContent>

            <CardFooter className="pt-0">
                <Button
                    onClick={() => navigate(`/blog/${post.id}`)}
                    className="w-full group/btn"
                    variant="outline"
                >
                    Read Article
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                </Button>
            </CardFooter>
        </Card>
    );
}
