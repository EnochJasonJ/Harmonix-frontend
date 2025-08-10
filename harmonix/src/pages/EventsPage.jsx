import React from "react";

function EventsPage() {
    const eventDetails = {
        "Dhrona": "Our college's biggest cultural event featuring music, dance, and performances from across the campus.",
        "Thiran": "Our flagship inter-college event, launched this February, where students from various colleges participate in competitions.",
        "Pongal Celebration": "Celebrating Pongal, the traditional festival of Tamil Nadu, with music, dance, and cultural activities.",
        "Independence Day Celebration": "Marking India's Independence with flag hoisting, patriotic performances, and tributes.",
        "Flashmob": "A surprise entertainment event to uplift students’ spirits and provide a fun stress-buster.",
        "Freshwarites": "A special event for first-year students to showcase talents and join various clubs like Fine Arts.",
        "Christmas Eve": "Celebrating the joy of Christmas with music, decorations, and festive cheer.",
        "Alumni Meet": "A nostalgic reunion for our college alumni to reconnect and share memories.",
        "Vietnamese Celebration": "A special event for students from Vietnam and Indonesia visiting for a 15-day internship program.",
        "Vietnamese Sent-off Event": "A farewell event for our visiting students from Vietnam and Indonesia, filled with memories and performances.",
    };

    const eventDates = {
        "Dhrona": "Feb 23, 2026",
        "Thiran": "Feb 23, 2026",
        "Pongal Celebration": "Jan 10, 2026",
        "Independence Day Celebration": "Aug 15, 2025",
        "Flashmob": "Sep 10, 2025",
        "Freshwarites": "Sep 26, 2025",
        "Christmas Eve": "Dec 25, 2025",
        "Alumni Meet": "Aug 3, 2025",
        "Vietnamese Celebration": "July 23, 2025",
        "Vietnamese Sent-off Event": "Aug 4, 2025",
    };

    const pastEvents = [
        "Vietnamese Celebration",
        "Alumni Meet",
        "Vietnamese Sent-off Event",
    ];

    const upcomingEvents = [
        "Dhrona",
        "Thiran",
        "Pongal Celebration",
        "Independence Day Celebration",
        "Flashmob",
        "Freshwarites",
        "Christmas Eve",
    ];

    const EventSection = ({ title, events }) => (
        <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8">{title}</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {events.map((event, index) => (
                    <div
                        key={index}
                        className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700 hover:border-pink-500 hover:shadow-pink-500/40 transform hover:-translate-y-2 transition-all duration-300"
                    >
                        <div className="text-pink-400 text-sm mb-2">
                            {eventDates[event]}
                        </div>
                        <h3 className="text-2xl font-semibold">{event}</h3>
                        <p className="text-gray-400 text-sm mt-2">
                            {eventDetails[event]}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-gray-900 text-white px-6 py-12">
            <div className="max-w-6xl mx-auto text-center">
                <EventSection title="Upcoming Events" events={upcomingEvents} />
                <EventSection title="Past Events" events={pastEvents} />
            </div>
        </div>
    );
}

export default EventsPage;