"use client"

import Link from "next/link"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { auth } from "@/app/firebase/config"
import { updateProfile } from "firebase/auth"
import InputFile from "@/components/InputFile"





export function ProfileForm() {




  return (
    <div className="space-y-10">
      <ChangePhone />
    
      <ChangePassword />
    </div>

  )
}

const ChangePhone = () => {

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
      if (auth.currentUser) {
        const user = auth.currentUser
        toast({
          title: "You submitted the following values:",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{JSON.stringify(data, null, 2)}</code>
            </pre>
          ),
        })
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
              <FormLabel>Change phone number</FormLabel>
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
        toast({
          title: "You submitted the following values:",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{JSON.stringify(data, null, 2)}</code>
            </pre>
          ),
        })
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