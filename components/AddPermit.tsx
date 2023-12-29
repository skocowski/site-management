/* "use client"
import { Separator } from './ui/separator'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon, CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"

import * as z from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Button } from './ui/button'
import { Calendar } from './ui/calendar'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from './ui/command'
import { cn } from '@/lib/utils'
import { toast } from './ui/use-toast'
import { Textarea } from './ui/textarea'



const permitTypes = [
    { label: "Electrical", value: "electrical" },
    { label: "Hot Work", value: "hotWork" },
    { label: "Riser", value: "riser" },

] as const

const accountFormSchema = z.object({
    name: z
        .string()
        .min(2, {
            message: "Name must be at least 2 characters.",
        })
        .max(30, {
            message: "Name must not be longer than 30 characters.",
        }),
    location: z
        .string()
        .min(2, {
            message: "Location must be at least 2 characters.",
        })
        .max(30, {
            message: "Location must not be longer than 30 characters.",
        }),
    date: z.date({
        required_error: "A date is required.",
    }),
    permitType: z.string({
        required_error: "Please select a language.",
    }),
    description: z
        .string()
        .min(5, {
            message: "Description must be at least 5 characters.",
        })
        .max(30, {
            message: "Description must not be longer than 300 characters.",
        }),
})

type AccountFormValues = z.infer<typeof accountFormSchema>

// This can come from your database or API.
const defaultValues: Partial<AccountFormValues> = {
    // name: "Your name",
    // location: "Work location",
    // dob: new Date("2023-01-23"),
}

const AddPermit = () => {
  return (
      <div className="space-y-6">
          <div>
              <h3 className="text-lg font-medium">Add Permit</h3>
              <p className="text-sm text-muted-foreground">
                  Add a new permit.
              </p>
          </div>
          <Separator />
          <AccountForm />
      </div>
  )
}

export default AddPermit

const AccountForm = () => {
    const form = useForm<AccountFormValues>({
        resolver: zodResolver(accountFormSchema),
        defaultValues,
    })

    function onSubmit(data: AccountFormValues) {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                                <Input placeholder="Work location" {...field} />
                            </FormControl>
              
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Provide a brief description of the work"
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Date</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[240px] pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                            date > new Date() || date < new Date("1900-01-01")
                                        }
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="permitType"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Permit type</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            className={cn(
                                                "w-[200px] justify-between",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value
                                                ? permitTypes.find(
                                                    (permit) => permit.value === field.value
                                                )?.label
                                                : "Select permit"}
                                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                        <CommandInput placeholder="Search permit..." />
                                        <CommandEmpty>No permit found.</CommandEmpty>
                                        <CommandGroup>
                                            {permitTypes.map((permit) => (
                                                <CommandItem
                                                    value={permit.label}
                                                    key={permit.value}
                                                    onSelect={() => {
                                                        form.setValue("permitType", permit.value)
                                                    }}
                                                >
                                                    <CheckIcon
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            permit.value === field.value
                                                                ? "opacity-100"
                                                                : "opacity-0"
                                                        )}
                                                    />
                                                    {permit.label}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </Command>
                                </PopoverContent>
                            </Popover>
 
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">Add Permit</Button>
            </form>
        </Form>
    )
} */