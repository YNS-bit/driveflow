<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; color: #333; line-height: 1.5; }
        .box { border: 1px solid #e2e8f0; padding: 20px; border-radius: 8px; max-width: 500px; }
        .red { color: #dc2626; font-weight: bold; }
    </style>
</head>
<body>
    <div class="box">
        <h2>Bonjour {{ $booking->user->name }},</h2>
        <p>Merci d'avoir choisi <span class="red">DriveFlow</span> pour votre location automobile !</p>
        <p>Votre réservation pour le véhicule <strong>{{ $booking->vehicle->brand }} {{ $booking->vehicle->model }}</strong> est bien confirmée.</p>
        <p>Vous trouverez ci-joint votre facture officielle au format PDF.</p>
        <p>Bonne route et à très bientôt,<br>L'équipe DriveFlow</p>
    </div>
</body>
</html>