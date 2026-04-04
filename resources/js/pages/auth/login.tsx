import { Form, Head } from '@inertiajs/react';
import { useState } from 'react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

type Props = {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
};

export default function Login({
    status,
    canResetPassword,
    canRegister,
}: Props) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <AuthLayout
            title="Selamat Datang Kembali!"
            description="Masuk untuk mulai mengelola produk dengan mudah."
        >
            <Head title="Log in" />

            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                className="mt-4 flex flex-col"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-5">
                            <div className="grid gap-2">
                                <Label htmlFor="email" className="font-semibold text-slate-900">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="email"
                                    placeholder="Masukkan email Anda"
                                    className="h-12 border-slate-200 bg-white/50 px-4 transition-all focus:border-slate-900 focus:bg-white focus:ring-2 focus:ring-slate-900/10 placeholder:text-slate-400 font-normal outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-slate-900"
                                    style={{ borderRadius: '0.75rem' }}
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password" className="font-semibold text-slate-900">Kata Sandi</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        required
                                        tabIndex={2}
                                        autoComplete="current-password"
                                        placeholder="Masukkan kata sandi Anda"
                                        className="h-12 w-full border-slate-200 bg-white/50 px-4 pr-12 transition-all focus:border-slate-900 focus:bg-white focus:ring-2 focus:ring-slate-900/10 placeholder:text-slate-400 font-normal outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-slate-900"
                                        style={{ borderRadius: '0.75rem' }}
                                    />
                                    <button 
                                        type="button" 
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600 focus:outline-none"
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/><line x1="3" y1="3" x2="21" y2="21"/></svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                                        )}
                                    </button>
                                </div>
                                <InputError message={errors.password} />
                            </div>

                            <div className="mt-1 flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="remember"
                                        name="remember"
                                        tabIndex={3}
                                        className="rounded border-slate-300 text-slate-900 shadow-sm focus:ring-slate-900"
                                    />
                                    <Label htmlFor="remember" className="text-[13px] font-medium text-slate-500">Ingat Saya</Label>
                                </div>
                                {canResetPassword && (
                                    <TextLink
                                        href={request()}
                                        className="text-[13px] font-medium text-slate-500 transition-colors hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 rounded-sm"
                                        tabIndex={5}
                                    >
                                        Lupa Kata Sandi?
                                    </TextLink>
                                )}
                            </div>

                            <Button
                                type="submit"
                                className="mt-2 h-12 w-full rounded-full bg-[#161616] text-base font-medium text-white shadow-[0_8px_16px_rgba(0,0,0,0.06)] transition-transform hover:-translate-y-px hover:bg-black"
                                tabIndex={4}
                                disabled={processing}
                                data-test="login-button"
                            >
                                {processing && <Spinner className="mr-2" />}
                                Masuk
                            </Button>
                        </div>

                        {/* {canRegister && (
                            <div className="mt-8 text-center text-sm text-slate-500">
                                Belum punya akun?{' '}
                                <TextLink href={register()} className="font-semibold text-slate-900 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 rounded-sm" tabIndex={5}>
                                    Daftar di sini
                                </TextLink>
                            </div>
                        )} */}
                    </>
                )}
            </Form>

            {status && (
                <div className="mt-6 text-center text-sm font-medium text-green-600">
                    {status}
                </div>
            )}
        </AuthLayout>
    );
}
