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
}
