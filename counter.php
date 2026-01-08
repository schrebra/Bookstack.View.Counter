<?php
// Prevent browser caching so every refresh counts
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Pragma: no-cache");
header('Content-Type: text/plain');

// 1. Get and clean the page ID
$page_id = isset($_GET['page_id']) ? preg_replace('/[^a-zA-Z0-9_-]/', '', $_GET['page_id']) : 'unknown';

// 2. Setup the directory
$directory = __DIR__ . '/view_counts/';
if (!is_dir($directory)) {
    mkdir($directory, 0755, true);
}

$file_path = $directory . $page_id . '.txt';

// 3. Read, Increment, and Save
$count = file_exists($file_path) ? (int)file_get_contents($file_path) : 0;
$count++;

if (file_put_contents($file_path, $count) !== false) {
    echo $count;
} else {
    echo "Error";
}
