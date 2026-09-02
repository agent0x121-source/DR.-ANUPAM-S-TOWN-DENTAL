/* ==========================================================================
   Dr. Patil’s Dental Care — Booking data layer
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
        name: 'Dr. Patil’s Dental Care',
        tagline: 'Modern, gentle dentistry in Pimpri-Chinchwad, Pune.',
        address: 'Office No. 6, B-Wing, First Floor, Above Punjab National Bank, Kamla Cross Road, Opp. PCMC Building, Pimpri Colony, Pune 411018',
        shortAddress: 'Pimpri Colony, Pimpri-Chinchwad, Pune',
        phone: '+91 91460 29424',
        phoneE164: '919146029424',
        email: 'hello@drpatilsdentalcare.com',
        mapsUrl: 'https://maps.google.com/?cid=1481562831782819169',
        /* Clinic opening hours, 24h. 0 = Sunday … 6 = Saturday.
           null means closed that day. */
        hours: {
            0: null,
            1: { open: '10:30', close: '21:00', brk: { start: '14:30', end: '17:00' } },
            2: { open: '10:30', close: '21:00', brk: { start: '14:30', end: '17:00' } },
            3: { open: '10:30', close: '21:00', brk: { start: '14:30', end: '17:00' } },
            4: { open: '10:30', close: '21:00', brk: { start: '14:30', end: '17:00' } },
            5: { open: '10:30', close: '21:00', brk: { start: '14:30', end: '17:00' } },
            6: { open: '10:30', close: '21:00', brk: { start: '14:30', end: '17:00' } }
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
            name: 'General Consultation',
            description: 'A full check-up and discussion of any concerns.',
            duration: 30,
            modes: ['in-person']
        },
        {
            id: 'preventive-dentistry',
            name: 'Preventive Dentistry',
            description: 'Cleaning, scaling, fluoride and routine care.',
            duration: 30,
            modes: ['in-person']
        },
        {
            id: 'cosmetic-dentistry',
            name: 'Cosmetic Dentistry',
            description: 'Whitening, veneers and smile design consultation.',
            duration: 45,
            modes: ['in-person']
        },
        {
            id: 'restorative-treatments',
            name: 'Restorative Treatments',
            description: 'Fillings, crowns, bridges and root canal treatment.',
            duration: 60,
            modes: ['in-person']
        },
        {
            id: 'orthodontics',
            name: 'Orthodontics',
            description: 'Braces and aligner assessment and fitting.',
            duration: 45,
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
            id: 'vishwas-patil',
            name: 'Dr. Vishwas Patil',
            specialization: 'Dentist',
            bio: 'BDS, Maharashtra University of Health Sciences. General and restorative dentistry — toothache, cavities, stained teeth and painful teething.',
            experience: '10 years experience',
            department: 'General Dentistry',
            image: 'assets/img/gen_team-image-5.jpg',
            services: ['general-consultation', 'preventive-dentistry', 'cosmetic-dentistry', 'restorative-treatments', 'follow-up']
        },
        {
            id: 'sidra',
            name: 'Associate Dentist',
            specialization: 'Dental Surgeon',
            bio: 'Gentle preventive and cosmetic care, with a focus on first-time and anxious patients.',
            experience: '6 years experience',
            department: 'Preventive & Cosmetic Dentistry',
            image: 'assets/img/gen_team-image-6.jpg',
            services: ['general-consultation', 'preventive-dentistry', 'cosmetic-dentistry', 'orthodontics', 'follow-up']
        },
        {
            id: 'taniya',
            name: 'Consultant Dentist',
            specialization: 'Dentist',
            bio: 'Routine check-ups, cleanings and fillings, with a calm, unhurried chairside manner.',
            experience: '5 years experience',
            department: 'General Dentistry',
            image: 'assets/img/gen_team-image-1.jpg',
            services: ['general-consultation', 'preventive-dentistry', 'restorative-treatments', 'follow-up']
        },
        {
            id: 'parul',
            name: 'Dental Hygienist',
            specialization: 'Dental Hygienist',
            bio: 'Scaling, polishing and gum care, plus advice on keeping teeth healthy between visits.',
            experience: '4 years experience',
            department: 'Preventive Dentistry',
            image: 'assets/img/gen_team-image-3.jpg',
            services: ['general-consultation', 'preventive-dentistry', 'follow-up']
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
