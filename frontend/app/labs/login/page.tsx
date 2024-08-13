import Link from "next/link";
import { LoginForm } from "@/components/forms";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'View Labs | Login',
  description: 'View Labs login page',
}

export default function Page() {
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            //src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            src="https://mytutord2l.tut.ac.za/d2l/lp/navbars/6606/theme/viewimage/3373/view?v=20.24.3.19526"
            alt="View Labs"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <LoginForm />
          
          <p className="mt-10 text-center text-sm text-gray-500">
            Don&apos;t have an account?{' '}
            <Link
             href='/labs/register' 
             className="font-semibold leading-6 text-cyan-900 hover:text-cyan-500">
              Register here
            </Link>
          </p>
          
        </div>
      </div>
    );
}