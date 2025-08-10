import React, { useEffect } from 'react'
import axios from 'axios'
function HomePage() {
    const [data, setData] = React.useState(null);
    const fetchData = async () => {
        const accessToken = localStorage.getItem("access");
        try {
            const response = await axios.get("https://harmonix-backend.onrender.com/members/", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                }
            })
            if(response.status === 200) {
                setData(response.data);
            }
            console.log("Data fetched successfully:", response.data);
        } catch (error) {
            console.error("Error fetching data:", error);

        }
    }
    useEffect(()=>{
        fetchData();
    },[])
    return (
        <div className='w-full h-screen flex flex-col items-center justify-center'>
            {/* <h1 className="text-3xl font-bold mb-5">Home Page</h1> */}
            <div className='flex flex-col items-center justify-center gap-5'>
                {data && Array.isArray(data) && data.map((element, index) => (
                <div key={index} className='bg-gray-100 p-4 px-5 rounded-lg mb-4 w-[400px]'>
                    <div className='flex flex-row items-center justify-between mb-2'>
                        <h1 className='font-bold'>Name:</h1>
                        <h1 className='mr-5'>
                            {element.first_name}
                            {element.last_name ? ` ${element.last_name}` : ''}
                        </h1>
                    </div>
                    <div className='flex flex-row items-center justify-between mb-2'>
                        <h1 className='font-bold'>Department:</h1>
                        <h2 className='mr-5'>{element.department}</h2>
                    </div>
                    <div className='flex flex-row items-center justify-between mb-2'>
                        <h1 className='font-bold'>Club:</h1>
                        <h2 className='mr-5'>{element.club}</h2>
                    </div>
                    <div className='flex flex-row items-center justify-between mb-2'>
                        <h1 className='font-bold'>Event Count:</h1>
                        <h2 className='mr-5'>{element.event_counts}</h2>
                    </div>
                    <div className='flex flex-row items-center justify-between mb-2'>
                        <h1 className='font-bold'>Role:</h1>
                        <h2 className='mr-5'>{element.role}</h2>
                    </div>
                    <div className='flex flex-row items-center justify-between mb-2'>
                        <h1 className='font-bold'>Position:</h1>
                        <h2 className='mr-5'>{element.position}</h2>
                    </div>
                    <div className='flex flex-row items-center justify-between mb-2'>
                        <h1 className='font-bold'>Year:</h1>
                        <h2 className='mr-5'>{element.year}</h2>
                    </div>
                    { /* club , event_counts , role, year, position */}
                </div>
            ))}
            </div>
        </div>
    )
}

export default HomePage