'use client'

import { Fragment } from 'react'
import { usePathname } from 'next/navigation';
import { Disclosure,
		DisclosureButton,
		DisclosurePanel,
		Menu,
		MenuButton,
		MenuItem,
		MenuItems,
		Transition, } from '@headlessui/react';
import { Bars3Icon,BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { useRetrieveUserQuery } from '@/redux/features/authApiSlice';
import { useLogoutMutation } from '@/redux/features/authApiSlice';
import { logout as setLogout } from '@/redux/features/authSlice';
import { NavLink } from '@/components/common';


export default function Navbar() {
	const { data: user} = useRetrieveUserQuery();
    const pathname = usePathname();
	const dispatch = useAppDispatch();

	const [logout] = useLogoutMutation();

	const { isAuthenticated } = useAppSelector(state => state.auth);


	const handleLogout = () => {
		logout(undefined)
			.unwrap()
			.then(() => {
				dispatch(setLogout());
			});
	};

	

	const isSelected = (path: string) => (pathname === path ? true : false);

	const authLinks = (isMobile: boolean) => (
		<>
			<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 ">
				<div className="relative flex h-16 items-center justify-between">
				
						<NavLink
							isSelected={isSelected('/dashboard')}
							isMobile={isMobile}
							href='/dashboard'
						>
							Dashboard
						</NavLink>
						<NavLink
							isSelected={isSelected('/user/bookings')}
							isMobile={isMobile}
							href='/user/bookings'
						>
							My Bookings
						</NavLink>
						{/* <NavLink
							isSelected={isSelected('/complaints')}
							isMobile={isMobile}
							href='/complaints'
						>
							Complaints
						</NavLink>
						<NavLink
							isSelected={isSelected('/profile')}
							isMobile={isMobile}
							href='/profile'
						>
							Profile
						</NavLink>
						<NavLink isMobile={isMobile} onClick={handleLogout}>
							Logout
						</NavLink> */}
						<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
							<a href='/notifications'>
								<button
								type="button"
								className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
								>
								<span className="absolute -inset-1.5" />
								<span className="sr-only">View notifications</span>
								<BellIcon className="h-6 w-6" aria-hidden="true" 
								
								/>
								</button>
							</a>
							

							<Menu as="div" className="relative ml-3">
							<div>
							<MenuButton className="relative flex rounded-full bg-gray-800 text-white text-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
								<span className="absolute -inset-1.5" />
								<span className="sr-only">Open user menu</span>
								<span className="text-black text-lg bg-gray-300 rounded-full inline-flex items-center justify-center shadow-md p-2 transition-transform hover:scale-110">
									{user && `${user.username}  `}
								</span>
							</MenuButton>
							</div>
							<Transition
								enter="transition ease-out duration-100"
								enterFrom="transform opacity-0 scale-95"
								enterTo="transform opacity-100 scale-100"
								leave="transition ease-in duration-75"
								leaveFrom="transform opacity-100 scale-100"
								leaveTo="transform opacity-0 scale-95"
							>
								<MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
								<MenuItem>
									{({ focus }) => (
									<a
									href='/profile'
									className={focus ? 'bg-gray-100 block px-4 py-2 text-sm text-gray-700' : 'block px-4 py-2 text-sm text-gray-700'}
									>
										Your Profile
									</a>
									)}
								</MenuItem>
								<MenuItem>
									{({ focus }) => (
									<a
										href='/complaints'
										className={focus ? 'bg-gray-100 block px-4 py-2 text-sm text-gray-700' : 'block px-4 py-2 text-sm text-gray-700'}
									>
										Write a complaint
									</a>
									)}
								</MenuItem>
								<MenuItem>
									{({ focus }) => (
									<a
										href="#"
										className={focus ? 'bg-gray-100 block px-4 py-2 text-sm text-gray-700' : 'block px-4 py-2 text-sm text-gray-700'}
										onClick={handleLogout}
									>
										Sign out
									</a>
									)}
								</MenuItem>
								</MenuItems>
							</Transition>
							</Menu>
							
					</div>
				</div>
			</div>
			
		</>
	);

	const guestLinks = (isMobile: boolean) => (
		<>
			<NavLink
				isSelected={isSelected('/labs/login')}
				isMobile={isMobile}
				href='/labs/login'
			>
				Login
			</NavLink>
			<NavLink
				isSelected={isSelected('/labs/register')}
				isMobile={isMobile}
				href='/labs/register'
			>
				Register
			</NavLink>
		</>
	);

    return (
        <Disclosure as='nav' className='bg-gray-800'>
			{({ open }) => (
				<>
					<div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
						<div className='relative flex h-16 items-center justify-between'>
							<div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
								<Disclosure.Button className='inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
									<span className='sr-only'>
										Open main menu
									</span>
									{open ? (
										<XMarkIcon
											className='block h-6 w-6'
											aria-hidden='true'
										/>
									) : (
										<Bars3Icon
											className='block h-6 w-6'
											aria-hidden='true'
										/>
									)}
								</Disclosure.Button>
							</div>
							<div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
								<div className='flex flex-shrink-0 items-center'>
									<NavLink href='/' isBanner>
										View Labs
									</NavLink>
								</div>
								<div className='hidden sm:ml-6 sm:block'>
									<div className='flex space-x-4'>
										{isAuthenticated
											? authLinks(false)
											: guestLinks(false)}
									</div>
								</div>
							</div>
						</div>
					</div>

					<Disclosure.Panel className='sm:hidden'>
						<div className='space-y-1 px-2 pb-3 pt-2'>
							{isAuthenticated
								? authLinks(true)
								: guestLinks(true)}
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
    )
}