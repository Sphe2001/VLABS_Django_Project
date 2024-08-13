'use client';

import { useDeleteAccount } from '@/hooks';
import { Form } from '@/components/forms';

export default function DeleteAccountForm() {
	const { current_password, isLoading, onChange, onSubmit } = useDeleteAccount();

	const config = [
		{
			labelText: 'Password',
			labelId: 'current_password',
			type: 'password',
			onChange,
			value: current_password,
			required: true,
		},
	];

	return (
		<Form
			config={config}
			isLoading={isLoading}
			btnText='Delete'
			onChange={onChange}
			onSubmit={onSubmit}
		/>
	);
}