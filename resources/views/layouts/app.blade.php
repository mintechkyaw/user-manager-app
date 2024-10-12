<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    @vite('resources/css/app.css')
    <title>User-Manager-App</title>
</head>

<body class="bg-white dark:bg-gray-900">
    <div id="app"></div>
    @vite('resources/js/app.js')
</body>

</html>