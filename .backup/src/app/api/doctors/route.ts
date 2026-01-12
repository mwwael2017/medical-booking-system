import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const specialty = searchParams.get('specialty')

    try {
        const doctors = await prisma.doctor.findMany({
            where: specialty ? {
                specialtyName: {
                    equals: specialty,
                } // Case sensitive in SQLite usually, but let's keep simple
            } : {},
            include: {
                specialty: true
            }
        })
        return NextResponse.json(doctors)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch doctors' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const doctor = await prisma.doctor.create({
            data: body
        })
        return NextResponse.json(doctor)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create doctor' }, { status: 500 })
    }
}
