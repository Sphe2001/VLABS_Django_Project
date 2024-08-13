import type { Metadata } from 'next';
import { DeleteAccountForm } from '@/components/forms';

export const metadata: Metadata = {
	title: 'View Labs | Delete Account',
	description: 'View Labs password reset page',
};

export default function Page() {
	return (
		<div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
			<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
				<img
				className="mx-auto h-10 w-auto"
				
				src="https://mytutord2l.tut.ac.za/d2l/lp/navbars/6606/theme/viewimage/3373/view?v=20.24.3.19526"
				alt="View Labs"
				/>
				<h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
					Delete Account
				</h2>
			</div>

			<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
				<DeleteAccountForm />
			</div>
		</div>
	);
}