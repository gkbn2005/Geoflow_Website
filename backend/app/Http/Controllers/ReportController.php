<?php

namespace App\Http\Controllers;

use App\Models\Report;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    // GET /api/reports
    public function index()
    {
        return Report::all();
    }

    // POST /api/reports
    public function store(Request $request)
    {
        return Report::create($request->all());
    }

    public function update(Request $request, $id)
    {
        $report = Report::findOrFail($id);

        $request->validate([
            'status' => 'required|string'
        ]);

        $report->update([
            'status' => $request->status
        ]);

        return response()->json([
            'message' => 'Status updated successfully',
            'report' => $report
        ]);
    }
}
