import { db } from '@/app/firebase/config'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { doc, updateDoc } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const transferFormSchema = z.object({

    email: z
        .string()

})

type TransferFormValues = z.infer<typeof transferFormSchema>

const defaultValues: Partial<TransferFormValues> = {
    email: ""
}

interface TransferPermitProps {
    permitId: string
}



const TransferPermit = ({permitId} : TransferPermitProps) => {
    const router = useRouter()

    const [toPermits, setToPermits] = useState(false)


    useEffect(() => {
        if (toPermits) {
            router.push('/panel/permits')
        }

    }, [toPermits])


    const form = useForm<TransferFormValues>({
    resolver: zodResolver(transferFormSchema), defaultValues
    })
    
    function onSubmit(values: TransferFormValues) {

        transferPermit(permitId, values.email)
        setToPermits(true)
    }


  return (
      <Dialog>
          <DialogTrigger asChild>
              <Button variant="default">Transfer Permit</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                  <DialogTitle>Transfer your permit</DialogTitle>
                  <DialogDescription>
                      Choose a new permit owner

                  </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                  
              

                   <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">


                          <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                  <FormItem>
                                      <FormLabel>Email address</FormLabel>
                                      <FormControl>
                                          <Input placeholder="New owner" {...field} />
                                      </FormControl>

                                      <FormMessage />
                                  </FormItem>
                              )}
                          />
                          <Button type="submit">Transfer</Button>
                      </form>
                  </Form> 


              </div>
              <DialogFooter>

              </DialogFooter>
          </DialogContent>
      </Dialog>
  )
}

export default TransferPermit

 async function transferPermit(
    permitId: string,
    newEmail: string,

) {
    const ref = doc(db, "permits", permitId);
    try {
        let mail = newEmail;




        const dataToUpdate = {
            email: mail
        };


        await updateDoc(ref, dataToUpdate as any, { merge: true });
        console.log("Document successfully written!");
    } catch (error) {
        console.error("Error writing document: ", error);
    }
}