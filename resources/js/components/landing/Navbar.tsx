import { Link } from '@inertiajs/react';
import { BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Navbar() {
    const menuItems = ["Home", "Program", "Tentang", "Komunitas", "Kontak"];

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="container mx-auto max-w-[1200px] flex h-16 items-center justify-between px-4 md:px-6 lg:px-8">
                <Link href="/" className="flex items-center space-x-2">
                    <BookOpen className="h-6 w-6 text-primary" />
                    <span className="font-bold text-xl tracking-tight text-foreground">Temanmoo Belajar</span>
                </Link>

                <div className="hidden md:flex gap-6 lg:gap-8 items-center">
                    {menuItems.map((item) => (
                        <Link
                            key={item}
                            href="#"
                            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                            {item}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    <Button className="rounded-full px-6 shadow-sm">Mulai Belajar</Button>
                </div>
            </div>
        </nav>
    );
}
