'use client';
import DarkModeToggle from '@/components/DarkModeToggle';


const Header = () => {

    return (
        <header> 
            <nav className='flex flex-col sm:flex-row items-center p-5 pl-2  max-w-7xl mx-auto'>
                LOGO

                <div className='flex-1 flex items-center justify-end space-x-4'>

          

                    <DarkModeToggle />
                 
                </div>
            </nav>
        </header>
    )
}

export default Header



/*
'use client';
import DarkModeToggle from '@/components/DarkModeToggle';
import { Navbar } from 'flowbite-react';
import Link from 'next/link';

const Header = () => {
  return (

      

      <Navbar fluid rounded>
          <Navbar.Brand as={Link} href="https://flowbite-react.com">
              <img src="/favicon.ico" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
              <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite React</span>
          </Navbar.Brand>
          <DarkModeToggle />
          <Navbar.Toggle />
          <Navbar.Collapse>
              <Navbar.Link href="#" active>
                  Home
              </Navbar.Link>
              <Navbar.Link as={Link} href="#">
                  About
              </Navbar.Link>
              <Navbar.Link href="#">Services</Navbar.Link>
              <Navbar.Link href="#">Pricing</Navbar.Link>
              <Navbar.Link href="#">Contact</Navbar.Link>
          </Navbar.Collapse>
      </Navbar>


  )
}

export default Header


*/