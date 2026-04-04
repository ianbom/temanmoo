import { Link } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';

export default function AuthLayout({
    children,
    title,
    description,
}: {
    children: React.ReactNode;
    title?: string;
    description?: string;
}) {
    return (
        <div className="flex min-h-screen w-full bg-slate-100 font-sans antialiased text-slate-900">
            {/* Left side - Image & Branding */}
            <div className="relative hidden w-[55%] flex-col justify-between overflow-hidden lg:flex">
                {/* Background Image */}
                <div className="absolute inset-0 bg-slate-900 bg-[url('https://images.unsplash.com/photo-1742403528346-300429e979ef?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat" />
                {/* Gradient Overlay for Depth */}
                <div className="absolute inset-0 bg-linear-to-t from-[#020b1e]/90 via-[#020b1e]/40 to-transparent mix-blend-multiply" />
                
                {/* Top Nav inside Left Panel */}
                <div className="relative z-10 flex items-center justify-between p-10 pt-12">
                    <Link
                        href={home()}
                        className="flex items-center gap-2 text-xl font-bold text-white transition-opacity hover:opacity-90 drop-shadow-md"
                    >
                        {/* <AppLogoIcon className="h-8 w-8 fill-current text-white" /> */}
                        TemanMoo
                    </Link>
                    <Link
                        href={home()}
                        className="flex items-center text-sm font-medium text-white/80 transition-colors hover:text-white"
                    >
                        &larr; Kembali
                    </Link>
                </div>

                {/* Bottom Text */}
                <div className="relative z-10 p-10 pb-16">
                    <h1 className="mb-4 text-[3.25rem] font-extrabold tracking-tight text-white leading-[1.05] animate-in slide-in-from-bottom-8 duration-700 drop-shadow-lg max-w-lg">
                        Dashboard Admin
                    </h1>
                    <p className="mt-4 text-base text-white/80 animate-in slide-in-from-bottom-8 duration-700 delay-150 drop-shadow-md max-w-[400px]">
                        Selamat datang di dashboard admin. Di sini Anda dapat mengelola kategori, kelas, dan postingan.
                    </p>
                    <div className="mt-8 flex gap-2 animate-in fade-in duration-700 delay-300">
                        <div className="h-1.5 w-6 rounded-full bg-white shadow-sm"></div>
                        <div className="h-1.5 w-1.5 rounded-full bg-white/40 shadow-sm"></div>
                        <div className="h-1.5 w-1.5 rounded-full bg-white/40 shadow-sm"></div>
                    </div>
                </div>
            </div>

            {/* Right side - Form */}
            <div className="relative flex w-full items-center justify-center overflow-hidden p-4 lg:w-[45%] lg:p-12">
                {/* Subtle glass background glow */}
                <div className="absolute inset-0 bg-linear-to-br from-white via-slate-50 to-slate-100/50" />

                <div className="relative z-10 w-full max-w-[460px] p-8 sm:p-12 transition-all duration-500">
                    <div className="relative z-10">
                        {title && (
                            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900 leading-tight">
                                {title}
                            </h2>
                        )}
                        {description && (
                            <p className="mt-3 text-[15px] font-medium text-slate-500">
                                {description}
                            </p>
                        )}

                        <div className="mt-10">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
