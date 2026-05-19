<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Facture - DriveFlow</title>
    <style>
        body {
            font-family: 'Helvetica', Arial, sans-serif;
            font-size: 10pt;
            color: #1e293b;
            margin: 0;
            padding: 10px;
        }

        /* En-tête */
        .header-table {
            width: 100%;
            border-bottom: 3px solid #dc2626; /* Ligne rouge DriveFlow */
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .logo {
            font-size: 32pt;
            font-weight: 900;
            font-style: italic;
            letter-spacing: -1px;
            color: #0f172a;
        }
        .logo span {
            color: #dc2626;
        }
        .invoice-title {
            text-align: right;
            font-size: 26pt;
            font-weight: bold;
            color: #0f172a;
            text-transform: uppercase;
            margin: 0;
            line-height: 1;
        }
        .invoice-number {
            text-align: right;
            font-size: 11pt;
            color: #64748b;
            margin-top: 5px;
        }

        /* Adresses */
        .address-table {
            width: 100%;
            margin-bottom: 40px;
            border-collapse: collapse;
        }
        .address-box {
            width: 45%;
            background-color: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 15px;
            vertical-align: top;
        }
        .address-box h3 {
            margin-top: 0;
            color: #dc2626;
            font-size: 10pt;
            text-transform: uppercase;
            border-bottom: 1px solid #e2e8f0;
            padding-bottom: 8px;
            margin-bottom: 10px;
        }
        .address-text {
            line-height: 1.6;
            font-size: 10pt;
        }

        /* Tableau des prestations */
        .items-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
        }
        .items-table th {
            background-color: #0f172a;
            color: #ffffff;
            font-size: 9pt;
            text-transform: uppercase;
            padding: 12px;
            text-align: left;
        }
        .items-table th.right { text-align: right; }
        .items-table td {
            padding: 15px 12px;
            border-bottom: 1px solid #e2e8f0;
            vertical-align: top;
        }
        .items-table td.right { text-align: right; }
        .vehicle-name { font-weight: bold; font-size: 11pt; color: #0f172a; }
        .vehicle-details { font-size: 9pt; color: #64748b; margin-top: 4px; }

        /* Bas de page (Paiement et Totaux) */
        .bottom-section {
            width: 100%;
            margin-top: 20px;
        }
        .payment-info {
            width: 50%;
            float: left;
            padding: 15px;
            background-color: #f8fafc;
            border-left: 4px solid #dc2626;
            font-size: 9pt;
            color: #475569;
        }
        .payment-info h4 { margin: 0 0 5px 0; color: #0f172a; font-size: 10pt; text-transform: uppercase;}
        
        .totals-table {
            width: 40%;
            float: right;
            border-collapse: collapse;
        }
        .totals-table td {
            padding: 8px 12px;
            text-align: right;
            font-size: 10pt;
            color: #334155;
        }
        .totals-table .total-final td {
            font-size: 14pt;
            font-weight: bold;
            color: #dc2626;
            border-top: 2px solid #0f172a;
            padding-top: 12px;
        }

        /* Pied de page */
        .footer {
            clear: both;
            margin-top: 70px;
            padding-top: 15px;
            border-top: 1px solid #e2e8f0;
            text-align: center;
            font-size: 8pt;
            color: #94a3b8;
            line-height: 1.5;
        }
    </style>
</head>
<body>

    <table class="header-table">
        <tr>
            <td>
                <div class="logo">DRIVE<span>FLOW</span></div>
            </td>
            <td>
                <div class="invoice-title">FACTURE</div>
                <div class="invoice-number">
                    <strong>N° DF-{{ date('Y') }}-{{ str_pad($booking->id, 4, '0', STR_PAD_LEFT) }}</strong><br>
                    Date d'émission : {{ now()->format('d/m/Y') }}
                </div>
            </td>
        </tr>
    </table>

    <table class="address-table">
        <tr>
            <td class="address-box">
                <h3>Émetteur</h3>
                <div class="address-text">
                    <strong>DriveFlow S.A.R.L</strong><br>
                    Avenue regueragui, Madinat Al Irfane<br>
                    10000 Rabat, Maroc<br>
                    Email : contact@driveflow.ma<br>
                    Tél : +212 5 37 XX XX XX
                </div>
            </td>
            <td style="width: 5%;"></td> <td class="address-box">
                <h3>Facturé à</h3>
                <div class="address-text">
                    <strong>{{ $booking->user->name }}</strong><br>
                    Client ID : #{{ str_pad($booking->user->id, 4, '0', STR_PAD_LEFT) }}<br>
                    Email : {{ $booking->user->email }}<br>
                    <br>
                    <strong style="color: #10b981;">STATUT : PAYÉ</strong>
                </div>
            </td>
        </tr>
    </table>

    <table class="items-table">
        <thead>
            <tr>
                <th>Désignation</th>
                <th>Période</th>
                <th class="right">Montant HT</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                    <div class="vehicle-name">{{ $booking->vehicle->brand }} {{ $booking->vehicle->model }}</div>
                    <div class="vehicle-details">Location de véhicule tourisme sans chauffeur.</div>
                </td>
                <td>
                    Du : {{ \Carbon\Carbon::parse($booking->start_date)->format('d/m/Y') }}<br>
                    Au : {{ \Carbon\Carbon::parse($booking->end_date)->format('d/m/Y') }}
                </td>
                <td class="right">
                    {{ number_format($booking->total_price / 1.2, 2, ',', ' ') }} DH
                </td>
            </tr>
        </tbody>
    </table>

    <div class="bottom-section">
        <div class="payment-info">
            <h4>Informations de paiement</h4>
            <p style="margin: 0;">
                Règlement effectué par carte bancaire.<br>
                Merci de votre confiance.<br><br>
                <em>En cas de litige, le tribunal de commerce de Rabat est seul compétent.</em>
            </p>
        </div>

        <table class="totals-table">
            <tr>
                <td>Total HT</td>
                <td>{{ number_format($booking->total_price / 1.2, 2, ',', ' ') }} DH</td>
            </tr>
            <tr>
                <td>TVA (20%)</td>
                <td>{{ number_format($booking->total_price - ($booking->total_price / 1.2), 2, ',', ' ') }} DH</td>
            </tr>
            <tr class="total-final">
                <td>Total TTC</td>
                <td>{{ number_format($booking->total_price, 2, ',', ' ') }} DH</td>
            </tr>
        </table>
    </div>

    <div class="footer">
        DriveFlow S.A.R.L au capital de 100.000 MAD - Siège social : Rabat, Maroc<br>
        RC : 123456 -