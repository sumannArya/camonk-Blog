import { Button } from "./ui/button";
import { Coffee } from "lucide-react";

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-background font-sans flex flex-col">
            <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-16 items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
                        <div className="p-2 bg-primary text-primary-foreground rounded-lg">
                            <Coffee className="w-5 h-5" />
                        </div>
                        <span>MonkBlog</span>
                    </div>
                    <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
                        <a href="#" className="hover:text-foreground transition-colors">Categories</a>
                        <a href="#" className="hover:text-foreground transition-colors">About</a>
                        <a href="#" className="hover:text-foreground transition-colors">Newsletter</a>
                    </nav>
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" className="hidden sm:flex" asChild>
                            <a href="/create">Create Post</a>
                        </Button>
                        <Button size="sm" variant="outline" className="gap-2">
                            <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">
                                S
                            </div>
                            Profile
                        </Button>
                    </div>
                </div>
            </header>

            <main className="flex-1 container py-8">
                {children}
            </main>

            <footer className="border-t py-6 md:py-0">
                <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                    <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                        Built by <span className="font-semibold text-foreground">Suman❤️</span>.
                    </p>
                </div>
            </footer>
        </div>
    );
}
