'use client';
import React, { useState, useEffect } from 'react';
import { booking } from "./Booking";
import { useDeleteBookingMutation } from "@/redux/features/authApiSlice";
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

interface ListProps{
    props: booking
}

const List: React.FC<ListProps> = ({ props }) => {
	const router = useRouter();
	const [deleteBooking, { isLoading, isError, isSuccess }] = useDeleteBookingMutation();
	const booking_id = props.id;

	const handleSubmit = async () => {
        try {
			await deleteBooking(booking_id).unwrap()
			.then(() => {
				toast.success('Booking deleted');
				router.push('/dashboard');
			})
			.catch(() => {
				toast.error('Failed to delete booking');
			});
    	}catch (error) {
			console.error('Failed to delete booking:', error);
			}
	};
	return (
		<ul role='list' className='divide-y divide-gray-100'>
			
				<li key={props.id} className='flex justify-between gap-x-6 py-5'>
				<div className="flex justify-between gap-x-6">
					<div className="flex items-center"> 
						<p className='text-base font-medium leading-6 text-gray-900'>
							<b>Lab:</b> {props.building_name}-{props.lab_name} | <b>Computer:</b> {props.computer_name} | <b>Time:</b> {props.time}
						</p>
					</div>
					<button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
						onClick={handleSubmit}   
					>
						Delete
					</button>
				</div>
				
				</li>
			
		</ul>
	);
}

export default List;