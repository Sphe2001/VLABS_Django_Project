import { useState, ChangeEvent, FormEvent } from 'react';
import { useDeleteMutation } from '@/redux/features/authApiSlice';
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";

export default function useDeleteAccount() {
    const router = useRouter();
	const [deleteAccount, { isLoading }] = useDeleteMutation();

	const [formData, setFormData] = useState({
        current_password: '',
    });

    const { current_password } = formData;

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value} = event.target;
        
        setFormData({ ...formData, [name]: value})
    };

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

		deleteAccount({current_password})
			.unwrap()
			.then(() => {
				toast.success('Account Deleted');
                router.push('/labs/login');
			})
			.catch(() => {
				toast.error('Failed to delete account, please retype your password and try again');
			});
	};

	return {
		current_password,
		isLoading,
		onChange,
		onSubmit,
	};
}