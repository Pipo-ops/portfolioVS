<?php
/**
 * Kontaktformular-Endpoint für schuster-phillip.at
 * Nimmt JSON entgegen, validiert, sendet Mail an office@schuster-phillip.at.
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

// Nur POST erlauben
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'method_not_allowed']);
    exit;
}

// JSON-Body lesen
$raw = file_get_contents('php://input');
$data = json_decode($raw, true);

if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'invalid_json']);
    exit;
}

// Honeypot — Bots füllen das versteckte "website"-Feld aus
if (!empty($data['website'])) {
    // Erfolg vortäuschen, Mail aber nicht senden
    echo json_encode(['ok' => true]);
    exit;
}

// Felder extrahieren + sanitizen
$name    = trim((string)($data['name'] ?? ''));
$email   = trim((string)($data['email'] ?? ''));
$company = trim((string)($data['company'] ?? ''));
$subject = trim((string)($data['subject'] ?? ''));
$message = trim((string)($data['message'] ?? ''));
$consent = (bool)($data['consent'] ?? false);

// Validierung
if (mb_strlen($name) < 2) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'name_invalid']);
    exit;
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'email_invalid']);
    exit;
}
if (mb_strlen($message) < 10) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'message_invalid']);
    exit;
}
if (!$consent) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'consent_missing']);
    exit;
}

// Header-Injection verhindern
foreach ([$name, $email, $subject, $company] as $field) {
    if (preg_match('/[\r\n]/', $field)) {
        http_response_code(400);
        echo json_encode(['ok' => false, 'error' => 'invalid_input']);
        exit;
    }
}

// Mail zusammenbauen
$to = 'office@schuster-phillip.at';
$mailSubject = $subject !== '' ? $subject : "Portfolio-Kontakt von $name";

$body  = "Neue Nachricht über das Portfolio-Formular\r\n";
$body .= "----------------------------------------\r\n\r\n";
$body .= "Name:    $name\r\n";
$body .= "E-Mail:  $email\r\n";
if ($company !== '') {
    $body .= "Firma:   $company\r\n";
}
$body .= "Betreff: $mailSubject\r\n\r\n";
$body .= "Nachricht:\r\n$message\r\n";

$headers = [
    'From: Portfolio <noreply@schuster-phillip.at>',
    "Reply-To: $name <$email>",
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: PHP/' . phpversion(),
];

$ok = @mail(
    $to,
    '=?UTF-8?B?' . base64_encode($mailSubject) . '?=',
    $body,
    implode("\r\n", $headers)
);

if ($ok) {
    echo json_encode(['ok' => true]);
} else {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'send_failed']);
}
