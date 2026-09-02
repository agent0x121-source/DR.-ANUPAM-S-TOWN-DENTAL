/* ==========================================================================
   The Dental Solutions — Central Data Store & Management Database Engine
   --------------------------------------------------------------------------
   Unified source of truth for Clinic Info, Doctors, Services, Blogs,
   Reviews, Appointments, Patients, Staff & Roles, WhatsApp Automation,
   Revenue Tracking, and Audit Logs.
   ========================================================================== */
(function (global) {
    'use strict';

    var STORAGE_KEY = 'tds_db_v1';
    var SESSION_KEY = 'lumora_active_session';
    var PATIENT_SESSION_KEY = 'lumora_patient_session';

    /* Initial Seed Data based on real website content */
    var INITIAL_DATA = {
        clinic: {
            name: 'The Dental Solutions',
            brand: 'The Dental Solutions',
            tagline: 'Modern, gentle dentistry in Shivajinagar, Pune.',
            address: '3rd Floor, Grand Helios Building, 303, Off FC Rd, above Axis Bank, opp. Hotel Ambassador, Model Colony, Shivajinagar, Pune 411016',
            shortAddress: 'Model Colony, Shivajinagar, Pune',
            phone: '+91 97654 07679',
            phoneSecondary: '+91 97654 07679',
            phoneE164: '919765407679',
            whatsapp: '+91 97654 07679',
            email: 'hello@drkaustubhpatilpune.com',
            emergencyEmail: 'care@drkaustubhpatilpune.com',
            mapsUrl: 'https://maps.google.com/?cid=4187806642178671438',
            mapsEmbed: 'https://maps.google.com/maps?q=Dr.%20Kaustubh%20Patil%20-%20The%20Dental%20Solutions%20Dental%20Clinic%2C%20Model%20Colony%2C%20Pune&output=embed',
            hours: {
                0: { open: '09:00', close: '18:00', brk: null, label: 'Sunday: Closed', closed: true },
                1: { open: '09:00', close: '18:00', brk: null, label: 'Monday: 9:00 AM - 6:00 PM', closed: false },
                2: { open: '09:00', close: '18:00', brk: null, label: 'Tuesday: 9:00 AM - 6:00 PM', closed: false },
                3: { open: '09:00', close: '18:00', brk: null, label: 'Wednesday: 9:00 AM - 6:00 PM', closed: false },
                4: { open: '09:00', close: '18:00', brk: null, label: 'Thursday: 9:00 AM - 6:00 PM', closed: false },
                5: { open: '09:00', close: '18:00', brk: null, label: 'Friday: 9:00 AM - 6:00 PM', closed: false },
                6: { open: '09:00', close: '18:00', brk: null, label: 'Saturday: 9:00 AM - 6:00 PM', closed: false }
            },
            transit: {
                metro: '',
                bus: '',
                landmark: 'Off FC Road — above Axis Bank, opposite Hotel Ambassador',
                parking: ''
            },
            bookingWindowDays: 60,
            minNoticeMinutes: 90,
            currency: '₹',
            closedDates: []
        },

        doctors: [
            {
                id: 'kaustubh-patil',
                name: 'Dr. Kaustubh Patil',
                email: 'dr.kaustubh@drkaustubhpatilpune.com',
                specialization: 'Periodontist, Implantologist & Dental Surgeon',
                qualification: 'MDS (Periodontics), BDS',
                experience: '16+ years experience',
                department: 'Periodontics, Implants & General Dentistry',
                image: 'assets/img/gen_team-image-5.jpg',
                phone: '+91 97654 07679',
                bio: 'Periodontist and oral implantologist leading The Dental Solutions. Focused on dental implants, root canal treatment, gum care and full-mouth rehabilitation, with a calm, clearly explained approach to every treatment.',
                languages: ['English', 'Hindi', 'Marathi'],
                services: ['general-consultation', 'preventive-dentistry', 'cosmetic-dentistry', 'restorative-treatments', 'follow-up'],
                featured: true,
                active: true,
                loginEnabled: true,
                schedule: {
                    0: { open: '09:00', close: '18:00', closed: true },
                    1: { open: '09:00', close: '18:00', brk: null },
                    2: { open: '09:00', close: '18:00', brk: null },
                    3: { open: '09:00', close: '18:00', brk: null },
                    4: { open: '09:00', close: '18:00', brk: null },
                    5: { open: '09:00', close: '18:00', brk: null },
                    6: { open: '09:00', close: '18:00', brk: null }
                }
            },
            {
                id: 'sidra',
                name: 'Associate Dentist',
                email: 'associate@drkaustubhpatilpune.com',
                specialization: 'Orthodontics & Aligners',
                qualification: 'BDS, MDS Orthodontics',
                experience: '6 years experience',
                department: 'Preventive & Cosmetic Dentistry',
                image: 'assets/img/gen_team-image-6.jpg',
                phone: '+91 97654 07679',
                bio: 'Gentle preventive and cosmetic care, aligners, braces, smile makeovers, with a dedicated focus on first-time and anxious patients.',
                languages: ['English', 'Hindi', 'Marathi'],
                services: ['general-consultation', 'preventive-dentistry', 'cosmetic-dentistry', 'orthodontics', 'follow-up'],
                featured: true,
                active: true,
                loginEnabled: true,
                schedule: {
                    0: { open: '09:00', close: '18:00', closed: true },
                    1: { open: '09:00', close: '18:00', brk: null },
                    2: { open: '09:00', close: '18:00', brk: null },
                    3: { open: '09:00', close: '18:00', brk: null },
                    4: { open: '09:00', close: '18:00', brk: null },
                    5: { open: '09:00', close: '18:00', brk: null },
                    6: { open: '09:00', close: '18:00', brk: null }
                }
            },
            {
                id: 'taniya',
                name: 'Consultant Dentist',
                email: 'consultant@drkaustubhpatilpune.com',
                specialization: 'Root Canal & Restorative Care',
                qualification: 'BDS',
                experience: '5 years experience',
                department: 'General Dentistry',
                image: 'assets/img/gen_team-image-1.jpg',
                phone: '+91 97654 07679',
                bio: 'Routine check-ups, cleanings, root canals and aesthetic fillings, with a calm, unhurried chairside manner.',
                languages: ['English', 'Hindi', 'Marathi'],
                services: ['general-consultation', 'preventive-dentistry', 'restorative-treatments', 'follow-up'],
                featured: true,
                active: true,
                loginEnabled: true,
                schedule: {
                    0: { open: '09:00', close: '18:00', closed: true },
                    1: { open: '09:00', close: '18:00', brk: null },
                    2: { open: '09:00', close: '18:00', brk: null },
                    3: { open: '09:00', close: '18:00', brk: null },
                    4: { open: '09:00', close: '18:00', brk: null },
                    5: { open: '09:00', close: '18:00', brk: null },
                    6: { open: '09:00', close: '18:00', brk: null }
                }
            },
            {
                id: 'parul',
                name: 'Dental Hygienist',
                email: 'hygienist@drkaustubhpatilpune.com',
                specialization: 'Preventive Care & Gum Health',
                qualification: 'BDS, Dental Hygiene',
                experience: '4 years experience',
                department: 'Preventive Dentistry',
                image: 'assets/img/gen_team-image-3.jpg',
                phone: '+91 97654 07679',
                bio: 'Scaling, deep polishing, gum therapy and personalized advice on maintaining dental health for life.',
                languages: ['English', 'Hindi', 'Marathi'],
                services: ['general-consultation', 'preventive-dentistry', 'follow-up'],
                featured: false,
                active: true,
                loginEnabled: true,
                schedule: {
                    0: { open: '09:00', close: '18:00', closed: true },
                    1: { open: '09:00', close: '18:00', brk: null },
                    2: { open: '09:00', close: '18:00', brk: null },
                    3: { open: '09:00', close: '18:00', brk: null },
                    4: { open: '09:00', close: '18:00', brk: null },
                    5: { open: '09:00', close: '18:00', brk: null },
                    6: { open: '09:00', close: '18:00', brk: null }
                }
            }
        ],

        services: [
            {
                id: 'preventive-dentistry',
                name: 'Preventive Dentistry',
                tagline: 'Preserve your natural smile with proactive care',
                description: 'At The Dental Solutions, we combine expertise, compassion, and modern technology for gentle cleanings, scaling, fluoride varnish and oral exams.',
                duration: 30,
                price: 800,
                modes: ['in-person'],
                image: 'assets/img/gen_service-image-1.jpg',
                category: 'Routine Care',
                featured: true,
                active: true,
                doctors: ['kaustubh-patil', 'sidra', 'taniya', 'parul']
            },
            {
                id: 'restorative-treatments',
                name: 'Restorative Treatments',
                tagline: 'Repair and rebuild teeth with durable aesthetics',
                description: 'Comprehensive restorations including composite fillings, tooth-colored ceramic crowns, bridges, and single-sitting root canal treatments.',
                duration: 60,
                price: 2500,
                modes: ['in-person'],
                image: 'assets/img/gen_service-image-2.jpg',
                category: 'Restoration',
                featured: true,
                active: true,
                doctors: ['kaustubh-patil', 'taniya']
            },
            {
                id: 'cosmetic-dentistry',
                name: 'Cosmetic Dentistry',
                tagline: 'Crafting radiant, balanced, and natural smiles',
                description: 'Professional in-office laser teeth whitening, ultra-thin porcelain veneers, composite bonding and complete digital smile design.',
                duration: 45,
                price: 3500,
                modes: ['in-person'],
                image: 'assets/img/gen_service-image-3.jpg',
                category: 'Aesthetics',
                featured: true,
                active: true,
                doctors: ['kaustubh-patil', 'sidra']
            },
            {
                id: 'orthodontics',
                name: 'Orthodontics & Aligners',
                tagline: 'Straighten your teeth comfortably and discreetly',
                description: 'Clear aligners, self-ligating ceramic braces and bite correction for teens and adults with digital 3D intraoral scanning.',
                duration: 45,
                price: 15000,
                modes: ['in-person'],
                image: 'assets/img/gen_service-image-4.jpg',
                category: 'Orthodontics',
                featured: true,
                active: true,
                doctors: ['sidra']
            },
            {
                id: 'general-consultation',
                name: 'General Consultation & Digital X-Ray',
                tagline: 'Comprehensive diagnostic evaluation',
                description: 'Detailed oral examination, digital RVG x-rays, intraoral camera photography, and a personalized step-by-step treatment plan.',
                duration: 30,
                price: 500,
                modes: ['in-person'],
                image: 'assets/img/gen_service-image-5.jpg',
                category: 'Consultation',
                featured: true,
                active: true,
                doctors: ['kaustubh-patil', 'sidra', 'taniya', 'parul']
            },
            {
                id: 'follow-up',
                name: 'Follow-up Consultation',
                tagline: 'Post-treatment progress review',
                description: 'Review visit following procedures to ensure ideal healing, comfort, and ongoing oral wellness.',
                duration: 15,
                price: 300,
                modes: ['in-person', 'online'],
                image: 'assets/img/gen_service-image-6.jpg',
                category: 'Review',
                featured: false,
                active: true,
                doctors: ['kaustubh-patil', 'sidra', 'taniya', 'parul']
            }
        ],

        blogs: [
            {
                id: 'blog-brushing-guide',
                title: 'The ultimate guide to brushing: are you doing it right?',
                slug: 'the-ultimate-guide-to-brushing',
                category: 'Preventive Care',
                author: 'Dr. Kaustubh Patil',
                date: 'April 30, 2026',
                summary: 'Discover how simple brushing improvements can dramatically transform your dental longevity, prevent decay, and preserve your natural enamel.',
                content: '<p>Most people brush twice a day, but few realize that technique matters just as much as frequency. Holding your toothbrush at a 45-degree angle to the gumline and using gentle, circular motions ensures plaque removal without irritating tender gingival tissues.</p><p>Always use a soft-bristled brush and replace it every 3 months. Electric toothbrushes with pressure sensors are also highly recommended for gentle, consistent cleaning.</p>',
                image: 'assets/img/gen_blog-image-4.jpg',
                featured: true,
                published: true
            },
            {
                id: 'blog-dental-myths',
                title: 'Dental myths busted: what your teeth really need for your career',
                slug: 'dental-myths-busted',
                category: 'Oral Health Tips',
                author: 'Associate Dentist',
                date: 'April 22, 2026',
                summary: 'From hard brushing to avoiding x-rays, we debunk the most common misconceptions preventing patients from achieving their best smile.',
                content: '<p>Myth #1: Hard bristles clean better. In reality, stiff bristles abrade protective enamel and cause receding gums. Myth #2: Sugar is the sole cause of cavities. In truth, acid-producing bacteria thrive on any carbohydrate left on teeth without prompt cleaning.</p>',
                image: 'assets/img/gen_blog-image-6.jpg',
                featured: false,
                published: true
            },
            {
                id: 'blog-flossing-truth',
                title: 'The truth about flossing: why skipping it isn’t an option',
                slug: 'the-truth-about-flossing',
                category: 'Preventive Care',
                author: 'Dental Hygienist',
                date: 'April 15, 2026',
                summary: 'Brushing only cleans 60% of your tooth surfaces. Learn why daily interdental flossing is essential for preventing gum disease.',
                content: '<p>Interdental spaces harbor anaerobic bacteria that toothbrushes cannot reach. A single daily flossing session cleans tight contact areas and prevents tartar buildup before it turns into periodontitis.</p>',
                image: 'assets/img/gen_blog-image-5.jpg',
                featured: false,
                published: true
            },
            {
                id: 'blog-food-habits',
                title: 'Foods that secretly harm your teeth, and what to eat instead',
                slug: 'foods-that-secretly-harm-your-teeth',
                category: 'Diet & Nutrition',
                author: 'Consultant Dentist',
                date: 'April 08, 2026',
                summary: 'Hidden acids in fruit juices, sodas, and sticky snacks can erode enamel. Discover smile-friendly superfoods.',
                content: '<p>Citrus fruits, sparkling waters, and sports drinks lower oral pH, weakening calcium bonds. Incorporating calcium-rich dairy, crunchy apples, and green tea provides natural remineralizing benefits.</p>',
                image: 'assets/img/gen_blog-image-3.jpg',
                featured: false,
                published: true
            }
        ],

        reviews: [
            {
                id: 'rev-1',
                author: 'Kristin Watson',
                designation: 'Business Owner',
                rating: 5,
                comment: '“I’ve always been nervous about visiting the dentist, but The Dental Solutions changed everything. The staff is warm, and the care is exceptional. I finally enjoy smiling again.”',
                avatar: 'assets/img/gen_testimonial-author-1.jpg',
                doctorId: 'kaustubh-patil',
                serviceId: 'cosmetic-dentistry',
                date: '2026-08-14',
                featured: true,
                published: true
            },
            {
                id: 'rev-2',
                author: 'Michael Carter',
                designation: 'Business Consultant',
                rating: 5,
                comment: '“The team made my dental visit incredibly comfortable. Professional care, clear explanations, and excellent results. I finally feel confident about my smile again.”',
                avatar: 'assets/img/gen_testimonial-author-2.jpg',
                doctorId: 'sidra',
                serviceId: 'preventive-dentistry',
                date: '2026-08-20',
                featured: true,
                published: true
            },
            {
                id: 'rev-3',
                author: 'Daniel Hughes',
                designation: 'Software Engineer',
                rating: 5,
                comment: '“From consultation to treatment, everything was smooth and stress-free. The dentist was gentle, and the staff was supportive. Highly recommend their dental services.”',
                avatar: 'assets/img/gen_testimonial-author-3.jpg',
                doctorId: 'taniya',
                serviceId: 'restorative-treatments',
                date: '2026-08-28',
                featured: true,
                published: true
            },
            {
                id: 'rev-4',
                author: 'Ayesha Siddiqui',
                designation: 'Architect',
                rating: 5,
                comment: '“Very clean clinic with modern equipment. Dr. Kaustubh Patil explained the root canal step by step and there was virtually zero pain. Outstanding experience in Shivajinagar.”',
                avatar: 'assets/img/gen_testimonial-author-1.jpg',
                doctorId: 'kaustubh-patil',
                serviceId: 'restorative-treatments',
                date: '2026-08-30',
                featured: true,
                published: true
            }
        ],

        patients: [
            {
                id: 'pat-1001',
                name: 'Sameer Kulkarni',
                phone: '+91 98112 34567',
                email: 'sameer.k@example.com',
                age: 34,
                gender: 'Male',
                bloodGroup: 'B+',
                address: 'Wakad, Shivajinagar, Pune',
                medicalHistory: 'Mild sensitivity on lower molars. No known drug allergies.',
                lastVisit: '2026-08-25',
                upcomingAppointment: '2026-09-03 11:30',
                status: 'Active',
                totalVisits: 4,
                totalSpent: 4200,
                createdAt: '2026-01-15T10:00:00Z'
            },
            {
                id: 'pat-1002',
                name: 'Priya Deshmukh',
                phone: '+91 98734 56789',
                email: 'priya.sharma@example.com',
                age: 28,
                gender: 'Female',
                bloodGroup: 'O+',
                address: 'Akurdi, Pune',
                medicalHistory: 'Orthodontic alignment in progress with Associate Dentist.',
                lastVisit: '2026-08-28',
                upcomingAppointment: '2026-09-05 16:00',
                status: 'Active',
                totalVisits: 6,
                totalSpent: 16500,
                createdAt: '2026-02-10T14:30:00Z'
            },
            {
                id: 'pat-1003',
                name: 'Rohit Shinde',
                phone: '+91 99581 23456',
                email: 'rohit.s@example.com',
                age: 42,
                gender: 'Male',
                bloodGroup: 'A+',
                address: 'Chinchwad, Pune',
                medicalHistory: 'Hypertension controlled by medication. Crown placement complete.',
                lastVisit: '2026-08-18',
                upcomingAppointment: null,
                status: 'Active',
                totalVisits: 3,
                totalSpent: 6000,
                createdAt: '2026-03-05T09:15:00Z'
            },
            {
                id: 'pat-1004',
                name: 'Sneha Jadhav',
                phone: '+91 97110 87654',
                email: 'sneha.j@example.com',
                age: 22,
                gender: 'Female',
                bloodGroup: 'AB+',
                address: 'Bhosari, Pune',
                medicalHistory: 'Routine preventive cleanings every 6 months.',
                lastVisit: '2026-07-12',
                upcomingAppointment: '2026-09-02 14:00',
                status: 'Active',
                totalVisits: 2,
                totalSpent: 1600,
                createdAt: '2026-04-12T11:00:00Z'
            },
            {
                id: 'pat-1005',
                name: 'Rohit Verma',
                phone: '+91 98109 43210',
                email: 'rohit.v@example.com',
                age: 39,
                gender: 'Male',
                bloodGroup: 'O-',
                address: 'Nigdi, Pune',
                medicalHistory: 'Wisdom tooth extraction candidate.',
                lastVisit: '2026-06-20',
                upcomingAppointment: null,
                status: 'Inactive',
                totalVisits: 1,
                totalSpent: 800,
                createdAt: '2026-06-20T16:00:00Z'
            }
        ],

        appointments: [
            {
                reference: 'DC-901A01',
                patientId: 'pat-1001',
                patientName: 'Sameer Kulkarni',
                patientPhone: '+91 98112 34567',
                patientEmail: 'sameer.k@example.com',
                patientAge: 34,
                doctorId: 'kaustubh-patil',
                serviceId: 'preventive-dentistry',
                date: '2026-09-03',
                time: '11:30 AM',
                startIso: '2026-09-03T11:30:00',
                status: 'Confirmed',
                fee: 800,
                paymentStatus: 'Paid',
                notes: 'Follow-up dental scaling and polish.',
                createdAt: '2026-08-30T10:15:00Z',
                history: [
                    { time: '2026-08-30T10:15:00Z', action: 'Booked online', user: 'Patient' },
                    { time: '2026-08-30T11:00:00Z', action: 'Confirmed by Admin', user: 'Admin' }
                ]
            },
            {
                reference: 'DC-901A02',
                patientId: 'pat-1002',
                patientName: 'Priya Deshmukh',
                patientPhone: '+91 98734 56789',
                patientEmail: 'priya.sharma@example.com',
                patientAge: 28,
                doctorId: 'sidra',
                serviceId: 'orthodontics',
                date: '2026-09-05',
                time: '04:00 PM',
                startIso: '2026-09-05T16:00:00',
                status: 'Confirmed',
                fee: 15000,
                paymentStatus: 'Paid',
                notes: 'Aligner tray 4 adjustment.',
                createdAt: '2026-08-31T09:30:00Z',
                history: [
                    { time: '2026-08-31T09:30:00Z', action: 'Booked online', user: 'Patient' },
                    { time: '2026-08-31T10:00:00Z', action: 'Confirmed by Staff', user: 'Staff' }
                ]
            },
            {
                reference: 'DC-901A03',
                patientId: 'pat-1004',
                patientName: 'Sneha Jadhav',
                patientPhone: '+91 97110 87654',
                patientEmail: 'sneha.j@example.com',
                patientAge: 22,
                doctorId: 'taniya',
                serviceId: 'general-consultation',
                date: '2026-09-02',
                time: '02:00 PM',
                startIso: '2026-09-02T14:00:00',
                status: 'Pending',
                fee: 500,
                paymentStatus: 'Pending',
                notes: 'Mild toothache on upper right premolar.',
                createdAt: '2026-09-01T08:00:00Z',
                history: [
                    { time: '2026-09-01T08:00:00Z', action: 'Booked online via Website', user: 'Patient' }
                ]
            },
            {
                reference: 'DC-901A04',
                patientId: 'pat-1003',
                patientName: 'Rohit Shinde',
                patientPhone: '+91 99581 23456',
                patientEmail: 'rohit.s@example.com',
                patientAge: 42,
                doctorId: 'kaustubh-patil',
                serviceId: 'restorative-treatments',
                date: '2026-08-18',
                time: '05:30 PM',
                startIso: '2026-08-18T17:30:00',
                status: 'Attended',
                fee: 3500,
                paymentStatus: 'Paid',
                notes: 'Permanent crown cementing completed successfully.',
                createdAt: '2026-08-14T11:20:00Z',
                history: [
                    { time: '2026-08-14T11:20:00Z', action: 'Booked online', user: 'Patient' },
                    { time: '2026-08-14T12:00:00Z', action: 'Confirmed', user: 'Admin' },
                    { time: '2026-08-18T18:15:00Z', action: 'Marked Attended by Dr. Kaustubh Patil', user: 'Dr. Kaustubh Patil' }
                ]
            },
            {
                reference: 'DC-901A05',
                patientId: null,
                patientName: 'Karan Pawar',
                patientPhone: '+91 98118 77665',
                patientEmail: 'karan.m@example.com',
                patientAge: 31,
                doctorId: 'sidra',
                serviceId: 'cosmetic-dentistry',
                date: '2026-08-22',
                time: '03:00 PM',
                startIso: '2026-08-22T15:00:00',
                status: 'Not Attended',
                fee: 3500,
                paymentStatus: 'Pending',
                notes: 'Patient did not arrive. No phone response.',
                createdAt: '2026-08-19T14:10:00Z',
                history: [
                    { time: '2026-08-19T14:10:00Z', action: 'Booked online', user: 'Patient' },
                    { time: '2026-08-19T15:00:00Z', action: 'Confirmed', user: 'Admin' },
                    { time: '2026-08-22T16:00:00Z', action: 'Marked Not Attended', user: 'Staff' }
                ]
            }
        ],

        staff: [
            {
                id: 'usr-admin-1',
                name: 'Clinic Administrator',
                email: 'admin@drkaustubhpatilpune.com',
                role: 'ADMIN',
                phone: '+91 97654 07679',
                active: true,
                avatar: '/assets/img/clinic-icon.svg',
                permissions: [
                    'dashboard', 'appointments', 'calendar', 'patients', 'doctors',
                    'services', 'blogs', 'reviews', 'analytics', 'reports',
                    'revenue', 'contact', 'whatsapp', 'staff', 'settings'
                ],
                createdAt: '2026-01-01T00:00:00Z'
            },
            {
                id: 'usr-staff-1',
                name: 'Aaliya Reception Desk',
                email: 'staff@drkaustubhpatilpune.com',
                role: 'STAFF',
                phone: '+91 97654 07679',
                active: true,
                avatar: 'assets/img/gen_team-image-1.jpg',
                permissions: [
                    'dashboard', 'appointments', 'calendar', 'patients', 'reviews'
                ],
                createdAt: '2026-02-01T00:00:00Z'
            }
        ],

        /* Auth credentials dictionary (hash simulated in client layer) */
        credentials: {
            'admin@drkaustubhpatilpune.com': { password: 'admin123', role: 'ADMIN', refId: 'usr-admin-1' },
            'staff@drkaustubhpatilpune.com': { password: 'staff123', role: 'STAFF', refId: 'usr-staff-1' },
            'dr.kaustubh@drkaustubhpatilpune.com': { password: 'doctor123', role: 'DOCTOR', refId: 'kaustubh-patil' },
            'associate@drkaustubhpatilpune.com': { password: 'doctor123', role: 'DOCTOR', refId: 'sidra' },
            'consultant@drkaustubhpatilpune.com': { password: 'doctor123', role: 'DOCTOR', refId: 'taniya' },
            'hygienist@drkaustubhpatilpune.com': { password: 'doctor123', role: 'DOCTOR', refId: 'parul' },
            'admin@drkaustubhpatilpune.com': { password: 'admin123', role: 'ADMIN', refId: 'usr-admin-1' },
            'staff@drkaustubhpatilpune.com': { password: 'staff123', role: 'STAFF', refId: 'usr-staff-1' },
            'dr.kaustubh@drkaustubhpatilpune.com': { password: 'doctor123', role: 'DOCTOR', refId: 'kaustubh-patil' },
            'associate@drkaustubhpatilpune.com': { password: 'doctor123', role: 'DOCTOR', refId: 'sidra' },
            'consultant@drkaustubhpatilpune.com': { password: 'doctor123', role: 'DOCTOR', refId: 'taniya' },
            'hygienist@drkaustubhpatilpune.com': { password: 'doctor123', role: 'DOCTOR', refId: 'parul' },
            'patient@example.com': { password: 'patient123', role: 'PATIENT', refId: 'pat-1001' }
        },

        whatsappTemplates: {
            confirmation: {
                enabled: true,
                title: 'Appointment Confirmed',
                template: 'Namaste {{patientName}},\n\nYour dental consultation at *{{clinicName}}* has been *CONFIRMED*.\n\n📋 *Token No:* {{tokenNumber}}\n👨‍⚕️ *Consultant:* {{doctorName}}\n🦷 *Service:* {{serviceTitle}}\n📅 *Date:* {{date}}\n⏰ *Time Slot:* {{timeSlot}}\n🏥 *Location:* {{clinicAddress}}\n\n📌 *Instructions:* Please arrive 10 minutes prior for preliminary examination and check-in.\nNeed help? Call {{clinicPhone}}.'
            },
            rescheduled: {
                enabled: true,
                title: 'Appointment Rescheduled',
                template: 'Namaste {{patientName}},\n\nYour appointment at *{{clinicName}}* has been *RESCHEDULED* as requested.\n\n📋 *Token No:* {{tokenNumber}}\n👨‍⚕️ *Consultant:* {{doctorName}}\n📅 *NEW Date:* {{date}}\n⏰ *NEW Time Slot:* {{timeSlot}}\n🏥 *Location:* {{clinicAddress}}\n\nFor any changes, please call our helpdesk at {{clinicPhone}}.'
            },
            reminder: {
                enabled: true,
                title: '24-Hour Reminder',
                template: 'Namaste {{patientName}},\n\nThis is a gentle reminder for your scheduled dental appointment tomorrow with *{{doctorName}}*.\n\n📋 *Token No:* {{tokenNumber}}\n📅 *Date:* {{date}}\n⏰ *Time Slot:* {{timeSlot}}\n🏥 *Venue:* {{clinicName}}, {{clinicAddress}}\n\nKindly bring previous dental prescriptions or X-rays if available. Call {{clinicPhone}} for queries.'
            },
            attended: {
                enabled: true,
                title: 'Thank You for Visiting',
                template: 'Namaste {{patientName}},\n\nThank you for visiting *{{clinicName}}*. We hope your consultation with *{{doctorName}}* went smoothly.\n\n🦷 Please take prescribed medicines and follow oral care instructions at regular intervals.\n🚨 For any sudden pain, bleeding or discomfort, reach our emergency line at {{emergencyPhone}} immediately.\n\nWarm regards,\n*{{clinicName}}*'
            },
            notAttended: {
                enabled: true,
                title: 'Missed Appointment',
                template: 'Namaste {{patientName}},\n\nWe missed you today for your scheduled dental appointment (*Token: {{tokenNumber}}*) with *{{doctorName}}* at *{{clinicName}}*.\n\n🦷 Timely dental check-ups are vital for accurate diagnosis and preserving oral health.\n\nIf you would like to reschedule or consult for any tooth pain or symptoms, please reach our helpdesk:\n📞 *Reception Helpline:* {{clinicPhone}}\n🚨 *Emergency Dental Line:* {{emergencyPhone}}\n🏥 *Clinic Venue:* {{clinicAddress}}\n\nWarm regards,\n*{{clinicName}}*'
            },
            rejection: {
                enabled: true,
                title: 'Appointment Declined / Cancelled',
                template: 'Namaste {{patientName}},\n\nYour appointment scheduled on {{date}} at {{timeSlot}} with *{{doctorName}}* (Token: {{tokenNumber}}) has been *CANCELLED*.\n\nIf you would like to book a new date or have urgent dental concerns, please call {{clinicPhone}} or visit our website.\n\nWarm regards,\n*{{clinicName}}*'
            }
        },

        auditLogs: [
            {
                id: 'log-1',
                timestamp: '2026-09-01T08:00:00Z',
                user: 'System',
                role: 'SYSTEM',
                action: 'INITIALIZED',
                entity: 'Database',
                details: 'The Dental Solutions management core initialized.'
            }
        ],

        settings: {
            clinicName: 'The Dental Solutions',
            tagline: 'Modern, Gentle Dentistry',
            taxPercentage: 0,
            allowOnlineCancellation: true,
            cancellationNoticeHours: 4,
            requirePhoneVerification: false,
            soundNotifications: true,
            themeMode: 'dark',
            autoConfirmAppointments: false
        }
    };

    /* ----------------------------------------------------------- Engine Core */
    function LumoraDB() {
        this.data = null;
        this.listeners = [];
        this.init();
    }

    LumoraDB.prototype.init = function () {
        try {
            var raw = global.localStorage.getItem(STORAGE_KEY);
            if (raw) {
                var parsed = JSON.parse(raw);
                this.data = Object.assign({}, INITIAL_DATA, parsed);
                this.data.clinic = Object.assign({}, INITIAL_DATA.clinic, parsed.clinic || {});
                this.data.whatsappTemplates = Object.assign({}, INITIAL_DATA.whatsappTemplates, parsed.whatsappTemplates || {});
                this.data.credentials = Object.assign({}, INITIAL_DATA.credentials, parsed.credentials || {});
                this.data.settings = Object.assign({}, INITIAL_DATA.settings, parsed.settings || {});
            } else {
                this.data = JSON.parse(JSON.stringify(INITIAL_DATA));
                this.save();
            }
        } catch (e) {
            console.error('LumoraDB init error, fallback to memory', e);
            this.data = JSON.parse(JSON.stringify(INITIAL_DATA));
        }

        var self = this;
        global.addEventListener('storage', function (e) {
            if (e.key === STORAGE_KEY && e.newValue) {
                try {
                    self.data = JSON.parse(e.newValue);
                    self.notifyListeners('sync', null);
                } catch (err) {}
            }
        });
    };

    LumoraDB.prototype.save = function () {
        try {
            global.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
            this.notifyListeners('save', this.data);
        } catch (e) {
            console.warn('Storage save failed:', e);
        }
    };

    LumoraDB.prototype.subscribe = function (cb) {
        if (typeof cb === 'function') {
            this.listeners.push(cb);
        }
    };

    LumoraDB.prototype.notifyListeners = function (action, payload) {
        for (var i = 0; i < this.listeners.length; i++) {
            try {
                this.listeners[i](action, payload);
            } catch (e) {
                console.error(e);
            }
        }
    };

    LumoraDB.prototype.logAudit = function (user, role, action, entity, details) {
        var log = {
            id: 'log-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6),
            timestamp: new Date().toISOString(),
            user: user || 'Anonymous',
            role: role || 'STAFF',
            action: action,
            entity: entity,
            details: details
        };
        this.data.auditLogs.unshift(log);
        if (this.data.auditLogs.length > 500) {
            this.data.auditLogs = this.data.auditLogs.slice(0, 500);
        }
        this.save();
    };

    /* ----------------------------------------------------------- Auth Engine */
    LumoraDB.prototype.login = function (email, password) {
        email = (email || '').trim().toLowerCase();
        var cred = this.data.credentials[email];
        if (!cred) {
            return { success: false, message: 'Invalid email or password.' };
        }
        if (cred.password !== password) {
            return { success: false, message: 'Invalid email or password.' };
        }

        var sessionUser = {
            email: email,
            role: cred.role,
            refId: cred.refId
        };

        if (cred.role === 'ADMIN' || cred.role === 'STAFF') {
            var staffMember = (this.data.staff || []).find(function (s) { return s.id === cred.refId; });
            sessionUser.name = staffMember ? staffMember.name : 'Administrator';
            sessionUser.permissions = staffMember ? staffMember.permissions : ['all'];
            sessionUser.avatar = staffMember ? staffMember.avatar : 'assets/img/lumora-logo.svg';
        } else if (cred.role === 'DOCTOR') {
            var doc = (this.data.doctors || []).find(function (d) { return d.id === cred.refId; });
            sessionUser.name = doc ? doc.name : 'Doctor';
            sessionUser.specialization = doc ? doc.specialization : '';
            sessionUser.avatar = doc ? doc.image : 'assets/img/gen_team-image-5.jpg';
            sessionUser.permissions = ['doctor_portal', 'appointments', 'calendar', 'patients'];
        } else if (cred.role === 'PATIENT') {
            var pat = (this.data.patients || []).find(function (p) { return p.id === cred.refId; });
            sessionUser.name = pat ? pat.name : 'Patient';
            sessionUser.phone = pat ? pat.phone : '';
            sessionUser.permissions = ['patient_portal'];
        }

        try {
            if (cred.role === 'PATIENT') {
                global.localStorage.setItem(PATIENT_SESSION_KEY, JSON.stringify(sessionUser));
            } else {
                global.localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
            }
        } catch (e) {}

        this.logAudit(sessionUser.name, cred.role, 'LOGIN', 'Auth', 'User logged in successfully.');
        return { success: true, user: sessionUser };
    };

    LumoraDB.prototype.registerPatient = function (name, phone, email, password, age) {
        email = (email || '').trim().toLowerCase();
        phone = (phone || '').trim();
        name = (name || '').trim();

        if (!name || !phone || !email || !password) {
            return { success: false, message: 'All required fields must be filled.' };
        }
        if (this.data.credentials[email]) {
            return { success: false, message: 'An account with this email already exists.' };
        }

        var patId = 'pat-' + Date.now().toString(36).toUpperCase();
        var newPatient = {
            id: patId,
            name: name,
            phone: phone,
            email: email,
            age: parseInt(age, 10) || 30,
            gender: 'Unspecified',
            bloodGroup: 'N/A',
            address: '',
            medicalHistory: 'New registered patient via portal.',
            lastVisit: null,
            upcomingAppointment: null,
            status: 'Active',
            totalVisits: 0,
            totalSpent: 0,
            createdAt: new Date().toISOString()
        };

        this.data.patients.unshift(newPatient);
        this.data.credentials[email] = {
            password: password,
            role: 'PATIENT',
            refId: patId
        };

        this.save();
        this.logAudit(name, 'PATIENT', 'REGISTER', 'Patient', 'New patient registered: ' + name);

        return this.login(email, password);
    };

    LumoraDB.prototype.getSession = function () {
        try {
            var raw = global.localStorage.getItem(SESSION_KEY);
            return raw ? JSON.parse(raw) : null;
        } catch (e) {
            return null;
        }
    };

    LumoraDB.prototype.getPatientSession = function () {
        try {
            var raw = global.localStorage.getItem(PATIENT_SESSION_KEY);
            return raw ? JSON.parse(raw) : null;
        } catch (e) {
            return null;
        }
    };

    LumoraDB.prototype.logout = function (isPatient) {
        try {
            if (isPatient) {
                global.localStorage.removeItem(PATIENT_SESSION_KEY);
            } else {
                global.localStorage.removeItem(SESSION_KEY);
            }
        } catch (e) {}
    };

    /* ----------------------------------------------------- Entity Operations */

    LumoraDB.prototype.getClinic = function () {
        return JSON.parse(JSON.stringify(this.data.clinic));
    };

    LumoraDB.prototype.updateClinic = function (patch, actor) {
        this.data.clinic = Object.assign({}, this.data.clinic, patch);
        this.save();
        this.logAudit(actor ? actor.name : 'Admin', actor ? actor.role : 'ADMIN', 'UPDATE', 'Clinic Information', 'Updated contact & clinic information.');
        return this.data.clinic;
    };

    LumoraDB.prototype.getDoctors = function (activeOnly) {
        var list = this.data.doctors || [];
        if (activeOnly) {
            return list.filter(function (d) { return d.active !== false; });
        }
        return JSON.parse(JSON.stringify(list));
    };

    LumoraDB.prototype.getDoctorById = function (id) {
        return (this.data.doctors || []).find(function (d) { return d.id === id; }) || null;
    };

    LumoraDB.prototype.saveDoctor = function (doctor, actor) {
        doctor.active = doctor.active !== false;
        doctor.featured = !!doctor.featured;
        if (!doctor.id) {
            doctor.id = (doctor.name || 'doctor').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || ('doc-' + Date.now());
            doctor.services = doctor.services || ['general-consultation', 'preventive-dentistry'];
            this.data.doctors.push(doctor);
            this.logAudit(actor ? actor.name : 'Admin', actor ? actor.role : 'ADMIN', 'CREATE', 'Doctor', 'Added doctor ' + doctor.name);
        } else {
            var idx = this.data.doctors.findIndex(function (d) { return d.id === doctor.id; });
            if (idx !== -1) {
                this.data.doctors[idx] = Object.assign({}, this.data.doctors[idx], doctor);
                this.logAudit(actor ? actor.name : 'Admin', actor ? actor.role : 'ADMIN', 'UPDATE', 'Doctor', 'Updated doctor ' + doctor.name);
            } else {
                this.data.doctors.push(doctor);
            }
        }

        if (doctor.email && doctor.loginEnabled) {
            var lowerEmail = doctor.email.toLowerCase();
            if (!this.data.credentials[lowerEmail]) {
                this.data.credentials[lowerEmail] = {
                    password: 'doctor123',
                    role: 'DOCTOR',
                    refId: doctor.id
                };
            }
        }

        this.save();
        return doctor;
    };

    LumoraDB.prototype.deleteDoctor = function (id, actor) {
        var doc = this.getDoctorById(id);
        this.data.doctors = this.data.doctors.filter(function (d) { return d.id !== id; });
        if (doc && doc.email) {
            delete this.data.credentials[doc.email.toLowerCase()];
        }
        this.save();
        this.logAudit(actor ? actor.name : 'Admin', actor ? actor.role : 'ADMIN', 'DELETE', 'Doctor', 'Deleted doctor ID ' + id);
    };

    LumoraDB.prototype.getServices = function (activeOnly) {
        var list = this.data.services || [];
        if (activeOnly) {
            return list.filter(function (s) { return s.active !== false; });
        }
        return JSON.parse(JSON.stringify(list));
    };

    LumoraDB.prototype.getServiceById = function (id) {
        return (this.data.services || []).find(function (s) { return s.id === id; }) || null;
    };

    LumoraDB.prototype.saveService = function (svc, actor) {
        if (!svc.id) {
            svc.id = svc.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || ('svc-' + Date.now());
            svc.active = svc.active !== false;
            svc.duration = parseInt(svc.duration, 10) || 30;
            svc.price = parseInt(svc.price, 10) || 500;
            svc.modes = svc.modes || ['in-person'];
            this.data.services.push(svc);
            this.logAudit(actor ? actor.name : 'Admin', actor ? actor.role : 'ADMIN', 'CREATE', 'Service', 'Added service ' + svc.name);
        } else {
            var idx = this.data.services.findIndex(function (s) { return s.id === svc.id; });
            if (idx !== -1) {
                this.data.services[idx] = Object.assign({}, this.data.services[idx], svc);
                this.logAudit(actor ? actor.name : 'Admin', actor ? actor.role : 'ADMIN', 'UPDATE', 'Service', 'Updated service ' + svc.name);
            } else {
                this.data.services.push(svc);
            }
        }
        this.save();
        return svc;
    };

    LumoraDB.prototype.deleteService = function (id, actor) {
        this.data.services = this.data.services.filter(function (s) { return s.id !== id; });
        this.save();
        this.logAudit(actor ? actor.name : 'Admin', actor ? actor.role : 'ADMIN', 'DELETE', 'Service', 'Deleted service ID ' + id);
    };

    LumoraDB.prototype.getBlogs = function (publishedOnly) {
        var list = this.data.blogs || [];
        if (publishedOnly) {
            return list.filter(function (b) { return b.published !== false; });
        }
        return JSON.parse(JSON.stringify(list));
    };

    LumoraDB.prototype.getBlogById = function (id) {
        return (this.data.blogs || []).find(function (b) { return b.id === id; }) || null;
    };

    LumoraDB.prototype.saveBlog = function (blog, actor) {
        if (!blog.id) {
            blog.id = 'blog-' + Date.now().toString(36);
            blog.slug = blog.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            blog.date = blog.date || new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' });
            blog.published = blog.published !== false;
            this.data.blogs.unshift(blog);
            this.logAudit(actor ? actor.name : 'Admin', actor ? actor.role : 'ADMIN', 'CREATE', 'Blog', 'Published blog post ' + blog.title);
        } else {
            var idx = this.data.blogs.findIndex(function (b) { return b.id === blog.id; });
            if (idx !== -1) {
                this.data.blogs[idx] = Object.assign({}, this.data.blogs[idx], blog);
                this.logAudit(actor ? actor.name : 'Admin', actor ? actor.role : 'ADMIN', 'UPDATE', 'Blog', 'Updated blog post ' + blog.title);
            } else {
                this.data.blogs.unshift(blog);
            }
        }
        this.save();
        return blog;
    };

    LumoraDB.prototype.deleteBlog = function (id, actor) {
        this.data.blogs = this.data.blogs.filter(function (b) { return b.id !== id; });
        this.save();
        this.logAudit(actor ? actor.name : 'Admin', actor ? actor.role : 'ADMIN', 'DELETE', 'Blog', 'Deleted blog ID ' + id);
    };

    LumoraDB.prototype.getReviews = function (publishedOnly) {
        var list = this.data.reviews || [];
        if (publishedOnly) {
            return list.filter(function (r) { return r.published !== false; });
        }
        return JSON.parse(JSON.stringify(list));
    };

    LumoraDB.prototype.saveReview = function (rev, actor) {
        if (!rev.id) {
            rev.id = 'rev-' + Date.now().toString(36);
            rev.date = rev.date || new Date().toISOString().slice(0, 10);
            rev.rating = parseInt(rev.rating, 10) || 5;
            rev.published = rev.published !== false;
            rev.avatar = rev.avatar || 'assets/img/gen_testimonial-author-1.jpg';
            this.data.reviews.unshift(rev);
            this.logAudit(actor ? actor.name : 'Admin', actor ? actor.role : 'ADMIN', 'CREATE', 'Review', 'Added review from ' + rev.author);
        } else {
            var idx = this.data.reviews.findIndex(function (r) { return r.id === rev.id; });
            if (idx !== -1) {
                this.data.reviews[idx] = Object.assign({}, this.data.reviews[idx], rev);
                this.logAudit(actor ? actor.name : 'Admin', actor ? actor.role : 'ADMIN', 'UPDATE', 'Review', 'Updated review from ' + rev.author);
            } else {
                this.data.reviews.unshift(rev);
            }
        }
        this.save();
        return rev;
    };

    LumoraDB.prototype.deleteReview = function (id, actor) {
        this.data.reviews = this.data.reviews.filter(function (r) { return r.id !== id; });
        this.save();
        this.logAudit(actor ? actor.name : 'Admin', actor ? actor.role : 'ADMIN', 'DELETE', 'Review', 'Deleted review ID ' + id);
    };

    LumoraDB.prototype.getPatients = function () {
        return JSON.parse(JSON.stringify(this.data.patients || []));
    };

    LumoraDB.prototype.getPatientById = function (id) {
        return (this.data.patients || []).find(function (p) { return p.id === id; }) || null;
    };

    LumoraDB.prototype.savePatient = function (patient, actor) {
        if (!patient.id) {
            patient.id = 'pat-' + Date.now().toString(36).toUpperCase();
            patient.createdAt = new Date().toISOString();
            patient.status = patient.status || 'Active';
            patient.totalVisits = 0;
            patient.totalSpent = 0;
            this.data.patients.unshift(patient);
            this.logAudit(actor ? actor.name : 'Admin', actor ? actor.role : 'ADMIN', 'CREATE', 'Patient', 'Created patient record for ' + patient.name);
        } else {
            var idx = this.data.patients.findIndex(function (p) { return p.id === patient.id; });
            if (idx !== -1) {
                this.data.patients[idx] = Object.assign({}, this.data.patients[idx], patient);
                this.logAudit(actor ? actor.name : 'Admin', actor ? actor.role : 'ADMIN', 'UPDATE', 'Patient', 'Updated patient record for ' + patient.name);
            } else {
                this.data.patients.unshift(patient);
            }
        }
        this.save();
        return patient;
    };

    LumoraDB.prototype.getAppointments = function (filterDoctorId) {
        var list = this.data.appointments || [];
        if (filterDoctorId) {
            return list.filter(function (a) { return a.doctorId === filterDoctorId; });
        }
        return JSON.parse(JSON.stringify(list));
    };

    LumoraDB.prototype.getAppointmentByRef = function (ref) {
        return (this.data.appointments || []).find(function (a) { return a.reference === ref; }) || null;
    };

    LumoraDB.prototype.createAppointment = function (appt, actor) {
        var ref = appt.reference || ('DC-' + Date.now().toString(36).toUpperCase().slice(-6));
        var svc = this.getServiceById(appt.serviceId);
        var fee = svc ? svc.price : 500;

        var record = {
            reference: ref,
            patientId: appt.patientId || null,
            patientName: appt.patientName || (appt.patient && appt.patient.name) || 'Anonymous',
            patientPhone: appt.patientPhone || (appt.patient && (appt.patient.dialCode || '') + ' ' + (appt.patient.phone || '')) || '',
            patientEmail: appt.patientEmail || '',
            patientAge: appt.patientAge || (appt.patient && appt.patient.age) || 30,
            doctorId: appt.doctorId || (appt.doctor && appt.doctor.id),
            serviceId: appt.serviceId || (appt.service && appt.service.id),
            date: appt.date || (appt.startIso ? appt.startIso.slice(0, 10) : new Date().toISOString().slice(0, 10)),
            time: appt.time || (appt.startIso ? new Date(appt.startIso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '11:00 AM'),
            startIso: appt.startIso || new Date().toISOString(),
            status: appt.status || 'Pending',
            fee: appt.fee || fee,
            paymentStatus: appt.paymentStatus || 'Pending',
            notes: appt.notes || (appt.patient && appt.patient.notes) || '',
            createdAt: new Date().toISOString(),
            history: [
                {
                    time: new Date().toISOString(),
                    action: 'Appointment Created',
                    user: actor ? actor.name : 'Patient'
                }
            ]
        };

        var patientMatch = (this.data.patients || []).find(function (p) {
            return p.id === record.patientId || (p.phone && record.patientPhone && p.phone.replace(/\D/g, '') === record.patientPhone.replace(/\D/g, ''));
        });

        if (patientMatch) {
            record.patientId = patientMatch.id;
            patientMatch.upcomingAppointment = record.date + ' ' + record.time;
        } else if (record.patientName && record.patientPhone) {
            var newPat = {
                id: 'pat-' + Date.now().toString(36).toUpperCase(),
                name: record.patientName,
                phone: record.patientPhone,
                email: record.patientEmail,
                age: record.patientAge,
                gender: 'Unspecified',
                bloodGroup: 'N/A',
                address: '',
                medicalHistory: record.notes || 'First appointment booked.',
                lastVisit: null,
                upcomingAppointment: record.date + ' ' + record.time,
                status: 'Active',
                totalVisits: 0,
                totalSpent: 0,
                createdAt: new Date().toISOString()
            };
            this.data.patients.unshift(newPat);
            record.patientId = newPat.id;
        }

        this.data.appointments.unshift(record);
        this.save();
        this.logAudit(actor ? actor.name : record.patientName, actor ? actor.role : 'PATIENT', 'CREATE', 'Appointment', 'Created appointment ' + ref);
        return record;
    };

    LumoraDB.prototype.updateAppointmentStatus = function (ref, newStatus, actor, extraNotes) {
        var appt = this.getAppointmentByRef(ref);
        if (!appt) return null;

        var oldStatus = appt.status;
        appt.status = newStatus;
        appt.history = appt.history || [];
        appt.history.unshift({
            time: new Date().toISOString(),
            action: 'Status changed from ' + oldStatus + ' to ' + newStatus + (extraNotes ? ' (' + extraNotes + ')' : ''),
            user: actor ? actor.name : 'Admin'
        });

        if (newStatus === 'Attended') {
            appt.paymentStatus = 'Paid';
            var pat = this.getPatientById(appt.patientId);
            if (pat) {
                pat.lastVisit = appt.date;
                pat.totalVisits = (pat.totalVisits || 0) + 1;
                pat.totalSpent = (pat.totalSpent || 0) + (appt.fee || 0);
            }
        }

        this.save();
        this.logAudit(actor ? actor.name : 'Admin', actor ? actor.role : 'ADMIN', 'STATUS_CHANGE', 'Appointment', 'Ref ' + ref + ' -> ' + newStatus);
        return appt;
    };

    LumoraDB.prototype.rescheduleAppointment = function (ref, newDate, newTime, newStartIso, actor, reason) {
        var appt = this.getAppointmentByRef(ref);
        if (!appt) return null;

        var prevInfo = appt.date + ' ' + appt.time;
        appt.date = newDate;
        appt.time = newTime;
        if (newStartIso) appt.startIso = newStartIso;
        appt.status = 'Rescheduled';
        appt.history = appt.history || [];
        appt.history.unshift({
            time: new Date().toISOString(),
            action: 'Rescheduled from ' + prevInfo + ' to ' + newDate + ' ' + newTime + (reason ? ' (' + reason + ')' : ''),
            user: actor ? actor.name : 'Admin'
        });

        var pat = this.getPatientById(appt.patientId);
        if (pat) {
            pat.upcomingAppointment = newDate + ' ' + newTime;
        }

        this.save();
        this.logAudit(actor ? actor.name : 'Admin', actor ? actor.role : 'ADMIN', 'RESCHEDULE', 'Appointment', 'Ref ' + ref + ' moved to ' + newDate + ' ' + newTime);
        return appt;
    };

    LumoraDB.prototype.deleteAppointment = function (ref, actor) {
        var idx = -1;
        for (var i = 0; i < (this.data.appointments || []).length; i++) {
            if (this.data.appointments[i].reference === ref) {
                idx = i;
                break;
            }
        }
        if (idx === -1) return false;
        var removed = this.data.appointments.splice(idx, 1)[0];
        this.save();
        this.logAudit(actor ? actor.name : 'Admin', actor ? actor.role : 'ADMIN', 'DELETE', 'Appointment', 'Deleted appointment ' + ref + ' (' + removed.patientName + ')');
        return true;
    };

    LumoraDB.prototype.getStaff = function () {
        return JSON.parse(JSON.stringify(this.data.staff || []));
    };

    LumoraDB.prototype.saveStaff = function (staffMember, password, actor) {
        if (!staffMember.id) {
            staffMember.id = 'usr-staff-' + Date.now().toString(36);
            staffMember.createdAt = new Date().toISOString();
            staffMember.active = staffMember.active !== false;
            staffMember.permissions = staffMember.permissions || ['dashboard', 'appointments', 'calendar', 'patients'];
            this.data.staff.push(staffMember);
            this.logAudit(actor ? actor.name : 'Admin', actor ? actor.role : 'ADMIN', 'CREATE', 'Staff', 'Added staff member ' + staffMember.name);
        } else {
            var idx = this.data.staff.findIndex(function (s) { return s.id === staffMember.id; });
            if (idx !== -1) {
                this.data.staff[idx] = Object.assign({}, this.data.staff[idx], staffMember);
                this.logAudit(actor ? actor.name : 'Admin', actor ? actor.role : 'ADMIN', 'UPDATE', 'Staff', 'Updated staff member ' + staffMember.name);
            } else {
                this.data.staff.push(staffMember);
            }
        }

        if (staffMember.email) {
            var lowerEmail = staffMember.email.toLowerCase();
            this.data.credentials[lowerEmail] = {
                password: password || (this.data.credentials[lowerEmail] ? this.data.credentials[lowerEmail].password : 'staff123'),
                role: staffMember.role || 'STAFF',
                refId: staffMember.id
            };
        }

        this.save();
        return staffMember;
    };

    LumoraDB.prototype.deleteStaff = function (id, actor) {
        var staffMember = (this.data.staff || []).find(function (s) { return s.id === id; });
        this.data.staff = this.data.staff.filter(function (s) { return s.id !== id; });
        if (staffMember && staffMember.email) {
            delete this.data.credentials[staffMember.email.toLowerCase()];
        }
        this.save();
        this.logAudit(actor ? actor.name : 'Admin', actor ? actor.role : 'ADMIN', 'DELETE', 'Staff', 'Removed staff ID ' + id);
    };

    LumoraDB.prototype.getWhatsAppTemplates = function () {
        return JSON.parse(JSON.stringify(this.data.whatsappTemplates || {}));
    };

    LumoraDB.prototype.updateWhatsAppTemplates = function (templates, actor) {
        this.data.whatsappTemplates = Object.assign({}, this.data.whatsappTemplates, templates);
        this.save();
        this.logAudit(actor ? actor.name : 'Admin', actor ? actor.role : 'ADMIN', 'UPDATE', 'WhatsApp', 'Updated WhatsApp templates.');
        return this.data.whatsappTemplates;
    };

    LumoraDB.prototype.formatWhatsAppPhone = function (phone) {
        if (!phone) return '';
        var clean = String(phone).replace(/\D/g, '');
        if (clean.length === 10) {
            clean = '91' + clean;
        } else if (clean.length === 11 && clean.startsWith('0')) {
            clean = '91' + clean.slice(1);
        }
        return clean;
    };

    LumoraDB.prototype.compileWhatsAppMessage = function (templateKey, appt) {
        var tplObj = (this.data.whatsappTemplates || {})[templateKey];
        var msg = (tplObj && tplObj.template) ? tplObj.template : '';
        if (!msg) {
            msg = 'Namaste {{patientName}},\n\nYour appointment at *{{clinicName}}* is confirmed (Token: {{tokenNumber}}).\n👨‍⚕️ Consultant: {{doctorName}}\n🦷 Service: {{serviceTitle}}\n📅 Date: {{date}}\n⏰ Time Slot: {{timeSlot}}\n🏥 Location: {{clinicAddress}}\n📞 Phone: {{clinicPhone}}';
        }

        var doc = this.getDoctorById(appt.doctorId);
        var svc = this.getServiceById(appt.serviceId);
        var clinic = this.getClinic();

        var patName = appt.patientName || 'Patient';
        var refNo = appt.reference || '';
        var docName = doc ? doc.name : (appt.doctorName || 'Specialist Dentist');
        var svcName = svc ? svc.name : (appt.serviceName || 'Dental Consultation');
        var apptDate = appt.date || '';
        var apptTime = appt.time || '';
        var clinicName = clinic.name || 'The Dental Solutions';
        var clinicAddr = clinic.address || '3rd Floor, Grand Helios Building, 303, Off FC Rd, above Axis Bank, opp. Hotel Ambassador, Model Colony, Shivajinagar, Pune 411016';
        var clinicPh = clinic.phone || '+91 97654 07679';
        var emergPh = clinic.phone || '+91 97654 07679';
        var mapsLink = clinic.mapsUrl || 'https://maps.google.com/?cid=4187806642178671438';

        // Support both camelCase and snake_case tags
        msg = msg.replace(/{{patientName}}/g, patName).replace(/{{patient_name}}/g, patName);
        msg = msg.replace(/{{tokenNumber}}/g, refNo).replace(/{{token_number}}/g, refNo).replace(/{{reference_number}}/g, refNo).replace(/{{referenceNumber}}/g, refNo);
        msg = msg.replace(/{{doctorName}}/g, docName).replace(/{{doctor_name}}/g, docName);
        msg = msg.replace(/{{serviceTitle}}/g, svcName).replace(/{{service_name}}/g, svcName).replace(/{{serviceName}}/g, svcName);
        msg = msg.replace(/{{date}}/g, apptDate).replace(/{{appointment_date}}/g, apptDate);
        msg = msg.replace(/{{timeSlot}}/g, apptTime).replace(/{{appointment_time}}/g, apptTime).replace(/{{time}}/g, apptTime);
        msg = msg.replace(/{{clinicName}}/g, clinicName).replace(/{{clinic_name}}/g, clinicName);
        msg = msg.replace(/{{clinicAddress}}/g, clinicAddr).replace(/{{clinic_address}}/g, clinicAddr).replace(/{{location}}/g, clinicAddr);
        msg = msg.replace(/{{clinicPhone}}/g, clinicPh).replace(/{{clinic_phone}}/g, clinicPh);
        msg = msg.replace(/{{emergencyPhone}}/g, emergPh).replace(/{{emergency_phone}}/g, emergPh);
        msg = msg.replace(/{{clinicMaps}}/g, mapsLink).replace(/{{clinic_maps}}/g, mapsLink);

        return msg;
    };

    LumoraDB.prototype.getAnalytics = function (daysRange) {
        daysRange = daysRange || 30;
        var appts = this.data.appointments || [];
        var total = appts.length;
        var pending = appts.filter(function (a) { return a.status === 'Pending'; }).length;
        var confirmed = appts.filter(function (a) { return a.status === 'Confirmed'; }).length;
        var attended = appts.filter(function (a) { return a.status === 'Attended'; }).length;
        var notAttended = appts.filter(function (a) { return a.status === 'Not Attended'; }).length;
        var rejected = appts.filter(function (a) { return a.status === 'Rejected'; }).length;
        var rescheduled = appts.filter(function (a) { return a.status === 'Rescheduled'; }).length;

        var totalRevenue = appts.reduce(function (sum, a) {
            return sum + (a.paymentStatus === 'Paid' ? (a.fee || 0) : 0);
        }, 0);

        var pendingRevenue = appts.reduce(function (sum, a) {
            return sum + (a.paymentStatus === 'Pending' ? (a.fee || 0) : 0);
        }, 0);

        var attendanceRate = total > 0 ? Math.round((attended / total) * 100) : 0;
        var noShowRate = total > 0 ? Math.round((notAttended / total) * 100) : 0;
        var cancellationRate = total > 0 ? Math.round((rejected / total) * 100) : 0;

        var doctorPerf = (this.data.doctors || []).map(function (doc) {
            var docAppts = appts.filter(function (a) { return a.doctorId === doc.id; });
            var docAttended = docAppts.filter(function (a) { return a.status === 'Attended'; }).length;
            var docRev = docAppts.reduce(function (sum, a) { return sum + (a.paymentStatus === 'Paid' ? (a.fee || 0) : 0); }, 0);
            return {
                id: doc.id,
                name: doc.name,
                image: doc.image,
                total: docAppts.length,
                attended: docAttended,
                revenue: docRev
            };
        });

        var servicePerf = (this.data.services || []).map(function (svc) {
            var svcAppts = appts.filter(function (a) { return a.serviceId === svc.id; });
            var svcRev = svcAppts.reduce(function (sum, a) { return sum + (a.paymentStatus === 'Paid' ? (a.fee || 0) : 0); }, 0);
            return {
                id: svc.id,
                name: svc.name,
                total: svcAppts.length,
                revenue: svcRev
            };
        });

        return {
            totalAppointments: total,
            pending: pending,
            confirmed: confirmed,
            attended: attended,
            notAttended: notAttended,
            rejected: rejected,
            rescheduled: rescheduled,
            attendanceRate: attendanceRate,
            noShowRate: noShowRate,
            cancellationRate: cancellationRate,
            totalRevenue: totalRevenue,
            pendingRevenue: pendingRevenue,
            totalPatients: (this.data.patients || []).length,
            totalDoctors: (this.data.doctors || []).length,
            totalServices: (this.data.services || []).length,
            doctorPerformance: doctorPerf,
            servicePerformance: servicePerf
        };
    };

    LumoraDB.prototype.getAuditLogs = function () {
        return JSON.parse(JSON.stringify(this.data.auditLogs || []));
    };

    LumoraDB.prototype.getSettings = function () {
        return JSON.parse(JSON.stringify(this.data.settings || {}));
    };

    LumoraDB.prototype.updateSettings = function (patch, actor) {
        this.data.settings = Object.assign({}, this.data.settings, patch);
        this.save();
        this.logAudit(actor ? actor.name : 'Admin', actor ? actor.role : 'ADMIN', 'UPDATE', 'Settings', 'Updated system settings.');
        return this.data.settings;
    };

    LumoraDB.prototype.exportDataJSON = function () {
        return JSON.stringify(this.data, null, 2);
    };

    LumoraDB.prototype.importDataJSON = function (jsonString, actor) {
        try {
            var parsed = JSON.parse(jsonString);
            if (!parsed.clinic || !parsed.doctors || !parsed.services) {
                return { success: false, message: 'Invalid data format.' };
            }
            this.data = parsed;
            this.save();
            this.logAudit(actor ? actor.name : 'Admin', actor ? actor.role : 'ADMIN', 'IMPORT', 'Database', 'Imported backup dataset.');
            return { success: true };
        } catch (e) {
            return { success: false, message: e.message };
        }
    };

    // Instantiate Singleton
    var instance = new LumoraDB();
    global.LumoraDB = instance;

    /* -------------------------------------------------------------------------
       Compatibility Bridge for existing booking-data.js & booking.js
       ------------------------------------------------------------------------- */
    global.BookingData = {
        get clinic() { return instance.getClinic(); },
        get services() { return instance.getServices(true); },
        get doctors() { return instance.getDoctors(true); },
        api: {
            getClinic: function () { return instance.getClinic(); },
            getDoctors: function () { return Promise.resolve(instance.getDoctors(true)); },
            getDoctor: function (id) { return instance.getDoctorById(id); },
            getService: function (id) { return instance.getServiceById(id); },
            getServicesForDoctor: function (doctorId) {
                var doc = instance.getDoctorById(doctorId);
                if (!doc) return Promise.resolve([]);
                var allSvc = instance.getServices(true);
                return Promise.resolve(allSvc.filter(function (s) {
                    return (doc.services || []).indexOf(s.id) !== -1;
                }));
            },
            getAvailableDates: function (doctorId, year, month) {
                var doc = instance.getDoctorById(doctorId);
                var clinic = instance.getClinic();
                var out = [];
                if (!doc) return Promise.resolve(out);

                var today = new Date(); today.setHours(0, 0, 0, 0);
                var last = new Date(today.getTime());
                last.setDate(last.getDate() + (clinic.bookingWindowDays || 60));

                var d = new Date(year, month, 1);
                while (d.getMonth() === month) {
                    var iso = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
                    var day = d.getDay();
                    var sched = (doc.schedule && doc.schedule[day]) || (clinic.hours && clinic.hours[day]);
                    var isOpen = sched && !sched.closed;
                    var isClosedDate = (clinic.closedDates || []).indexOf(iso) !== -1;
                    if (d >= today && d <= last && isOpen && !isClosedDate) {
                        out.push(iso);
                    }
                    d.setDate(d.getDate() + 1);
                }
                return Promise.resolve(out);
            },
            getAvailability: function (doctorId, serviceId, dateIso) {
                var doc = instance.getDoctorById(doctorId);
                var svc = instance.getServiceById(serviceId);
                var clinic = instance.getClinic();
                if (!doc || !svc) return Promise.resolve([]);

                var parts = dateIso.split('-');
                var date = new Date(+parts[0], +parts[1] - 1, +parts[2]);
                var day = date.getDay();
                var sched = (doc.schedule && doc.schedule[day]) || (clinic.hours && clinic.hours[day]);
                if (!sched || sched.closed || (clinic.closedDates || []).indexOf(dateIso) !== -1) {
                    return Promise.resolve([]);
                }

                function toMins(t) { var p = (t || '00:00').split(':'); return parseInt(p[0], 10) * 60 + parseInt(p[1], 10); }
                var openM = toMins(sched.open || '10:00');
                var closeM = toMins(sched.close || '20:00');
                var now = new Date();
                var earliest = now.getTime() + (clinic.minNoticeMinutes || 90) * 60000;
                var slots = [];

                for (var m = openM; m + (svc.duration || 30) <= closeM; m += (svc.duration || 30)) {
                    if (sched.brk) {
                        var bS = toMins(sched.brk.start), bE = toMins(sched.brk.end);
                        if (m < bE && (m + (svc.duration || 30)) > bS) continue;
                    }
                    var st = new Date(date.getTime());
                    st.setHours(Math.floor(m / 60), m % 60, 0, 0);
                    if (st.getTime() < earliest) continue;
                    var h = st.getHours(), min = st.getMinutes();
                    var suffix = h >= 12 ? 'PM' : 'AM';
                    var h12 = h % 12; if (h12 === 0) h12 = 12;
                    var label = h12 + ':' + String(min).padStart(2, '0') + ' ' + suffix;
                    slots.push({
                        start: st.toISOString(),
                        minutes: m,
                        label: label
                    });
                }
                return Promise.resolve(slots);
            },
            submitBooking: function (booking) {
                var patSession = instance.getPatientSession();
                var record = instance.createAppointment({
                    patientId: patSession ? patSession.refId : null,
                    patientName: booking.patient ? booking.patient.name : '',
                    patientPhone: booking.patient ? ((booking.patient.dialCode || '') + ' ' + (booking.patient.phone || '')).trim() : '',
                    patientAge: booking.patient ? booking.patient.age : 30,
                    notes: booking.patient ? booking.patient.notes : '',
                    doctorId: booking.doctor ? booking.doctor.id : '',
                    serviceId: booking.service ? booking.service.id : '',
                    startIso: booking.startIso,
                    date: booking.startIso ? booking.startIso.slice(0, 10) : '',
                    status: 'Pending'
                }, patSession ? { name: patSession.name, role: 'PATIENT' } : null);

                return Promise.resolve({ reference: record.reference, success: true });
            },
            formatTime: function (date) {
                var h = date.getHours(), m = date.getMinutes();
                var suffix = h >= 12 ? 'PM' : 'AM';
                var h12 = h % 12; if (h12 === 0) h12 = 12;
                return h12 + ':' + String(m).padStart(2, '0') + ' ' + suffix;
            },
            formatDateLong: function (date) {
                var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                return days[date.getDay()] + ', ' + months[date.getMonth()] + ' ' + date.getDate();
            },
            isoDate: function (d) {
                return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
            }
        }
    };

})(typeof window !== 'undefined' ? window : this);
