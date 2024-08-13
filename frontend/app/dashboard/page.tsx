'use client';

import React, { useState, useEffect } from 'react';
import { LabCard } from "@/components/common";
import { Laboratory } from "@/components/common/Laboratory";
import Searchbar from '@/components/common/Searchbar';


export default function Page() {
	const [laboratories, setLaboratories] = useState<Laboratory[]>([]);
	

    useEffect(() => {
			const fetchData = async () => {
				try {
					const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/laboratories`);
					if (!res.ok) {
						throw new Error('Failed to fetch laboratories');
					}
					const data: Laboratory[] = await res.json();
					setLaboratories(data);
				} catch (error) {
					console.error(error);
				}
			};

			fetchData();
		}, []);

			

	return(
		<div>
            <header className='bg-white shadow'>
                <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
                    <h1 className='text-3xl font-bold tracking-tight text-gray-900'>
                        Laboratories
                    </h1>
                </div>
            </header>
            <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
                <Searchbar />
            </div>
            <div className="grid lg:grid-cols-4 gap-4 px-4 py-6 sm:px-6 lg:px-8">
                {laboratories.map(lab => (
                    <LabCard key={lab.id} props={lab} />
                ))}
            </div>
        </div>
	);
	
}

