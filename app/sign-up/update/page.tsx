'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { auth, db } from '@/app/firebase/config'
import * as z from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { doc, setDoc } from "firebase/firestore";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { updateProfile } from "firebase/auth";
import { Icons } from "@/components/icons";
import { Label } from "@/components/ui/label";



const defaultValues: Partial<AccountFormValues> = {
    name: "",
    surname: "",
    phone: "",
    company: "",
}

const FormSchema = z.object({

    name: z
        .string()
        .min(2, {
            message: "Name must be at least 2 characters.",
        })
        .max(30, {
            message: "Name must not be longer than 30 characters.",
        }),
    surname: z
        .string()
        .min(2, {
            message: "Email must be at least 2 characters.",
        })
        .max(30, {
            message: "Email must not be longer than 30 characters.",
        }),
    phone: z
        .string()
        .min(5, {
            message: "Phone must be at least 5 characters.",
        })
        .max(30, {
            message: "Phone must not be longer than 30 characters.",
        }),
    company: z.string({
        required_error: "Please select a company.",
    }),
    


})

type AccountFormValues = z.infer<typeof FormSchema>

const UpdateProfile = () => {
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
                <CardTitle className="text-2xl">Update your details</CardTitle>
                <CardDescription>
                    Complete your profile.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <AccountForm setToMain={setToPanel} />
            </CardContent>
            <CardFooter>

            </CardFooter>
        </Card>
    )
}

export default UpdateProfile

const AccountForm = ({ setToMain }: { setToMain: Dispatch<SetStateAction<boolean>> }) => {

 


    const handleUpdateUser = async (data: AccountFormValues) => {
        try {

            if (auth.currentUser) {

                const user = auth.currentUser

                addUser(user.uid, { name: data.name, surname: data.surname, company: data.company, phoneNumber: data.phone });
                await updateProfile(user, { displayName: data.name + " " + data.surname, photoURL: "" })
                setToMain(true)
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
        <Form {...form}>

            <form onSubmit={form.handleSubmit(handleUpdateUser)} className="space-y-4">

                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Name" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="surname"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Surname</FormLabel>
                            <FormControl>
                                <Input placeholder="Surname" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                                <Input placeholder="Phone number" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Company</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select company." />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Gradex">Gradex</SelectItem>
                                    <SelectItem value="Gradx">Gradx</SelectItem>
                                    <SelectItem value="Grad">Grad</SelectItem>
                                </SelectContent>
                            </Select>

                            <FormMessage />
                        </FormItem>
                    )}
                />



                <Button type="submit">Sign up</Button>
            </form>
        </Form>
    )
}



async function addUser(userId: string, userObj: any) {
    const ref = doc(db, "users", userId);
    try {
        await setDoc(ref, userObj, { merge: true });
        console.log('User successfully written!', userId);
    } catch (error) {
        console.error('Error writing user: ', error);
    }

}