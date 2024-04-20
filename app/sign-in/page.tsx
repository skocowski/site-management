'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { auth } from '@/app/firebase/firebaseConfig'
import * as z from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { readUser } from "../utils/Functions";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";


const defaultValues: Partial<AccountFormValues> = {
    email: "",
    password: ""
}

const FormSchema = z.object({
    email: z
        .string()
        .min(5, {
            message: "Email must be at least 5 characters.",
        })
        .max(30, {
            message: "Email must not be longer than 30 characters.",
        })
    .email(),

    password: z
        .string()
        .min(5, {
            message: "Password must be at least 5 characters.",
        })
        .max(30, {
            message: "Password must not be longer than 30 characters.",
        }),
})

type AccountFormValues = z.infer<typeof FormSchema>

const SignIn = () => {

    const router = useRouter()
    const [toPanel, setToPanel] = useState(false)


    useEffect(() => {
        if (toPanel) {
            router.push('/panel/permits')
        }

    }, [toPanel]) 


  
    return (
        <Card className="max-w-md mx-auto">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">SIGN-IN</CardTitle>
                <CardDescription>
                    Please log in with your e-mail and password
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <AccountForm setToMain={setToPanel}/>
            </CardContent>
            <CardFooter>
         
            </CardFooter>
        </Card>
    );
}

export default SignIn

const AccountForm = ({ setToMain }: { setToMain: Dispatch<SetStateAction<boolean>> }) => {



    const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth)


    const handleSignIn = async (data: AccountFormValues) => {
        try {
            const res = await signInWithEmailAndPassword(data.email, data.password)
    
       
            if (res) {
                const user = res.user;
                if (user) {
                   
                    setToMain(true)
                    console.log(user)

                }
            }
            
        
        } catch (e) {
            console.error(e)
        }
    }
    const form = useForm<AccountFormValues>({
        resolver: zodResolver(FormSchema),
        defaultValues,
    })



    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSignIn)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>E-mail</FormLabel>
                            <FormControl>
                                <Input placeholder="E-mail" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Password" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />



                <Button type="submit">Sign in</Button>
            </form>
        </Form>
    )
} 