import { getCurrentSession, loginUser, registerUser } from '@/actions/auth'
import SignUp from '@/components/auth/SignUp';
import { redirect } from 'next/navigation';
import React from 'react'
import zod from 'zod';

const SignUpSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8),
})

const SignUpPage = async () => {

    const { user } = await getCurrentSession();

    if(user){
        return redirect('/');
    }

    const action = async (prevstate: { message: string } | undefined, formdata: FormData) => {
        "use server"
        const parsed = SignUpSchema.safeParse(Object.fromEntries(formdata));
        if(!parsed.success){
            return {
                message : "Invalid data",
            }
        }

        const { email, password } = parsed.data;
        const { user, error } = await registerUser(email, password);
        if(error){
            return {
                message: error,
            }
        } else if(user){
            await loginUser(email, password);
            return redirect('/');
        }
    }

  return <SignUp action={action}/>;
}

export default SignUpPage