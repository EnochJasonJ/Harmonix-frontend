import React from "react";
import Abi from "../assets/Abi.png";
import ADR from "../assets/ADR.png";
import Akka from "../assets/Akka.png";
import Jas from "../assets/Jas.png";
import Jeff from "../assets/Jeff.png";
import Jovia from "../assets/Jovia.jpeg";
import Leads from "../assets/Leads.png";

function BandMembers() {
    const members = [
        { name: "Subiksha M", role: "Lead Vocalist & President", image: Akka },
        { name: "Adriannaa A", role: "Lead Vocalist & Vice President", image: ADR },
        { name: "Abinayaa A", role: "Lead Vocalist & Secretary", image: Abi },
        { name: "Enoch Jason J", role: "Drummer & Joint Secretary", image: Jas },
        { name: "Jeff Jerome Jabez", role: "Keboardist", image: Jeff },
        { name: "Jovia A J", role: "Lead Vocalist", image: Jovia },
    ];

    return (
        <div className="min-h-screen h-auto bg-gradient-to-b from-violet-800 via-slate-900  to-gray-900 text-white px-6  py-10">
            <h1 className="text-center font-bold text-5xl mb-12">Meet our leaders</h1>
            <div className="w-full mb-20">
                <img
                    src={Leads}
                    alt="Leaders Pic"
                    className="w-[85%] h-[50%] object-contain mx-auto rounded-lg shadow-md"
                />
            </div>
            <hr className="mx-10 text-slate-700 my-10" />
            <h1 className="text-center font-bold text-5xl my-10">Meet Our Band</h1>

            <div className="max-w-6xl mx-auto grid gap-8 mb-10 sm:grid-cols-2 md:grid-cols-3">
                {members.map((member, index) => (
                    <div
                        key={index}
                        className="group bg-gray-800 rounded-xl shadow-lg border border-gray-700 hover:border-pink-500 hover:shadow-pink-500/40 transition-all duration-300 transform hover:-translate-y-2"
                    >
                        <div className="w-full overflow-hidden rounded-t-xl">
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>

                        <div className="p-6 text-center">
                            <h2 className="text-2xl font-semibold">{member.name}</h2>
                            <p className="text-pink-400 text-sm">{member.role}</p>
                        </div>
                    </div>
                ))}
            </div>
            
        </div>
    );
}

export default BandMembers;
