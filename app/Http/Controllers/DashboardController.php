<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Classes;
use App\Models\Post;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $range = $request->query('range', '7d'); // today, 7d, 30d, 12m

        // Active Users: sessions updated in the last 15 minutes
        $activeUsers = DB::table('sessions')
            ->where('last_activity', '>=', time() - 900)
            ->count();

        // Stats
        $stats = [
            'classes' => Classes::count(),
            'categories' => Category::count(),
            'posts' => Post::count(),
        ];

        // Chart Data
        $chartData = $this->getChartData($range);

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'activeUsers' => $activeUsers,
            'chartData' => $chartData,
            'filters' => ['range' => $range],
        ]);
    }

    private function getChartData(string $range): array
    {
        $now = Carbon::now();
        $data = [];
        $sessionsQuery = DB::table('sessions');

        if ($range === 'today') {
            $start = $now->copy()->startOfDay();
            $sessions = $sessionsQuery->where('last_activity', '>=', $start->timestamp)->pluck('last_activity');
            
            // Initialize 24 hours
            for ($i = 0; $i < 24; $i++) {
                $data[sprintf('%02d:00', $i)] = 0;
            }

            foreach ($sessions as $timestamp) {
                $hour = Carbon::createFromTimestamp($timestamp)->format('H:00');
                if (isset($data[$hour])) {
                    $data[$hour]++;
                }
            }
        } elseif ($range === '7d' || $range === '30d') {
            $days = $range === '7d' ? 6 : 29;
            $start = $now->copy()->subDays($days)->startOfDay();
            $sessions = $sessionsQuery->where('last_activity', '>=', $start->timestamp)->pluck('last_activity');

            // Initialize days
            for ($i = $days; $i >= 0; $i--) {
                $date = $now->copy()->subDays($i)->format('d M');
                $data[$date] = 0;
            }

            foreach ($sessions as $timestamp) {
                $date = Carbon::createFromTimestamp($timestamp)->format('d M');
                if (isset($data[$date])) {
                    $data[$date]++;
                }
            }
        } elseif ($range === '12m') {
            $start = $now->copy()->subMonths(11)->startOfMonth();
            $sessions = $sessionsQuery->where('last_activity', '>=', $start->timestamp)->pluck('last_activity');

            // Initialize months
            for ($i = 11; $i >= 0; $i--) {
                $month = $now->copy()->subMonths($i)->format('M y');
                $data[$month] = 0;
            }

            foreach ($sessions as $timestamp) {
                $month = Carbon::createFromTimestamp($timestamp)->format('M y');
                if (isset($data[$month])) {
                    $data[$month]++;
                }
            }
        }

        // Format for recharts
        $formattedData = [];
        foreach ($data as $label => $value) {
            $formattedData[] = [
                'label' => $label,
                'visitors' => $value,
            ];
        }

        return $formattedData;
    }
}
