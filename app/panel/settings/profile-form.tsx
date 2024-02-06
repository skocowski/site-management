"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { toast } from "@/components/ui/use-toast"
import { auth, db } from "@/app/firebase/config"
import useUserData from "@/hooks/useUserData"
import { User, updateProfile } from "firebase/auth"
import { doc, updateDoc } from "firebase/firestore"






export function ProfileForm() {




  return (
    <div className="space-y-10">
      <ChangePhone />

      <ChangePassword />
    </div>

  )
}

const ChangePhone = () => {
  const { data: userData } = useUserData()

  const phoneFormSchema = z.object({
    phone: z
      .string()
      .min(5, {
        message: "Phone must be at least 5 characters.",
      })
      .max(30, {
        message: "Phone must not be longer than 30 characters.",
      }),

  })

  type PhoneFormValues = z.infer<typeof phoneFormSchema>

  const defaultValues: Partial<PhoneFormValues> = {
    phone: "",

  }

  const form = useForm<PhoneFormValues>({
    resolver: zodResolver(phoneFormSchema),
    defaultValues,
    mode: "onChange",
  })



  const onSubmit = async (data: PhoneFormValues) => {

    try {
      const user = auth.currentUser

      if (user && user.uid) {
        const userId = user.uid

        const ref = doc(db, "users", userId);

        let newPhoneNumber = data.phone

  

        await updateDoc(ref, {phoneNumber: newPhoneNumber} as any, { merge: true });
        console.log("Document successfully written!");


      }
    } catch (err) {
      console.error(err)
    }

  }



  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current phone number: {userData?.phoneNumber}</FormLabel>
              <FormControl>
                <Input placeholder="Your new phone number" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Change your phone number</Button>
      </form>
    </Form>
  )
}

const ChangePassword = () => {

  const passwordFormSchema = z.object({
    oldPassword: z
      .string()
      .min(5, {
        message: "Password must be at least 5 characters.",
      })
      .max(30, {
        message: "Password must not be longer than 30 characters.",
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

  })

  type PasswordFormValues = z.infer<typeof passwordFormSchema>

  const defaultValues: Partial<PasswordFormValues> = {
    oldPassword: "",
    password: "",
    repeatPassword: "",

  }

  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues,
    mode: "onChange",
  })



  const onSubmit = async (data: PasswordFormValues) => {
    try {
      if (auth.currentUser) {
        const user = auth.currentUser

      }
    } catch (err) {
      console.error(err)
    }

  }



  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="oldPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Old password</FormLabel>
              <FormControl>
                <Input placeholder="password" {...field} />
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
              <FormLabel>New password</FormLabel>
              <FormControl>
                <Input placeholder="password" {...field} />
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
              <FormLabel>Repeat new password</FormLabel>
              <FormControl>
                <Input placeholder="password" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Change your password</Button>
      </form>
    </Form>
  )
}