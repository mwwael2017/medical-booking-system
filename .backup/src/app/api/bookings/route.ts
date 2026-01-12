import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const {
            doctorId,
            patientName,
            patientEmail,
            patientPhone,
            date, // ISO string
            type,
            notes
        } = body

        // Simple validation
        if (!doctorId || !patientName || !date || !type) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        // Check availability again to prevent double booking race condition (simple check)
        // ...

        const booking = await prisma.booking.create({
            data: {
                doctorId,
                patientName,
                patientEmail,
                patientPhone,
                date: new Date(date),
                type,
                notes,
                status: 'CONFIRMED' // Auto confirm for MVP
            }
        })

        return NextResponse.json(booking)
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 })
    }
}

export async function GET() {
    try {
        const bookings = await prisma.booking.findMany({
            include: {
                doctor: true
            },
            orderBy: {
                date: 'desc'
            }
        })
        return NextResponse.json(bookings)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 })
    }
}
