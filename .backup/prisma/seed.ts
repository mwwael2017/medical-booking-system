import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Seeding database...')

    // Specialties
    const specialtiesIn = [
        { name: 'General Medicine', imageUrl: '/icons/general.svg' },
        { name: 'Cardiology', imageUrl: '/icons/cardiology.svg' },
        { name: 'Dermatology', imageUrl: '/icons/dermatology.svg' },
        { name: 'Pediatrics', imageUrl: '/icons/pediatrics.svg' },
        { name: 'Neurology', imageUrl: '/icons/neurology.svg' },
        { name: 'Orthopedics', imageUrl: '/icons/orthopedics.svg' },
    ]

    for (const s of specialtiesIn) {
        await prisma.specialty.upsert({
            where: { name: s.name },
            update: {},
            create: s,
        })
    }

    // Doctors
    const doctorsIn = [
        {
            name: 'Dr. Sarah Johnson',
            specialtyName: 'Cardiology',
            experience: 12,
            price: 150.0,
            bio: 'Expert cardiologist with over a decade of experience in treating heart conditions.',
            consultationTypes: 'Online,Clinic',
            isOnline: true,
            imageUrl: '/doctors/dr-sarah.jpg' // Placeholder
        },
        {
            name: 'Dr. Michael Chen',
            specialtyName: 'Dermatology',
            experience: 8,
            price: 120.0,
            bio: 'Specialist in skin care, acne treatment, and cosmetic dermatology.',
            consultationTypes: 'Online',
            isOnline: true,
            imageUrl: '/doctors/dr-michael.jpg'
        },
        {
            name: 'Dr. Emily Williams',
            specialtyName: 'Pediatrics',
            experience: 15,
            price: 100.0,
            bio: 'Caring pediatrician dedicated to the health and well-being of children.',
            consultationTypes: 'Clinic',
            isOnline: false,
            imageUrl: '/doctors/dr-emily.jpg'
        },
        {
            name: 'Dr. Robert Brown',
            specialtyName: 'General Medicine',
            experience: 20,
            price: 80.0,
            bio: 'Family physician providing comprehensive primary care for all ages.',
            consultationTypes: 'Online,Clinic',
            isOnline: true,
            imageUrl: '/doctors/dr-robert.jpg'
        },
        {
            name: 'Dr. Lisa Davis',
            specialtyName: 'Neurology',
            experience: 10,
            price: 200.0,
            bio: 'Neurologist specializing in headaches, migraines, and nerve disorders.',
            consultationTypes: 'Clinic',
            isOnline: true,
            imageUrl: '/doctors/dr-lisa.jpg'
        },
    ]

    for (const d of doctorsIn) {
        // Check if doctor exists to avoid duplicates on re-seed (primitive check)
        const existing = await prisma.doctor.findFirst({
            where: { name: d.name }
        })

        if (!existing) {
            await prisma.doctor.create({
                data: d
            })
        }
    }

    console.log('Seeding finished.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
