'use client';

import { application } from "../../../components/common/Application";
import React, { useState, useEffect } from 'react';
import  AppsList  from "@/components/common/AppsList";


interface Props {
    params: {
        id: string;   
    }
}

export default function Page({ params }: Props) {
	const [applications, setApplication] = useState<application[]>([]);

    useEffect(() => {
			const { id } = params;
			const fetchData = async () => {
				try {
					const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/view_applications/${id}/`);
					if (!res.ok) {
						throw new Error('Failed to fetch applications');
					}
					const data: application[] = await res.json();
					setApplication(data);
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
						Applications
					</h1>
				</div>
                <section className="" >
                    {applications.map(app => (
                        <AppsList key={app.id} props={app} />
                    ))}
			    </section>
			</header>
        </div>
    );
	
}
