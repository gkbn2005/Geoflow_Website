<?php

namespace App\Http\Controllers;

use App\Models\Report;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        // ================= STATS =================
        $stats = [
            [
                "label" => "Total Leaks",
                "value" => Report::count(),
                "change" => "+0%",
                "color" => "#6366f1",
                "icon" => "AlertCircle"
            ],
            [
                "label" => "Active Leaks",
                "value" => Report::where("status", "Pending")->count(),
                "change" => "+0%",
                "color" => "#ef4444",
                "icon" => "AlertCircle"
            ],
            [
                "label" => "Resolved Today",
                "value" => Report::where("status", "Verified")
                    ->whereDate("updated_at", today())
                    ->count(),
                "change" => "+0%",
                "color" => "#22c55e",
                "icon" => "CheckCircle2"
            ],
            [
                "label" => "Avg Response Time",
                "value" => "2.4h",
                "change" => "-0%",
                "color" => "#0ea5e9",
                "icon" => "Clock"
            ],
        ];

        // ================= LINE DATA (LAST 7 DAYS) =================
        $lineData = Report::selectRaw("
                DATE(time) as day,
                COUNT(*) as leaks
            ")
            ->whereDate("time", ">=", now()->subDays(7))
            ->groupBy("day")
            ->orderBy("day")
            ->get()
            ->map(function ($item) {
                return [
                    "day" => date('D', strtotime($item->day)),
                    "leaks" => $item->leaks
                ];
            });

        // ================= PIE DATA =================
        $pieData = [
            [
                "name" => "Active",
                "value" => Report::where("status", "Pending")->count(),
                "color" => "#ef4444"
            ],
            [
                "name" => "Early",
                "value" => Report::where("type", "Early Leak")->count(),
                "color" => "#f59e0b"
            ],
            [
                "name" => "Resolved",
                "value" => Report::where("status", "Verified")->count(),
                "color" => "#22c55e"
            ],
        ];

        // ================= RECENT LEAKS =================
        $recentLeaks = Report::orderBy("created_at", "desc")
            ->limit(5)
            ->get()
            ->map(function ($r) {
                return [
                    "id" => $r->report_id,
                    "location" => $r->location,
                    "severity" =>
                        $r->type === "Active Leak" ? "High" :
                        ($r->type === "Early Leak" ? "Medium" : "Low"),
                ];
            });

        return response()->json([
            "stats" => $stats,
            "lineData" => $lineData,
            "pieData" => $pieData,
            "recentLeaks" => $recentLeaks,
        ]);
    }
}
