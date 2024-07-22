'use client'

import {
    LogOut,
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import React from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { User } from 'next-auth'
import { Button } from './ui/button'


const Navbar = () => {
    const { data: session } = useSession()
    const user = session?.user as User

    return (
        <nav className='bg-white p-4 md:p-6 shadow-lg'>
            <div className='container flex flex-col md:flex-row justify-between items-center mx-auto'>
                <a className='text-2xl font-bold text-teal-700 mb-4 md:mb-0' href="#">GhostFeedback</a>
                {
                    session ? (
                        <>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button className="outline-none bg-teal-700 text-white hover:bg-teal-600">Menu</Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-64 bg-white shadow-md border border-gray-200 rounded-lg">
                                    <DropdownMenuLabel className="font-semibold text-gray-700">Welcome, {user.username || user.email}</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="flex items-center p-2 px-4 hover:bg-teal-100 cursor-pointer" onClick={() => signOut()}>
                                        <LogOut className="mr-2 h-4 w-4 text-teal-500" />
                                        <span className="text-gray-700" >Log out</span>
                                        <DropdownMenuShortcut className="ml-auto text-gray-500">⇧⌘Q</DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                    ) : (
                        <Link href='/sign-in'>
                            <Button className='bg-teal-700 text-white hover:bg-teal-600 w-full md:w-auto'>Login</Button>
                        </Link>
                    )
                }
            </div>
        </nav>
    )
}

export default Navbar










// 'use client'

// import {
//     LogOut,
//     Mail,
//     MessageSquare,
//     Plus,
//     PlusCircle,
//     Settings,
//     UserPlus,
//     Users,
// } from "lucide-react"
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuLabel,
//     DropdownMenuSeparator,
//     DropdownMenuShortcut,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"

// import React from 'react'
// import Link from 'next/link'
// import { useSession, signOut } from 'next-auth/react'
// import { User } from 'next-auth'
// import { Button } from './ui/button'


// const Navbar = () => {
//     const { data: session } = useSession()
//     const user = session?.user as User

//     return (
//         <nav className='p-4 md:p-6 shadow-md'>
//             <div className='container flex flex-col md:flex-row justify-between items-center mx-auto'>
//                 <a className='text-xl font-bold mb-4 md:mb-8' href="#">Message-Generator</a>
//                 {
//                     session ? (
//                         <>
//                             <DropdownMenu>
//                                 <DropdownMenuTrigger asChild>
//                                     <Button className="outline-none" variant="outline">Menu</Button>
//                                 </DropdownMenuTrigger>
//                                 <DropdownMenuContent className="w-56">
//                                     <DropdownMenuLabel>Welcome, {user.username || user.email}</DropdownMenuLabel>
//                                     <DropdownMenuSeparator />
//                                     <DropdownMenuItem>
//                                         <LogOut className="mr-2 h-4 w-4" />
//                                         <span>Log out</span>
//                                         <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
//                                     </DropdownMenuItem>
//                                 </DropdownMenuContent>
//                             </DropdownMenu>

//                             {/* <span className='mr-4'>Welcome, {user.username || user.email} </span>
//                             <Button className='w-full md:w-auto' onClick={() => signOut()}>LogOut</Button> */}
//                         </>
//                     ) : (
//                         <Link href='/sign-in'>
//                             <Button className='w-full md:w-auto'>Login</Button>
//                         </Link>
//                     )
//                 }
//             </div>
//         </nav>
//     )
// }

// export default Navbar
