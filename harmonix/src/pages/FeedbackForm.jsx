import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { supabase } from '../supabaseClient'
import toast, { Toaster } from 'react-hot-toast';

function FeedbackForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        department: '',
        feedback: ''
    })
    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const { error } = await supabase.from('feedback').insert([formData]);
        if (error) {
            console.error("Error submitting feedback:", error);
            toast.error("Failed to submit feedback. Please try again.");
        }
        else {
            toast.success("Feedback submitted successfully!");
            setFormData({
                name: '',
                email: '',
                department: '',
                feedback: ''
            });
            // Optionally, you can redirect or clear the form here
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-4">
            <form
                onSubmit={handleSubmit}
                autoComplete="off"
                className="bg-[#1d1f2c] p-8 rounded-2xl shadow-lg w-full max-w-lg border border-white/20 space-y-6 transition-all duration-300 hover:shadow-xl"
            >
                <h1 className="text-4xl font-bold text-center text-white mb-6">Feedback Form</h1>

                {/* Name */}
                <div className="flex flex-col space-y-2">
                    <label htmlFor="name" className="text-sm font-medium tracking-wide">Name</label>
                    <input
                        value={formData.name}
                        onChange={handleChange} 
                        required
                        type="text"
                        id="name"
                        name="name"
                        placeholder="e.g. John Doe"
                        className="rounded-lg px-5 py-3 outline-none border border-white/20 bg-transparent text-white focus:border-indigo-400 transition-all duration-200"
                    />
                </div>

                {/* Email */}
                <div className="flex flex-col space-y-2">
                    <label htmlFor="email" className="text-sm font-medium tracking-wide">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="example@gmail.com"
                        className="rounded-lg px-5 py-3 outline-none border border-white/20 bg-transparent text-white focus:border-indigo-400 transition-all duration-200"
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                {/* Department */}
                <div className="flex flex-col space-y-2">
                    <label htmlFor="dept" className="text-sm font-medium tracking-wide">Department</label>
                    <select
                        id="dept"
                        name="department"
                        className="rounded-lg px-5 py-3 outline-none border border-white/20 bg-transparent text-white focus:border-indigo-400 transition-all duration-200"
                        value={formData.department} 
                        onChange={handleChange} 
                        required
                    >
                        <option value="NA">-- Select Department --</option>
                        <option value="CSE">CSE</option>
                        <option value="AIDS">AIDS</option>
                        <option value="AIML">AIML</option>
                        <option value="CSBS">CSBS</option>
                        <option value="ECE">ECE</option>
                        <option value="CCE">CCE</option>
                        <option value="EEE">EEE</option>
                        <option value="Mech">Mech</option>
                        <option value="Cybersecurity">Cybersecurity</option>
                    </select>
                </div>

                {/* Feedback */}
                <div className="flex flex-col space-y-2">
                    <label htmlFor="feedback" className="text-sm font-medium tracking-wide">Feedback</label>
                    <Box
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                color: 'white',
                                backgroundColor: 'transparent',
                                borderRadius: '8px',
                                border: '1px solid rgba(255,255,255,0.2)',
                                '& fieldset': { border: 'none' },
                                '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.4)' },
                                '&.Mui-focused fieldset': { borderColor: '#6366f1' },
                            },
                            '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.6)' },
                            '& .MuiInputLabel-root.Mui-focused': { color: '#6366f1' },
                        }}
                    >
                        <TextField
                            placeholder="Your feedback"
                            name="feedback"
                            id="feedback"
                            multiline
                            maxRows={4}
                            variant="outlined"
                            fullWidth
                            value={formData.feedback} 
                            onChange={handleChange} 
                            required
                        />
                    </Box>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold w-full py-3 rounded-lg shadow-md transition-all duration-200 transform hover:scale-[1.02] active:scale-95"
                >
                    Submit
                </button>
            </form>
        </div>
    )
}

export default FeedbackForm