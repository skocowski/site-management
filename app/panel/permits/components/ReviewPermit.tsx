
import { Button } from "@/components/ui/button"


import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { Textarea } from "@/components/ui/textarea"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { reviewPermit } from "@/app/utils/Functions"
import { useToast } from "@/components/ui/use-toast"

const reviewFormSchema = z.object({

    notes: z
        .string()
,
    status: z.enum(["approved", "rejected", "pending"], {
        required_error: "You need to select a notification type.",
    }),


})

type ReviewFormValues = z.infer<typeof reviewFormSchema>

const defaultValues: Partial<ReviewFormValues> = {
    notes: "",
    status: "pending"


}

const ReviewPermit = ({ permitId }: { permitId: string }) => {
    const router = useRouter()
    
    const [toPermits, setToPermits] = useState(false)
    const {toast} = useToast()

    useEffect(() => {
        if (toPermits) {
            router.push('/panel/permits')
        }

    }, [toPermits])
  
    
    const form = useForm<ReviewFormValues>({
        resolver: zodResolver(reviewFormSchema),
        defaultValues
    })
    

    function onSubmit(values: ReviewFormValues) {
      
        reviewPermit(permitId, values.status, values.notes)

        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(values, null, 2)}</code>
                </pre>
            ),
        })

      

        setToPermits(true)
    }


    return (
      

    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Review Permit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Review work permit</DialogTitle>
          <DialogDescription>
         Please review the permit.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel>Review</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex flex-col space-y-1"
                                    >
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="approved" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Approved
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="rejected" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Rejected
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="pending" />
                                            </FormControl>
                                            <FormLabel className="font-normal">Pending</FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Notes (optional)</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Your comment"
                                        className="resize"
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                            <Button type="submit">Send</Button>
                        </form>
                        </Form>


        </div>
        <DialogFooter>
         
        </DialogFooter>
      </DialogContent>
    </Dialog>




  )
}

export default ReviewPermit



