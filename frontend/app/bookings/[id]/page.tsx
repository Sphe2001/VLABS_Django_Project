'use client';
import React, { useState, useEffect } from 'react';
import { useBookMutation } from '@/redux/features/authApiSlice';



interface Props {
	params: {
		id: string;   
	}
}
	
export default function Page({ params }: Props) {
	const [createBooking, { isLoading, isError, isSuccess }] = useBookMutation();
	
	
	useEffect(() => {
		const { id } = params;
	
		const makeBooking = async () => {
		  try {
			await createBooking(id).unwrap();
			console.log('Booking created');
			
		  } catch (error) {
			console.error('Failed to create booking', error);
		  }
		};
	
		makeBooking();
		  
	  }, []);


	return(
        <div className="">
			<header className='bg-white shadow'>
				<div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
                    
					<h1 className='text-3xl font-bold tracking-tight text-gray-900'>
						Booking
					</h1>
					
				</div>
			</header>
			<div className='text-3xl font-bold tracking-tight text-gray-900'>
				{isLoading && <p>Creating booking...</p>}
				{isSuccess && <p>Booking created</p>}
				{isError && <p>Failed to make booking</p>}
			</div>
        </div>
    )
}