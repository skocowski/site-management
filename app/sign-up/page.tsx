'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { auth } from '@/app/firebase/config'
import * as z from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useState } from "react";
import Link from "next/link";




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

const SignUp = () => {

const [showLogIn, setShowLogIn] = useState(false)



  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your email below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <AccountForm setShowLogIn={setShowLogIn} />
      </CardContent>
      <CardFooter>
        {showLogIn && <Link href="/sign-in">Now go to Log In</Link> }
      </CardFooter>
    </Card>
  );
}

  export default SignUp

const AccountForm = ({ setShowLogIn }: { setShowLogIn: (value: boolean) => void }) => {

  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth)



  const handleSignUp = async ({ email, password }: { email: string, password: string }) => {
    try {
      const res = await createUserWithEmailAndPassword(email, password)
      console.log({res})
    /*   sessionStorage.setItem('user', 'true') */
/*   setShowLogIn(true) */

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
        <form onSubmit={form.handleSubmit(handleSignUp)} className="space-y-8">
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
         


          <Button type="submit">Sign up</Button>
        </form>
      </Form>
    )
  } 