'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { auth } from '@/app/firebase/firebaseConfig'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useRouter } from "next/navigation";

import * as z from "zod"
import { useEffect, useState } from "react";

const defaultValues: Partial<AccountFormValues> = {
  email: "",
  password: "",
  repeatPassword: ""
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
      message: "Password must not be longer than 30 characters.",
    }),
  repeatPassword: z
    .string()
    .min(5, {
      message: "Password must be at least 5 characters.",
    })
    .max(30, {
      message: "Password must not be longer than 30 characters.",
    })
}).refine((data) => data.password === data.repeatPassword, {
  message: "Passwords don't match",
  path: ["repeatPassword"],
});

type AccountFormValues = z.infer<typeof FormSchema>



const SignUp = () => {
  const router = useRouter()
  const [toUpdate, setToUpdate] = useState(false)

  useEffect(() => {
    if (toUpdate) {
      router.push('/sign-up/update')
    }

  }, [toUpdate])


  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth)


  const handleSignUp = async (data: AccountFormValues) => {
    try {
      const res = await createUserWithEmailAndPassword(data.email, data.password)


      if (res) {
        const user = res.user
        if (user) {
          setToUpdate(true)

        }
    
      }
    } catch (err) {
      console.error(err)
    }
  }


  const form = useForm<AccountFormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  })

  return (
<div className="flex justify-center">
    <Card className="max-w-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your email below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>

        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSignUp)} className="space-y-4">
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
            <FormField
              control={form.control}
              name="repeatPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Repeat password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Repeat password" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">Sign up</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        Terms & conditions?
      </CardFooter>
      </Card>
    </div>
  );
}

export default SignUp
  





