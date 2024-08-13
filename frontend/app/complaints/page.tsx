'use client';
import React, { useState, useEffect } from 'react';
import { useComplainMutation } from '@/redux/features/authApiSlice';

export default function Page() {
    const [message, setMessage] = useState('');
    const [complain, { isLoading, isSuccess, isError }] = useComplainMutation();

    const handleSubmit = async () => {
        try {
        await complain(message).unwrap();
        setMessage(''); 
        } catch (error) {
        console.error('Failed to send complaint:', error);
        }
    };

    return(
        <div className="">
			<header className='bg-white shadow'>
				<div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
                    
					<h1 className='text-3xl font-bold tracking-tight text-gray-900'>
						Complaints
					</h1>
					
				</div>
			</header>
			<div className="mx-auto max-w-7xl p-6 sm:px-6 lg:px-8">
                <div className="mb-4">
                    <textarea
                        className="w-full h-40 p-4 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 resize-none"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Write your complaint here"
                    />
                </div>
                <div>
                    <button
                        className={`px-4 py-2 font-semibold text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-300 ${
                            isLoading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        onClick={handleSubmit}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Sending...' : 'Send Complaint'}
                    </button>
                </div>
                {isSuccess && <p className="mt-4 text-green-600">Complaint sent successfully!</p>}
                {isError && <p className="mt-4 text-red-600">Failed to send complaint. Please try again.</p>}
            </div>
			
        </div>
    );
	
}
