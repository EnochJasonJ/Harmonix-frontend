/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import CalenderHeatMap from "react-calendar-heatmap";
import axios from 'axios';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import "react-calendar-heatmap/dist/styles.css";

function AttendancePage() {
    const [attendanceData, setAttendanceData] = useState([]);
    const [data, setData] = React.useState(null);
    const [memberId, setMemberId] = useState(null);
    const fetchData = async () => {
        const accessToken = localStorage.getItem("access");
        try {
            const response = await axios.get("https://harmonix-backend.onrender.com/members/", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                }
            })
            if (response.status === 200) {
                setData(response.data);
                setMemberId(response.data[0].id); // Assuming you want the first member's attendance
                console.log(response.data[0].id);
            }
        } catch (error) {
            console.error("Error fetching data:", error);

        }
    }
    useEffect(() => {
        fetchData();
    }, []); // Assuming you want the first member's attendance
    useEffect(() => {
        if (memberId) {
            axios.get(`https://harmonix-backend.onrender.com/attendance/heatmap/${memberId}/`)
                .then((res) => {
                    console.log(res.data);
                    if (res.data && res.data.heatmap) {
                        const heatmapData = Object.keys(res.data.heatmap).map(date => ({
                            date: date,
                            count: res.data.heatmap[date] ? 1 : 0
                        }));
                        setAttendanceData(heatmapData);
                    }
                })
                .catch(error => console.error("Error fetching attendance data:", error));
        }
    }, [memberId]);

    return (
        <div>

            <h2 className='text-5xl text-center font-bold my-3 text-[#141414]'>Attendance</h2>
            <div className='w-full px-[100px] h-screen flex flex-col items-center justify-center'>
                <CalenderHeatMap
                    startDate={new Date(new Date().setFullYear(new Date().getFullYear() - 1))}
                    endDate={new Date()}
                    values={attendanceData}
                    classForValue={(value) => {
                        if (!value) return "color-empty";
                        return value.count === 1 ? "color-attended" : "color-absent";
                    }}
                    tooltipDataAttrs={(value) => {
                        if (!value || !value.date) {
                            return {
                                'data-tooltip-id': 'heatmap-tooltip',
                                'data-tooltip-content': 'No data',
                            };
                        }
                        const status = value.count === 1 ? 'Present' : 'Absent';
                        return {
                            'data-tooltip-id': 'heatmap-tooltip',
                            'data-tooltip-content': `${value.date}: ${status}`,
                        };
                    }}
                />
                <Tooltip id="heatmap-tooltip" />
            </div>
        </div>
    )
}
export default AttendancePage


// IAENG