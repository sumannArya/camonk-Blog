import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateBlog } from "../api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Loader2, Plus, X } from "lucide-react";

export function CreateBlogPage() {
    const navigate = useNavigate();
    const createBlog = useCreateBlog();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");
    const [coverImage, setCoverImage] = useState("");
    const [categoryInput, setCategoryInput] = useState("");
    const [categories, setCategories] = useState<string[]>([]);
    const [authorName, setAuthorName] = useState("");
    const [authorRole, setAuthorRole] = useState("");
    const [authorAvatar, setAuthorAvatar] = useState("");

    const handleAddCategory = () => {
        if (categoryInput.trim() && !categories.includes(categoryInput.trim().toUpperCase())) {
            setCategories([...categories, categoryInput.trim().toUpperCase()]);
            setCategoryInput("");
        }
    };

    const handleRemoveCategory = (cat: string) => {
        setCategories(categories.filter(c => c !== cat));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!title || !description || !content || !coverImage || categories.length === 0 || !authorName || !authorRole || !authorAvatar) {
            alert("Please fill in all fields");
            return;
        }

        createBlog.mutate({
            title,
            description,
            content,
            coverImage,
            category: categories,
            author: {
                name: authorName,
                role: authorRole,
                avatar: authorAvatar
            },
            date: new Date().toISOString(),
        }, {
            onSuccess: () => {
                navigate('/');
            }
        });
    };

    return (
        <div className="max-w-2xl mx-auto px-4 animate-in fade-in duration-500 pb-12">
            <Button
                variant="ghost"
                className="-ml-4 gap-2 mb-6 text-muted-foreground hover:text-foreground"
                onClick={() => navigate("/")}
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Articles
            </Button>

            <Card className="border-border/60 shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl">Create New Article</CardTitle>
                    <CardDescription>
                        Share your insights with the world. All fields are required.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Article Title</Label>
                            <Input
                                id="title"
                                placeholder="e.g., The Future of AI in Finance"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="categories">Categories</Label>
                            <div className="flex gap-2">
                                <Input
                                    id="categories"
                                    placeholder="Add a tag..."
                                    value={categoryInput}
                                    onChange={(e) => setCategoryInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCategory())}
                                />
                                <Button type="button" variant="secondary" onClick={handleAddCategory}>
                                    <Plus className="w-4 h-4" />
                                </Button>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2 min-h-[2rem]">
                                {categories.map(cat => (
                                    <Badge key={cat} variant="secondary" className="pl-2 pr-1 py-1 gap-1">
                                        {cat}
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveCategory(cat)}
                                            className="hover:bg-destructive/20 rounded-full p-0.5 transition-colors"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </Badge>
                                ))}
                                {categories.length === 0 && (
                                    <span className="text-muted-foreground text-sm italic">No categories added yet.</span>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="coverImage">Cover Image URL</Label>
                            <Input
                                id="coverImage"
                                placeholder="https://example.com/image.jpg"
                                value={coverImage}
                                onChange={(e) => setCoverImage(e.target.value)}
                                required
                            />
                            {coverImage && (
                                <div className="mt-2 aspect-video rounded-md overflow-hidden bg-muted">
                                    <img
                                        src={coverImage}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                        onError={(e) => (e.currentTarget.style.display = 'none')}
                                    />
                                </div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Short Description</Label>
                            <Textarea
                                id="description"
                                placeholder="A brief summary of your article..."
                                className="resize-none h-20"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="authorName">Author Name</Label>
                                <Input
                                    id="authorName"
                                    placeholder="John Doe"
                                    value={authorName}
                                    onChange={(e) => setAuthorName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="authorRole">Author Role</Label>
                                <Input
                                    id="authorRole"
                                    placeholder="Senior Editor, Tech"
                                    value={authorRole}
                                    onChange={(e) => setAuthorRole(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="authorAvatar">Author Avatar URL</Label>
                            <Input
                                id="authorAvatar"
                                placeholder="https://example.com/avatar.jpg"
                                value={authorAvatar}
                                onChange={(e) => setAuthorAvatar(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="content">Full Content</Label>
                            <Textarea
                                id="content"
                                placeholder="Write your full article here..."
                                className="min-h-[300px]"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                            />
                        </div>

                        <div className="pt-4 flex justify-end gap-4">
                            <Button type="button" variant="outline" onClick={() => navigate('/')}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={createBlog.isPending}>
                                {createBlog.isPending ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Publishing...
                                    </>
                                ) : (
                                    'Publish Article'
                                )}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
