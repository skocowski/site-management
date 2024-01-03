'use client'
import DarkModeToggle from '@/components/DarkModeToggle';


import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Button, buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { auth } from '@/app/firebase/config'
import { User, onAuthStateChanged, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';



const Header = () => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });

        // Cleanup the subscription when the component unmounts
        return () => unsubscribe();
    }, []);

    return (

        <nav className='h-14 w-full mb-10 transition-all'>
            <MaxWidthWrapper>
                <div className='flex h-14 items-center justify-between'>
                    <Link href='/' className='flex z-40 font-semibold'><span>Site Management</span></Link>
                    {/*   todo: add mobile navbar */}

                    <div className='hidden items-center space-x-4 sm:flex'>

                        <>
                            {auth.currentUser ?
                                <Button onClick={() => { signOut(auth) }} variant="ghost" size="sm">Sign Out</Button>
                                :
                                <Link href='/sign-in' className={buttonVariants({
                                    variant: "ghost",
                                    size: "sm"
                                })}>Sign In</Link>

                            }

                            <Link href='/sign-up' className={buttonVariants({
                                variant: "ghost",
                                size: "sm"
                            })}>Sign Up</Link>

                            <DarkModeToggle />
                        </>
                    </div>
                </div>
            </MaxWidthWrapper>
        </nav>
    )
}

export default Header


