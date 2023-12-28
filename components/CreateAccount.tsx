import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Icons } from './icons'
import { cn } from '@/lib/utils'
import { CheckIcon } from '@radix-ui/react-icons'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from './ui/command'

const contractors = [
    { label: "Mercury", value: "mercury" },
    { label: "Boston", value: "boston" },
    { label: "Gradx", value: "gradx" },

] as const

const CreateAccount = () => {
  return (
      <Card>
          <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Create an account</CardTitle>
              <CardDescription>
                  Enter your email below to create your account
              </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
              <div className="grid grid-cols-2 gap-6">
                  <Button variant="outline">
                      <Icons.twitter className="mr-2 h-4 w-4" />
                      Twitter
                  </Button>
                  <Button variant="outline">
                      <Icons.google className="mr-2 h-4 w-4" />
                      Google
                  </Button>
              </div>
              <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                          Or continue with
                      </span>
                  </div>
              </div>
              <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" type='text' placeholder="Name" />
              </div>
              <div className="grid gap-2">
                  <Label htmlFor="surname">Surname</Label>
                  <Input id="surname" type="text" placeholder="Surname" />
              </div>
              <div className="grid gap-2">
                  <Label htmlFor="phone">Phone number</Label>
                  <Input id="phone" type="phone" placeholder="Phone number" />
              </div>

              <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="m@example.com" />
              </div>
              <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" />
              </div>
              <div className="grid gap-2">
                  <Label htmlFor="password2">Repeat Password</Label>
                  <Input id="password2" type="password" />
              </div>
              <div className="grid gap-2">
               
                      <Label>Permit type</Label>
                      <Popover>
                          <PopoverTrigger asChild>

                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0">
                              <Command>
                                  <CommandInput placeholder="Search permit..." />
                                  <CommandEmpty>No permit found.</CommandEmpty>
                                  <CommandGroup>
                                      {contractors.map((contractor) => (
                                          <CommandItem
                                              value={contractor.label}
                                              key={contractor.value}
                                       
                                          >
                                              <CheckIcon
                                                  className={cn(
                                                      "mr-2 h-4 w-4",
                                                      contractor.value === contractor.value
                                                          ? "opacity-100"
                                                          : "opacity-0"
                                                  )}
                                              />
                                              {contractor.label}
                                          </CommandItem>
                                      ))}
                                  </CommandGroup>
                              </Command>
                          </PopoverContent>
                      </Popover>

                
           
              </div>

          </CardContent>
          <CardFooter>
              <Button className="w-full">Create account</Button>
          </CardFooter>
      </Card>
  )
}

export default CreateAccount