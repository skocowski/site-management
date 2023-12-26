'use client';

import { Button, Checkbox, Datepicker, Label, Select, TextInput, Textarea } from 'flowbite-react';

const AddPermitOld = () => {
    return (
        <div className='max-w-md'>
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Add Permit
                </h3>

            </div>
            <form className="flex max-w-md flex-col gap-4">
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="location" value="Location" />
                    </div>
                    <TextInput id="location" placeholder="Permit location" required />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="description" value="Description" />
                    </div>
                    <Textarea id="description" placeholder="Provide a brief description of the work" required rows={2} />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="date" value="Date" />
                    </div>
                    <Datepicker id='date'/>
                </div>
        
                <div className="max-w-md">
                    <div className="mb-2 block">
                        <Label htmlFor="permitType" value="Select permit type" />
                    </div>
                    <Select id="permitType" required>
                        <option>Electrical</option>
                        <option>Hot work</option>
                        <option>Riser</option>
                     
                    </Select>
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="add" value="Add members" />
                    </div>
                    <div className="flex justify-between">
                  
                        <TextInput id="add" placeholder="Surname" required />
                            <Button>Add</Button>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember">Eoin O'Grady</Label>
                    <Checkbox id="remember2" />
                    <Label htmlFor="remember2">Gavin Hanlon</Label>
                </div>
                <Button type="submit">Submit</Button>
            </form></div>
    )
}

export default AddPermitOld



