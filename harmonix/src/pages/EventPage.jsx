import React, { useState, useEffect } from 'react'
import axios from 'axios'

function EventsPage() {
    const [data, setData] = useState(null);
    const fetchData = async () => {
        const accessToken = localStorage.getItem("access");
        try {
            const response = await axios.get("https://harmonix-backend.onrender.com/events/", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                }
            })
            if (response.status === 200) {
                setData(response.data);
            }
            console.log("Data fetched successfully:", response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div>
            <h1 className='text-3xl font-bold text-center'>Events Page</h1>
            {data && Array.isArray(data) && data.length > 0 ? (
                <div className='flex flex-col items-center justify-center gap-5'>
                    {data.map((element, index) => (
                        <div key={index} className='bg-gray-100 hover:bg-[#535353] hover:text-[#adf0d5] hover:scale-105 hover:my-5 transition-all duration-700 ease-in-out p-4 px-5 rounded-lg mb-4 w-[400px]'>
                            <div className='flex flex-row items-center justify-between mb-2'>
                                <h1 className='font-bold'>Event Name:</h1>
                                <h1 className='mr-5'>{element.name}</h1>
                            </div>
                            <div className='flex flex-row items-center justify-between mb-2'>
                                <h1 className='font-bold'>Members Participated:</h1>
                                <h1 className='mr-5'>
                                    {(!element.first_name && !element.last_name)
                                        ? element.username
                                        : `${element.first_name || ''} ${element.last_name || ''}`.trim()}
                                </h1>
                            </div>
                            <div className='flex flex-row items-center justify-between mb-2'>
                                <h1 className='font-bold'>Date:</h1>
                                <h2 className='mr-5'>{new Date(element.date).toLocaleDateString()}</h2>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <h1 className='text-center mt-[300px] font-bold text-5xl text-gray-300'>No Events Yet</h1>
            )}
        </div>
    )
}

export default EventsPage