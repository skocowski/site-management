'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";


import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { auth } from '@/app/firebase/config'
import * as z from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


const defaultValues: Partial<AccountFormValues> = {

}

const FormSchema = z.object({
    email: z
        .string()
        .min(5, {
            message: "Email must be at least 5 characters.",
        })
        .max(30, {
            message: "Email must not be longer than 30 characters.",
        }),
    password: z
        .string()
        .min(5, {
            message: "Password must be at least 5 characters.",
        })
        .max(30, {
            message: "Location must not be longer than 30 characters.",
        }),
})

type AccountFormValues = z.infer<typeof FormSchema>

const SignIn = () => {

    return (
        <Card className="max-w-md mx-auto">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">YEAH</CardTitle>
                <CardDescription>
                    Teraz się zaloguj tymi samymi danymi
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <AccountForm />
            </CardContent>
            <CardFooter>
                To the Moon!
            </CardFooter>
        </Card>
    );
}

export default SignIn

const AccountForm = () => {
    const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth)
    const router = useRouter()
    const [push, setPush] = useState(false)
    useEffect(() => {
        router.push('/')
    }, [push])
    const handleSignIn = async ({ email, password }: { email: string, password: string }) => {
        try {
            const res = await signInWithEmailAndPassword(email, password)
            /*      sessionStorage.setItem('user', 'true') */
            setPush(true)
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