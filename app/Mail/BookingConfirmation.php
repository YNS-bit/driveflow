<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use App\Models\Booking;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Mail\Mailables\Attachment;

class BookingConfirmation extends Mailable
{
    use Queueable, SerializesModels;

    public $booking;

    // On injecte la réservation quand on crée l'email
    public function __construct(Booking $booking)
    {
        $this->booking = $booking;
    }

    // L'objet (le titre) de l'email
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'DriveFlow - Confirmation de votre réservation',
        );
    }

    // Le design du texte de l'email
    public function content(): Content
    {
        return new Content(
            view: 'emails.booking', // On va créer cette vue juste après
        );
    }

    // Les pièces jointes (Notre fameux PDF !)
    public function attachments(): array
    {
        // 1. On génère le PDF en mémoire (sans le télécharger)
        $pdf = Pdf::loadView('pdf.invoice', ['booking' => $this->booking]);

        // 2. On l'attache à l'email
        return [
            Attachment::fromData(fn () => $pdf->output(), 'Facture_DriveFlow.pdf')
                    ->withMime('application/pdf'),
        ];
    }
}