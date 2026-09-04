/* ==========================================================================
   Dr. Anupam's Town Dental — Booking data layer
   --------------------------------------------------------------------------
   All clinic, doctor, service and availability data lives here, fully
   separated from the UI. To add a doctor, a service, a new duration or a
   second clinic location, edit ONLY this file — no UI changes required.

   To connect a real backend later, replace the bodies of
   BookingAPI.getAvailability() and BookingAPI.submitBooking() with fetch()
   calls. Their signatures and return shapes are the contract the UI relies
   on; keep those and nothing else has to change.
   ========================================================================== */
(function (global) {
    'use strict';

    /* ---------------------------------------------------------------- clinic */
    var CLINIC = {
        name: "Dr. Anupam's Town Dental",
        tagline: 'An exclusive dental implant, braces & root canal treatment clinic in Bareilly.',
        address: '127/89, Macnair Road, near Sood Dharam Kanta, opp. Major Nursing Home, Prem Nagar, Bareilly, Uttar Pradesh 243005',
        shortAddress: 'Prem Nagar, Bareilly',
        phone: '+91 81266 43459',
        phoneE164: '918126643459',
        email: 'dranupamstowndental111@gmail.com',
        mapsUrl: 'https://maps.google.com/?cid=3426945284530272874',
        /* Clinic opening hours, 24h. 0 = Sunday … 6 = Saturday.
           null means closed that day. */
        hours: {
            0: { open: '10:00', close: '18:00', brk: null },
            1: { open: '10:00', close: '20:00', brk: null },
            2: { open: '10:00', close: '20:00', brk: null },
            3: { open: '10:00', close: '20:00', brk: null },
            4: null,
            5: { open: '10:00', close: '20:00', brk: null },
            6: { open: '10:00', close: '20:00', brk: null }
        },
        /* How far ahead patients may book, and the minimum notice required. */
        bookingWindowDays: 60,
        minNoticeMinutes: 90,
        /* Dates the clinic is closed (YYYY-MM-DD). */
        closedDates: []
    };

    /* -------------------------------------------------------------- services */
    /* `duration` drives slot length. `modes` drives the consultation type
       shown on the doctor panel. Add or remove entries freely. */
    var SERVICES = [
        {
            id: 'general-consultation',
            name: 'General Consultation & Diagnosis',
            description: 'An unhurried examination, diagnosis and treatment plan.',
            duration: 30,
            modes: ['in-person']
        },
        {
            id: 'dental-implants',
            name: 'Dental Implants',
            description: 'Titanium implants to replace missing teeth with fixed teeth.',
            duration: 60,
            modes: ['in-person']
        },
        {
            id: 'root-canal',
            name: 'Root Canal Treatment',
            description: 'Rotary root canal treatment, precise and almost painless.',
            duration: 60,
            modes: ['in-person']
        },
        {
            id: 'orthodontics',
            name: 'Orthodontics — Braces & Aligners',
            description: 'Metal braces, ceramic braces and clear aligner assessment and fitting.',
            duration: 45,
            modes: ['in-person']
        },
        {
            id: 'cosmetic-dentistry',
            name: 'Cosmetic Dentistry',
            description: 'Smile design with mock preparation and aesthetic try-in.',
            duration: 45,
            modes: ['in-person']
        },
        {
            id: 'prosthodontics',
            name: 'Crowns, Bridges & Dentures',
            description: 'Fixed prosthodontics, complete dentures and cast partial dentures.',
            duration: 60,
            modes: ['in-person']
        },
        {
            id: 'preventive-dentistry',
            name: 'Periodontia & Preventive Care',
            description: 'Cleaning, polishing, gum care and child dentistry.',
            duration: 30,
            modes: ['in-person']
        },
        {
            id: 'follow-up',
            name: 'Follow-up Consultation',
            description: 'A short review after an earlier visit or procedure.',
            duration: 15,
            modes: ['in-person', 'online']
        }
    ];

    /* --------------------------------------------------------------- doctors */
    /* `services` lists the service ids each doctor offers.
       `schedule` overrides clinic hours per weekday; omit it to use CLINIC.hours. */
    var DOCTORS = [
        {
            id: 'anupam-purwar',
            name: 'Dr. Anupam Purwar',
            specialization: 'Prosthodontist & Oral Implantologist',
            bio: 'MDS (Prosthodontics, Crown & Bridge and Maxillofacial Prosthetics), BDS. Founder of the clinic, with dental implants as his main area of contribution.',
            experience: 'Practising since 2005',
            department: 'Implantology, Prosthodontics & Maxillofacial Prosthetics',
            image: 'assets/img/gen_team-image-5.jpg',
            services: ['general-consultation', 'dental-implants', 'prosthodontics', 'cosmetic-dentistry', 'follow-up']
        },
        {
            id: 'shally-khanna',
            name: 'Dr. Shally Khanna',
            specialization: 'Oral Pathologist & Endodontist',
            bio: 'MDS (Oral & Maxillofacial Pathology), BDS, with certificate courses in Advanced Endodontics and Laser Dentistry. Her clinical focus is advanced endodontics.',
            experience: 'Practising since 2008',
            department: 'Endodontics & Oral Pathology',
            image: 'assets/img/gen_team-image-6.jpg',
            services: ['general-consultation', 'root-canal', 'preventive-dentistry', 'follow-up']
        },
        {
            id: 'consultant-orthodontist',
            name: 'Consultant Orthodontist',
            specialization: 'Orthodontics — Braces & Aligners',
            bio: 'Correction of irregular and mal-positioned teeth with metal braces, ceramic braces and clear aligners.',
            experience: 'Visiting specialist',
            department: 'Orthodontics',
            image: 'assets/img/gen_team-image-1.jpg',
            services: ['general-consultation', 'orthodontics', 'follow-up']
        },
        {
            id: 'consultant-oral-surgeon',
            name: 'Consultant Oral Surgeon',
            specialization: 'Oral & Maxillofacial Surgery',
            bio: 'Extractions, repair of fractured jaws and surgical excision of oral cysts and tumours.',
            experience: 'Visiting specialist',
            department: 'Oral Surgery',
            image: 'assets/img/gen_team-image-3.jpg',
            services: ['general-consultation', 'follow-up']
        }
    ];

    /* ------------------------------------------------------------- utilities */
    function toMinutes(hhmm) {
        var p = hhmm.split(':');
        return parseInt(p[0], 10) * 60 + parseInt(p[1], 10);
    }

    function isoDate(d) {
        return d.getFullYear() + '-' +
            String(d.getMonth() + 1).padStart(2, '0') + '-' +
            String(d.getDate()).padStart(2, '0');
    }

    function windowFor(doctor, date) {
        var day = date.getDay();
        var table = (doctor && doctor.schedule) ? doctor.schedule : CLINIC.hours;
        var w = table[day];
        if (w === null || w === undefined) return null;
        // A doctor can never be open while the clinic is shut.
        var clinicWindow = CLINIC.hours[day];
        if (!clinicWindow) return null;
        return {
            open: Math.max(toMinutes(w.open), toMinutes(clinicWindow.open)),
            close: Math.min(toMinutes(w.close), toMinutes(clinicWindow.close)),
            brkStart: (w.brk || clinicWindow.brk) ? toMinutes((w.brk || clinicWindow.brk).start) : null,
            brkEnd: (w.brk || clinicWindow.brk) ? toMinutes((w.brk || clinicWindow.brk).end) : null
        };
    }

    /* --------------------------------------------------------------- the API */
    /* Every method returns a Promise, so swapping in a real endpoint is a
       drop-in change. */
    var BookingAPI = {
        getClinic: function () { return CLINIC; },

        getDoctors: function () {
            return Promise.resolve(DOCTORS.slice());
        },

        getDoctor: function (id) {
            return DOCTORS.filter(function (d) { return d.id === id; })[0] || null;
        },

        getService: function (id) {
            return SERVICES.filter(function (s) { return s.id === id; })[0] || null;
        },

        /* Services a given doctor offers, in the order defined above. */
        getServicesForDoctor: function (doctorId) {
            var doctor = BookingAPI.getDoctor(doctorId);
            if (!doctor) return Promise.resolve([]);
            return Promise.resolve(SERVICES.filter(function (s) {
                return doctor.services.indexOf(s.id) !== -1;
            }));
        },

        /* Which days in a given month can be booked at all.
           Returns a Promise of a Set-like object of 'YYYY-MM-DD' strings. */
        getAvailableDates: function (doctorId, year, month) {
            var doctor = BookingAPI.getDoctor(doctorId);
            var out = [];
            if (!doctor) return Promise.resolve(out);

            var today = new Date(); today.setHours(0, 0, 0, 0);
            var last = new Date(today.getTime());
            last.setDate(last.getDate() + CLINIC.bookingWindowDays);

            var d = new Date(year, month, 1);
            while (d.getMonth() === month) {
                var iso = isoDate(d);
                var withinWindow = d >= today && d <= last;
                var open = windowFor(doctor, d) !== null;
                var closed = CLINIC.closedDates.indexOf(iso) !== -1;
                if (withinWindow && open && !closed) out.push(iso);
                d.setDate(d.getDate() + 1);
            }
            return Promise.resolve(out);
        },

        /* Bookable start times for one doctor, one service, one day.
           Slot length follows the selected service's duration. */
        getAvailability: function (doctorId, serviceId, dateIso) {
            var doctor = BookingAPI.getDoctor(doctorId);
            var service = BookingAPI.getService(serviceId);
            if (!doctor || !service) return Promise.resolve([]);

            var parts = dateIso.split('-');
            var date = new Date(+parts[0], +parts[1] - 1, +parts[2]);
            var w = windowFor(doctor, date);
            if (!w || CLINIC.closedDates.indexOf(dateIso) !== -1) return Promise.resolve([]);

            var now = new Date();
            var earliest = now.getTime() + CLINIC.minNoticeMinutes * 60000;
            var slots = [];

            for (var m = w.open; m + service.duration <= w.close; m += service.duration) {
                if (w.brkStart !== null && m < w.brkEnd && (m + service.duration) > w.brkStart) continue;
                var start = new Date(date.getTime());
                start.setHours(Math.floor(m / 60), m % 60, 0, 0);
                if (start.getTime() < earliest) continue;
                slots.push({
                    start: start.toISOString(),
                    minutes: m,
                    label: BookingAPI.formatTime(start)
                });
            }
            return Promise.resolve(slots);
        },

        /* Records the completed booking and returns its reference.
           There is no clinic backend yet, so the booking is stored locally and
           resolved as successful. Replace this body with a fetch() POST when an
           endpoint exists — resolve with { reference: <string>, success: true }
           and nothing in the UI needs to change. */
        submitBooking: function (booking) {
            var reference = 'DC-' + Date.now().toString(36).toUpperCase().slice(-6);

            var record = {
                reference: reference,
                createdAt: new Date().toISOString(),
                doctorId: booking.doctor.id,
                serviceId: booking.service.id,
                start: booking.startIso,
                timezone: booking.timezone,
                patient: {
                    name: booking.patient.name,
                    dialCode: booking.patient.dialCode,
                    phone: booking.patient.phone,
                    age: booking.patient.age,
                    notes: booking.patient.notes
                }
            };

            try {
                var log = JSON.parse(global.localStorage.getItem('dc_bookings') || '[]');
                log.push(record);
                global.localStorage.setItem('dc_bookings', JSON.stringify(log.slice(-20)));
            } catch (err) { /* storage unavailable — not fatal to the booking */ }

            return Promise.resolve({ reference: reference, success: true });
        },

        /* ------------------------------------------------------- formatting */
        formatTime: function (date) {
            var h = date.getHours(), m = date.getMinutes();
            var suffix = h >= 12 ? 'PM' : 'AM';
            var h12 = h % 12; if (h12 === 0) h12 = 12;
            return h12 + ':' + String(m).padStart(2, '0') + ' ' + suffix;
        },

        formatDateLong: function (date) {
            var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            var months = ['January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'];
            return days[date.getDay()] + ', ' + months[date.getMonth()] + ' ' + date.getDate();
        },

        isoDate: isoDate
    };

    global.BookingData = {
        clinic: CLINIC,
        services: SERVICES,
        doctors: DOCTORS,
        api: BookingAPI
    };
})(window);
