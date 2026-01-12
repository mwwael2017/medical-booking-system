import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const doctorId = searchParams.get('doctorId')
    const dateString = searchParams.get('date') // YYYY-MM-DD

    if (!doctorId || !dateString) {
        return NextResponse.json({ error: 'Missing doctorId or date' }, { status: 400 })
    }

    try {
        // 1. Get existing bookings for this doctor on this date
        // We need to match the date part. 
        // SQLite date comparison can be string based if stored as ISO.
        // In Prisma, DateTime is stored. We need to filter by range start of day to end of day.

        const startOfDay = new Date(dateString)
        startOfDay.setHours(0, 0, 0, 0)

        const endOfDay = new Date(dateString)
        endOfDay.setHours(23, 59, 59, 999)

        const bookings = await prisma.booking.findMany({
            where: {
                doctorId,
                date: {
                    gte: startOfDay,
                    lte: endOfDay
                },
                status: {
                    not: 'CANCELLED'
                }
            }
        })

        // 2. Define standard slots (9:00 to 17:00, 1 hour slots)
        const timeSlots = [
            '09:00', '10:00', '11:00', '12:00',
            '13:00', '14:00', '15:00', '16:00', '17:00'
        ]

        // 3. Mark availability
        const bookedTimes = bookings.map(b => {
            // Extract HH:mm from booking date
            const d = new Date(b.date)
            const hours = d.getHours().toString().padStart(2, '0')
            const minutes = d.getMinutes().toString().padStart(2, '0')
            return `${hours}:${minutes}`
        })

        const slots = timeSlots.map(time => ({
            time,
            available: !bookedTimes.includes(time)
        }))

        return NextResponse.json(slots)

    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Failed to fetch availability' }, { status: 500 })
    }
}
