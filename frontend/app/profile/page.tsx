'use client';

import { useRetrieveUserQuery } from '@/redux/features/authApiSlice';
import { List, Spinner } from '@/components/common';
import Link from 'next/link';

export default function Page() {
	const { data: user, isLoading, isFetching } = useRetrieveUserQuery();

	const config = [
		{
			label: 'Username',
			value: user?.username,
		},
		{
			label: 'Student Number',
			value: user?.student_no,
		},
		{
			label: 'Last Name',
			value: user?.surname,
		},
		{
			label: 'Initials',
			value: user?.initials,
		},
        {
			label: 'Email',
			value: user?.email,
		},
        {
			label: 'Qualification',
			value: user?.qualification,
		},
        
	];

	if (isLoading || isFetching) {
		return (
			<div className='flex justify-center my-8'>
				<Spinner lg />
			</div>
		);
	}

	return (
		<>
			<header className='bg-white shadow'>
				<div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
					<h1 className='text-3xl font-bold tracking-tight text-gray-900'>
						Profile
					</h1>
				</div>
			</header>
			<main className='mx-auto max-w-7xl py-6 my-8 sm:px-6 lg:px-8'>
				<List config={config} />
				
			</main>
			<div>
				<Link href="/delete/">
					<p className="bg-blue-500 text-center hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
						Delete Account
					</p>
				</Link>
			</div>
		</>
	);
}