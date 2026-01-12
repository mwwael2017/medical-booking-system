import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'MediBook | Professional Medical Consultations',
    description: 'Book your medical consultation with top specialists easily.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                <header className="site-header">
                    <div className="container header-inner">
                        <Link href="/" className="logo">
                            Medi<span className="text-primary">Book</span>
                        </Link>
                        <nav className="main-nav">
                            <Link href="/doctors" className="nav-link">Find Doctors</Link>
                            <Link href="/admin/dashboard" className="nav-link">Admin</Link>
                            <Link href="/doctors" className="btn btn-primary btn-sm">Book Consultation</Link>
                        </nav>
                    </div>
                </header>
                <main>{children}</main>

                <footer className="site-footer">
                    <div className="container">
                        <p>&copy; {new Date().getFullYear()} MediBook. All rights reserved.</p>
                    </div>
                </footer>
            </body>
        </html>
    )
}
