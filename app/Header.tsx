'use client'
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


