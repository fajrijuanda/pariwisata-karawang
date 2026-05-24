<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Schema;

class DashboardController extends Controller
{
    public function __invoke()
    {
        $resources = collect(AdminResources::all())->map(function (array $resource, string $key) {
            $table = (new $resource['model']())->getTable();
            $hasTable = Schema::hasTable($table);

            return [
                ...$resource,
                'key' => $key,
                'count' => $hasTable ? $resource['model']::count() : 0,
                'latest' => $hasTable ? $resource['model']::latest()->limit(3)->get() : collect(),
            ];
        });

        return view('admin.dashboard', compact('resources'));
    }
}
