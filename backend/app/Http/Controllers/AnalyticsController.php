<?php

namespace App\Http\Controllers;

use App\Models\Report;
use Illuminate\Support\Facades\DB;

class AnalyticsController extends Controller
{
    public function index()
    {
        // ================= PIE DATA =================
        $pie = [
            [
                "name" => "Active Leak",
                "value" => Report::where("type", "Active Leak")->count(),
                "color" => "#ef4444"
            ],
            [
                "name" => "Early Leak",
                "value" => Report::where("type", "Early Leak")->count(),
                "color" => "#f59e0b"
            ],
            [
                "name" => "Fixed Leak",
                "value" => Report::where("status", "Verified")->count(),
                "color" => "#22c55e"
            ],
        ];

        // ================= LINE DATA (GROUP BY MONTH) =================
        $line = Report::selectRaw("
                DATE_FORMAT(time, '%b') as month,
                COUNT(*) as leaks
            ")
            ->groupBy('month')
            ->orderByRaw('MIN(time)')
            ->get();

        // ================= BAR DATA (BY LOCATION) =================
        $bar = Report::selectRaw("
                location as region,
                COUNT(*) as leaks
            ")
            ->groupBy('location')
            ->orderByDesc('leaks')
            ->limit(6)
            ->get();

        // ================= HIGH RISK AREAS =================
        $highRisk = Report::selectRaw("
                location as name,
                COUNT(*) as count
            ")
            ->groupBy('location')
            ->orderByDesc('count')
            ->limit(5)
            ->get();

        return response()->json([
            "pie" => $pie,
            "line" => $line,
            "bar" => $bar,
            "highRisk" => $highRisk,
        ]);
    }
}
