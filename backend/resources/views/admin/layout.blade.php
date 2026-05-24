<!doctype html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ $title ?? 'Aizu Admin' }}</title>
    <style>
        :root {
            color-scheme: dark;
            --bg: #050014;
            --panel: rgba(30, 18, 67, .78);
            --panel-strong: rgba(48, 32, 92, .88);
            --line: rgba(192, 159, 255, .18);
            --text: #f6f2ff;
            --muted: #aaa0c4;
            --purple: #9b5cff;
            --violet: #6c2cff;
            --soft: #d9cdfd;
        }

        * { box-sizing: border-box; }
        body {
            margin: 0;
            min-height: 100vh;
            background:
                radial-gradient(circle at 50% -10%, rgba(150, 92, 255, .34), transparent 38rem),
                radial-gradient(circle at 85% 18%, rgba(118, 49, 255, .22), transparent 25rem),
                linear-gradient(180deg, #120a2b 0%, #050014 42%, #070018 100%);
            color: var(--text);
            font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        body:before {
            content: "";
            position: fixed;
            inset: 0;
            pointer-events: none;
            background-image:
                linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px);
            background-size: 54px 54px;
            mask-image: linear-gradient(to bottom, transparent, #000 26%, transparent 88%);
        }

        a { color: inherit; text-decoration: none; }
        .shell { max-width: 1180px; margin: 0 auto; padding: 22px; position: relative; z-index: 1; }
        .topbar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 18px;
            padding: 12px 14px;
            border: 1px solid var(--line);
            border-radius: 999px;
            background: rgba(16, 8, 37, .66);
            backdrop-filter: blur(18px);
            box-shadow: 0 22px 80px rgba(0, 0, 0, .25);
        }

        .brand { display: inline-flex; align-items: center; gap: 10px; font-weight: 800; }
        .brand-mark {
            width: 34px; height: 34px; border-radius: 50%;
            display: grid; place-items: center;
            background: radial-gradient(circle at 35% 30%, #fff, #a875ff 32%, #4c12b9 76%);
            box-shadow: 0 0 28px rgba(155, 92, 255, .65);
        }

        .nav { display: flex; flex-wrap: wrap; gap: 6px; justify-content: flex-end; }
        .nav a, .button {
            border: 1px solid var(--line);
            border-radius: 999px;
            padding: 10px 14px;
            background: rgba(255, 255, 255, .045);
            color: var(--soft);
            font-size: 13px;
            font-weight: 700;
            cursor: pointer;
        }
        .nav a.active, .button.primary {
            background: linear-gradient(180deg, #b48aff, #6f35e8);
            color: #fff;
            box-shadow: 0 10px 32px rgba(126, 61, 255, .35);
        }

        .hero { padding: 54px 6px 34px; text-align: center; position: relative; overflow: hidden; }
        .hero:after {
            content: "";
            position: absolute;
            left: 50%;
            top: -310px;
            width: min(1050px, 126vw);
            height: 520px;
            transform: translateX(-50%);
            border-bottom: 2px solid rgba(223, 205, 255, .74);
            border-radius: 0 0 50% 50%;
            box-shadow: 0 32px 70px rgba(135, 69, 255, .55);
            pointer-events: none;
        }
        .eyebrow {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 7px 12px;
            border-radius: 999px;
            border: 1px solid var(--line);
            background: rgba(255,255,255,.055);
            color: var(--soft);
            font-size: 12px;
            font-weight: 800;
        }
        h1 { margin: 18px auto 10px; max-width: 760px; font-size: clamp(36px, 7vw, 78px); line-height: .98; letter-spacing: 0; }
        .muted { color: var(--muted); }

        .grid { display: grid; gap: 16px; }
        .stats { grid-template-columns: repeat(5, minmax(0, 1fr)); }
        .cards { grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); }
        .card, .table-wrap, .form-card {
            border: 1px solid var(--line);
            border-radius: 18px;
            background: linear-gradient(180deg, rgba(40, 25, 80, .78), rgba(15, 6, 38, .76));
            box-shadow: 0 18px 60px rgba(0, 0, 0, .25);
            backdrop-filter: blur(16px);
        }
        .card { padding: 20px; min-height: 142px; }
        .stat-number { font-size: 38px; font-weight: 900; }
        .card-title { font-size: 18px; font-weight: 850; margin: 8px 0 8px; }

        .section-head { display: flex; align-items: end; justify-content: space-between; gap: 16px; margin: 34px 0 14px; }
        .section-head h2 { margin: 0; font-size: clamp(24px, 3vw, 38px); }

        .table-wrap { overflow: hidden; }
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 15px; border-bottom: 1px solid var(--line); text-align: left; vertical-align: middle; }
        th { color: var(--soft); font-size: 12px; text-transform: uppercase; letter-spacing: .08em; }
        tr:last-child td { border-bottom: 0; }
        .thumb {
            width: 72px; height: 52px; border-radius: 12px; object-fit: cover;
            background: linear-gradient(135deg, rgba(255,255,255,.2), rgba(155,92,255,.24));
            border: 1px solid var(--line);
        }

        .actions { display: flex; gap: 8px; flex-wrap: wrap; justify-content: flex-end; }
        .danger { color: #ffd3de; background: rgba(255, 74, 121, .12); }
        .status { margin: 18px 0; padding: 13px 16px; border-radius: 14px; background: rgba(142, 255, 194, .12); border: 1px solid rgba(142, 255, 194, .28); }

        .form-card { padding: 22px; }
        .form-grid { display: grid; gap: 16px; grid-template-columns: repeat(2, minmax(0, 1fr)); }
        label { display: grid; gap: 8px; color: var(--soft); font-weight: 750; font-size: 13px; }
        input, textarea {
            width: 100%;
            border: 1px solid var(--line);
            border-radius: 14px;
            background: rgba(255,255,255,.055);
            color: var(--text);
            padding: 13px 14px;
            font: inherit;
            outline: none;
        }
        textarea { min-height: 150px; resize: vertical; }
        .span-2 { grid-column: 1 / -1; }
        .errors { padding: 14px 16px; border-radius: 14px; background: rgba(255, 89, 125, .12); border: 1px solid rgba(255, 89, 125, .3); }
        .pagination { margin-top: 18px; }

        @media (max-width: 760px) {
            .topbar { border-radius: 18px; align-items: flex-start; flex-direction: column; }
            .nav { justify-content: flex-start; }
            .stats, .form-grid { grid-template-columns: 1fr; }
            .section-head { align-items: flex-start; flex-direction: column; }
            table, thead, tbody, tr, th, td { display: block; }
            thead { display: none; }
            td { border-bottom: 0; padding: 10px 15px; }
            tr { border-bottom: 1px solid var(--line); padding: 8px 0; }
            .actions { justify-content: flex-start; }
        }
    </style>
</head>
<body>
    @php($resources = \App\Http\Controllers\Admin\AdminResources::all())
    <div class="shell">
        <header class="topbar">
            <a class="brand" href="{{ route('admin.dashboard') }}">
                <span class="brand-mark">A</span>
                <span>Aizu Admin</span>
            </a>
            <nav class="nav">
                <a class="{{ request()->routeIs('admin.dashboard') ? 'active' : '' }}" href="{{ route('admin.dashboard') }}">Dashboard</a>
                @foreach ($resources as $key => $resourceConfig)
                    <a class="{{ request()->route('resource') === $key ? 'active' : '' }}" href="{{ route('admin.content.index', $key) }}">{{ $resourceConfig['label'] }}</a>
                @endforeach
            </nav>
        </header>

        @if (session('status'))
            <div class="status">{{ session('status') }}</div>
        @endif

        @yield('content')
    </div>
</body>
</html>
