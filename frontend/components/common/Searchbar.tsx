'use client'

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { words } from './Data';
import { useRouter } from 'next/navigation';


export default function Searchbar() {
    const router = useRouter();
    const [activeSearch, setActiveSearch] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [formData, setFormData] = useState({
        app_name: '',
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (query === '') {
            setActiveSearch([]);
            return;
        }
        setActiveSearch(words.filter(w => w.includes(query)).slice(0, 8));
    };

    const handleSuggestionClick = (suggestion: string) => {
        setSearchQuery(suggestion);
        setActiveSearch([]);
    };

    const handleSearchClick = () => {
        setFormData({ app_name: searchQuery });
        const application = searchQuery.toLowerCase();
        router.push(`/dashboard/search?app_name=${application}`);
    };

    return (
        <div>
            <form className='w-full max-w-2xl mx-auto relative mt-1' onSubmit={(e: FormEvent) => e.preventDefault()}>
                <div className="relative">
                    <input
                        type="search"
                        value={searchQuery}
                        placeholder='Search Application'
                        className='w-full p-4 rounded-full bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                        onChange={handleInputChange}
                    />
                    <button
                        type="button"
                        onClick={handleSearchClick}
                        className='absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-blue-500 rounded-full text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    >
                        <MagnifyingGlassIcon className="h-5 w-5" />
                    </button>
                </div>

                {activeSearch.length > 0 && (
                    <div className="absolute top-full mt-2 p-4 bg-white text-gray-900 w-full rounded-xl shadow-lg left-0 flex flex-col gap-2 z-50">
                        {activeSearch.map((s, index) => (
                            <span
                                key={index}
                                className="px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer"
                                onClick={() => handleSuggestionClick(s)}
                            >
                                {s}
                            </span>
                        ))}
                    </div>
                )}
            </form>
        </div>
        
    );
};