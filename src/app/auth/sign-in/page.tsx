import { getCurrentSession, loginUser, registerUser } from '@/actions/auth'
import SignIn from '@/components/auth/SignIn';
import { redirect } from 'next/navigation';
import React from 'react'
import zod from 'zod';

const SignInSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8),
})

const SignInpPage = async () => {

    const { user } = await getCurrentSession();

    if(user){
        return redirect('/');
    }

    const action = async (prevstate: any, formdata: FormData) => {
        "use server"
        const parsed = SignInSchema.safeParse(Object.fromEntries(formdata));
        if(!parsed.success){
            return {
                message : "Invalid data",
            }
        }

        const { email, password } = parsed.data;
        const { user, error } = await loginUser(email, password);
        if(error){
            return {
                message: error,
            }
        } else if(user){
            return redirect('/');
        }
    }

  return <SignIn action={action}/>;
}

export default SignInpPage