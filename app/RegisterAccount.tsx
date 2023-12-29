/* 'use client';

import { Button, Checkbox, Datepicker, FileInput, Label, Select, TextInput, Textarea } from 'flowbite-react';

const RegisterAccount = () => {
    return (
        <div className='max-w-md'>
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Register Account
                </h3>

            </div>
            <form className="flex max-w-md flex-col gap-4">
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="name" value="Name" />
                    </div>
                    <TextInput id="name" placeholder="Name" required />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="surname" value="Surname" />
                    </div>
                    <TextInput id="surname" placeholder="Surname" required />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="phone" value="Phone" />
                    </div>
                    <TextInput id="phone" placeholder="Phone number" type='phone' required />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="email" value="E-mail" />
                    </div>
                    <TextInput id="email" placeholder="E-mail" type='email' required />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="password" value="Your password" />
                    </div>
                    <TextInput id="password" type="password" required shadow />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="repeat-password" value="Repeat password" />
                    </div>
                    <TextInput id="repeat-password" type="password" required shadow />
                </div>

                <div className="max-w-md">
                    <div className="mb-2 block">
                        <Label htmlFor="subcontractor" value="Subcontractor" />
                    </div>
                    <Select id="subcontractor" required>
                        <option>Mercury</option>
                        <option>Boston</option>
                        <option>Fohntech</option>

                    </Select>
                </div>
                <div className="max-w-md">
                    <div className="mb-2 block">
                        <Label htmlFor="photo" value="Upload photo" />
                    </div>
                    <FileInput id="photo" helperText="A profile picture is useful to confirm your are logged into your account" />
                </div>
                <Button type="submit">Submit</Button>
            </form></div>
    )
}

export default RegisterAccount */