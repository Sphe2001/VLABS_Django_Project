'use client';

import { useState, ChangeEvent, FormEvent } from "react"
import { useRouter } from "next/navigation";
import { useRegisterMutation } from "@/redux/features/authApiSlice";
import { toast } from "react-toastify";

export default function useRegister() {
    const router = useRouter();
    const [register, {isLoading}] = useRegisterMutation();

    const [formData, setFormData] = useState({
        username: '',
        student_no: '',
        email: '',
        surname: '',
        initials: '',
        qualification: '',
        password: '',
        re_password: '',
    });
    const { username, student_no, email, surname, initials, qualification, password, re_password } = formData;

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value} = event.target;
        
        setFormData({ ...formData, [name]: value})
    };

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        register({ username, student_no, email, surname, initials, qualification, password, re_password })
            .unwrap()
            .then(() => {
                toast.success('Please check your emails to verify account');
                router.push('/labs/login');
            })
            .catch(() => {
                toast.error(
                    'Failed to register account. '+
                    'Please re-check your details'
                    );
            });

    };

    return {
        username,
        student_no, 
        email, 
        surname, 
        initials, 
        qualification, 
        password, 
        re_password,
        isLoading,
        onChange,
        onSubmit,
    };
}