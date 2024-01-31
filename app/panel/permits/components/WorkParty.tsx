import { WorkPartyMember } from '@/app/utils/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react'





const WorkParty = ({ setWorkParty }: { setWorkParty: React.Dispatch<React.SetStateAction<WorkPartyMember[]>> }) => {

    const [surname, setSurname] = useState('');
    const [company, setCompany] = useState('');
    const [phone, setPhone] = useState('');

    const handleWorkPartyAdd = (e: React.FormEvent) => {
        e.preventDefault();


        // Create a new object with data from the form
        const newWorkPartyMember: WorkPartyMember = {
            surname,
            company,
            phone,
        };

        // Add the new object to the workParty array
        setWorkParty((prevWorkParty: WorkPartyMember[]) => [...prevWorkParty, newWorkPartyMember]);

        // Clear the form fields
        setSurname('');
        setCompany('');
        setPhone('');
    };

    return (
        <div className="flex w-full items-center space-x-2 pt-10">
            <Button onClick={handleWorkPartyAdd}>Add</Button>
            <Input
                placeholder="Name and Surname"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
            />
            <Input
                placeholder="Company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
            />
            <Input
                type="phone"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
        </div>
    );
};

export default WorkParty