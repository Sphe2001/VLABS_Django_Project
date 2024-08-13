'use client'

import { useRegister } from "@/hooks";
import { Form } from  '@/components/forms';

export default function RegisterForm() {
    const {
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
    } = useRegister();

    const config = [
        {
            labelText: 'Username',
            labelId: 'username',
            type: 'text',
            value: username,
            required: true
        },
        {
            labelText: 'Student Number',
            labelId: 'student_no',
            type: 'text',
            value: student_no,
            required: true
        },
        {
            labelText: 'Email Address',
            labelId: 'email',
            type: 'email',
            value: email,
            required: true
        },
        {
            labelText: 'Surname',
            labelId: 'surname',
            type: 'text',
            value: surname,
            required: true
        },
        {
            labelText: 'Initials',
            labelId: 'initials',
            type: 'text',
            value: initials,
            required: true
        },
        {
            labelText: 'Qualification',
            labelId: 'qualification',
            type: 'text',
            value: qualification,
            required: true
        },
        {
            labelText: 'Password',
            labelId: 'password',
            type: 'password',
            value: password,
            required: true
        },
        {
            labelText: 'Confirm Password',
            labelId: 're_password',
            type: 'password',
            value: re_password,
            required: true
        },

    ];

    return (
        <Form 
            config={config}
            isLoading={isLoading}
            btnText='Sign up'
            onChange={onChange}
            onSubmit={onSubmit}
        />
    ) ;
}