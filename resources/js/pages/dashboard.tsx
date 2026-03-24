import { Head, router } from '@inertiajs/react';
import { BookOpen, Folders, FileText, Activity } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { NumberTicker } from '@/components/ui/number-ticker';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

type Props = {
    stats: {
        classes: number;
        categories: number;
        posts: number;
    };
    activeUsers: number;
    chartData: { label: string; visitors: number }[];
    filters: {
        range: string;
    };
};

const chartConfig = {
    visitors: {
        label: 'Pengunjung',
        color: '#3b82f6', // Warna biru
    },
} satisfies ChartConfig;

export default function Dashboard({ stats, activeUsers, chartData, filters }: Props) {
    const handleRangeChange = (value: string) => {
        router.get(
            '/dashboard',
            { range: value },
            { preserveState: true, preserveScroll: true }
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6 bg-slate-50/50">
                
                {/* Header & Active Users */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Platform Analytics</h1>
                        <p className="text-sm text-slate-500">Overview sistem pembelajaran Temanmoo</p>
                    </div>
                    
                    <div className="flex items-center gap-3 px-4 py-2 bg-white border rounded-full shadow-sm">
                        <div className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                        </div>
                        <span className="text-sm font-medium text-slate-700">
                            <span className="font-bold text-slate-900 mr-1">{activeUsers}</span> 
                            Pengunjung Aktif (15m)
                        </span>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="grid gap-4 md:grid-cols-3">
                    {/* Classes Card */}
                    <Card className="hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-medium text-slate-600">Total Kelas</CardTitle>
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                <BookOpen className="w-4 h-4" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-slate-900">
                                <NumberTicker value={stats.classes} />
                            </div>
                            <p className="text-xs text-slate-500 mt-1">Kelas aktif di platform</p>
                        </CardContent>
                    </Card>

                    {/* Categories Card */}
                    <Card className="hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-medium text-slate-600">Total Kategori</CardTitle>
                            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                                <Folders className="w-4 h-4" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-slate-900">
                                <NumberTicker value={stats.categories} />
                            </div>
                            <p className="text-xs text-slate-500 mt-1">Kategori pembelajaran</p>
                        </CardContent>
                    </Card>

                    {/* Posts Card */}
                    <Card className="hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-medium text-slate-600">Total Post</CardTitle>
                            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                                <FileText className="w-4 h-4" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-slate-900">
                                <NumberTicker value={stats.posts} />
                            </div>
                            <p className="text-xs text-slate-500 mt-1">Modul & materi dipublikasi</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Visitor Chart */}
                <Card className="flex-1 mt-2 shadow-sm border-slate-200">
                    <CardHeader className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center justify-between gap-4 border-b bg-slate-50/50 pb-6">
                        <div>
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <Activity className="w-5 h-5 text-indigo-500" />
                                Traffic Pengunjung
                            </CardTitle>
                            <CardDescription>Berdasarkan data aktivitas pada platform</CardDescription>
                        </div>
                        <div className="w-[180px]">
                            <Select value={filters.range} onValueChange={handleRangeChange}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih rentang waktu" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="today">Hari Ini</SelectItem>
                                    <SelectItem value="7d">7 Hari Terakhir</SelectItem>
                                    <SelectItem value="30d">30 Hari Terakhir</SelectItem>
                                    <SelectItem value="12m">12 Bulan Terakhir</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardHeader>
                    <CardContent className="px-2 sm:p-6 pb-2 min-h-[350px]">
                        {chartData.length === 0 ? (
                            <div className="flex h-full items-center justify-center text-slate-500">
                                Belum ada data pengunjung.
                            </div>
                        ) : (
                            <ChartContainer config={chartConfig} className="h-[350px] w-full">
                                <AreaChart
                                    accessibilityLayer
                                    data={chartData}
                                    margin={{
                                        left: 0,
                                        right: 0,
                                        top: 10,
                                        bottom: 0,
                                    }}
                                >
                                    <defs>
                                        <linearGradient id="fillVisitors" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="var(--color-visitors)" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="var(--color-visitors)" stopOpacity={0.05} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.5} />
                                    <XAxis
                                        dataKey="label"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={12}
                                        minTickGap={32}
                                        tick={{ fill: 'currentColor', fontSize: 12, opacity: 0.7 }}
                                    />
                                    <YAxis 
                                        tickLine={false}
                                        axisLine={false}
                                        tick={{ fill: 'currentColor', fontSize: 12, opacity: 0.7 }}
                                        tickMargin={10}
                                        className="hidden sm:block"
                                    />
                                    <ChartTooltip
                                        cursor={false}
                                        content={<ChartTooltipContent indicator="dot" className="bg-white shadow-xl border-slate-100" />}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="visitors"
                                        stroke="var(--color-visitors)"
                                        strokeWidth={2}
                                        fill="url(#fillVisitors)"
                                        activeDot={{ r: 6, strokeWidth: 0 }}
                                    />
                                </AreaChart>
                            </ChartContainer>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
