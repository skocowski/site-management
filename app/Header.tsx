'use client'
import DarkModeToggle from '@/components/DarkModeToggle';


import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Button, buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { auth } from '@/app/firebase/config'
import { User, onAuthStateChanged, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import UserAvatar from '@/components/UserAvatar';
import { useRouter } from 'next/navigation';



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

                    <div className='items-center space-x-4 flex'>

                        <>
                            {/*            {auth.currentUser ?
                                <Button onClick={() => { signOut(auth) }} variant="ghost" size="sm">Sign Out</Button>
                                :
                                <Link href='/sign-in' className={buttonVariants({
                                    variant: "ghost",
                                    size: "sm"
                                })}>Sign In</Link>

                            } */}
                            <UserButton />

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




const UserButton = () => {
    const router = useRouter()


    const [toMain, setToMain] = useState(false)



    useEffect(() => {
        if (toMain) {
            router.push('/')
        }

    }, [toMain])

    if (!auth.currentUser) return (
        <Link href='/sign-in' className={buttonVariants({
            variant: "ghost",
            size: "sm"
        })}>Sign In</Link>
    )


    return (
        <DropdownMenu>
            <DropdownMenuTrigger><UserAvatar name={auth.currentUser.displayName} image={auth.currentUser.photoURL} /></DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>{auth.currentUser.displayName}</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={() => {
                    signOut(auth)
                    setToMain(true)
                }}>Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    )
}



