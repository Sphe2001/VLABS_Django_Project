'use client';

import { booking } from "@/components/common/Booking";
import React, { useState, useEffect } from 'react';
import  BookingsList  from "@/components/common/BookingsList";



export default function Page() {
	const [booking, setBookings] = useState<booking[]>([]);

    useEffect(() => {
			
			const fetchData = async () => {
				try {
					const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/user_bookings`, {
						credentials: 'include' 
					  });
					if (!res.ok) {
						throw new Error('Failed to fetch bookings');
					}
					const data: booking[] = await res.json();
					setBookings(data);
				} catch (error) {
					console.error(error);
				}
			};

			fetchData();
		}, []);

  

	return(
        <div >
			<header className='bg-white shadow'>
				<div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
					<h1 className='text-3xl font-bold tracking-tight text-gray-900'>
						My Bookings
					</h1>
				</div>
                <section className="" >
				
                    {booking.map(book => (
                        <BookingsList key={book.id} props={book} />
                    ))}
					
			    </section>
			</header>
        </div>
    );
	
}
