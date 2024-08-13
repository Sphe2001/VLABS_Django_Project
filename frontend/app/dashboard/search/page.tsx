'use client';

import React, { useState, useEffect } from 'react';
import { LabCard } from "@/components/common";
import { Laboratory } from "@/components/common/Laboratory";
import Searchbar from '@/components/common/Searchbar';
import { useSearchParams } from 'next/navigation';


export default function Page() {
    const [laboratories, setLaboratories] = useState<Laboratory[]>([]);
    const searchParams = useSearchParams();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const app_name = searchParams.get('app_name');
        if (!app_name) return;

        const fetchLaboratories = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/search/laboratory/`, {
                    credentials: 'include',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ app_name }),
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch laboratories');
                }

                const data: Laboratory[] = await response.json();
                setLaboratories(data);
                setError(null);
            } catch (error) {
                console.error('Failed to fetch laboratories:', error);
                setError('No laboratory with this application');
            }
        };

        fetchLaboratories();
    }, [searchParams]);



    return(
        <div>
            <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
                <Searchbar />
            </div>
            {error ? (
                <div className="flex justify-center mt-8 text-gray-500">
                    {error}
                </div>
            ) : (
                <div className="grid lg:grid-cols-4 gap-4 px-4 py-6 sm:px-6 lg:px-8">
                    {laboratories.map(lab => (
                        <LabCard key={lab.id} props={lab} />
                    ))}
                </div>
            )}
        </div>

    );
	
};