'use client';

import { ComputerCard } from "@/components/common";
import React, { useState, useEffect } from 'react';
import { Computer } from "@/components/common/Computer";
import { useRouter } from 'next/router';


interface Props {
    params: {
        id: string;   
    }
}

export default function Page({ params }: Props) {

    const [computers, setComputers] = useState<Computer[]>([]);

    useEffect(() => {
        const { id } = params;
        const fetchData = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/view_computers/${id}/`);
                if (!res.ok) {
                    throw new Error('Failed to fetch computers');
                }
                const data: Computer[] = await res.json();
                setComputers(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return(
        <div className="">
			<header className='bg-white shadow'>
				<div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
                    
					<h1 className='text-3xl font-bold tracking-tight text-gray-900'>
						Computers
					</h1>
				</div>
			</header>
			<div className="grid lg:grid-cols-5  ">
                {computers.map(computer => (
                    <ComputerCard key={computer.id} props={computer} />
                ))}
			</div>
        </div>
    )
}