import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

export default function SuccessPage() {
    return (
        <div className="container section text-center">
            <div className="success-card">
                <div className="success-icon">
                    <CheckCircle size={64} className="text-secondary" />
                </div>
                <h1>Booking Confirmed!</h1>
                <p>
                    Your appointment request has been successfully sent. <br />
                    We have sent a confirmation email to you.
                </p>

                <div className="success-actions">
                    <Link href="/doctors" className="btn btn-primary">
                        Book Another
                    </Link>
                    <Link href="/" className="btn btn-outline">
                        Return Home
                    </Link>
                </div>
            </div>
        </div>
    )
}
