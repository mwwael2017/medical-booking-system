import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
    try {
        const specialties = await prisma.specialty.findMany()
        return NextResponse.json(specialties)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch specialties' }, { status: 500 })
    }
}
