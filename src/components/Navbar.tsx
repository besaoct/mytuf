'use client'

import Link from 'next/link'
import React from 'react'
import { ModeToggle } from './ModeToggle'

import { usePathname, useRouter } from 'next/navigation'
import { Button } from './ui/button'

import { HamburgerMenuIcon } from "@radix-ui/react-icons"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { IoSparkles } from 'react-icons/io5'

export const navItems = [
  { href: '/', label: 'Home' },
  { href: '/flashcards', label: 'Flashcards' },
  { href: '/dashboard', label: 'Dashboard' },
  // { href: '/tuf-plus', label: 'Explore +' },
  // { href: 'https://resayai.vercel.app', label: 'Generate resume' , blank:true },
]

const NavLink = ({ href, label,blank }: { href: string, label: string, blank?:boolean }) => {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      target={blank? '_blank': '_self'}
      className={`flex p-2 justify-between gap-1 font-medium items-center hover:bg-accent rounded ${
        isActive ? 'bg-accent' : ''
      } ` }
    >
      {label}
    </Link>
  )
}

const NavBar = () => {
  return (
    <div className="z-10 sm:max-w-[12rem] sm:left-0 w-full h-16 sm:h-full flex flex-col justify-center sm:justify-normal sm:top-0 fixed bg-white dark:bg-black">
      <div className="h-16 p-4 flex justify-between gap-1 items-center bg-white dark:bg-black ">
        <Link href={'/'}  className="flex-1 sm:h-full sm:flex sm:items-center sm:justify-start">
         <span className=' font-extrabold text-4xl text-rose-700 '> 
          <IoSparkles/>
           </span>
        </Link>

        <div className='flex gap-4 justify-start w-fit items-center'>
         <div className='sm:hidden'> 
         <ModeToggle />
         </div>
        <MobileMenuToggle/>
        </div>
      </div>
      <div
        className={`hidden  p-4 sm:flex flex-col gap-2 justify-start bg-white dark:bg-black  sm:h-full sm:overflow-x-auto`}
      >
        {navItems.map((item) => (
          <NavLink key={item.href} href={item.href} label={item.label}  />
        ))}
      </div>
      <Footer />
    </div>
  )
}

export const TopBar =() =>(
  <div className="hidden w-full h-16 sm:flex  bg-white dark:bg-black fixed z-10 items-center p-4">
      <div className='flex w-full justify-end mr-[12rem] items-center sm:gap-4'>
     <div>
        <ModeToggle/>
     </div>
      <Button variant={'secondary'} className='rounded'>
        Get mentorship
       </Button>
       <Button variant={'secondary'} className='rounded text-white bg-rose-600 hover:bg-rose-500'>
         Login
       </Button>
      </div>
   </div>
)


export function MobileMenuToggle() {
  const {push} =useRouter()
    return (
      <DropdownMenu >
        <DropdownMenuTrigger asChild className="sm:hidden">
          <Button variant="outline" size="icon" className="">
            <HamburgerMenuIcon className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">Menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="sm:hidden">
  
          {navItems.map((item)=>
              <DropdownMenuItem key={item.href} onClick={() => push(item.href)} className='font-medium'>
                 {item.label}
              </DropdownMenuItem>
          )}
       
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
  

const Footer = () => (
  <footer className="hidden break-words p-4 line-clamp-1 text-xs text-muted-foreground sm:flex items-center gap-1 flex-wrap">
    &copy; {new Date().getFullYear()}{' '}
    <Link href={'https://linkedin.com/in/besaoct'} className="inline underline text-red-500">
      besaoct
    </Link>
    {' '}
    <Link href={'/besaoct-projects'} className="inline underline text-red-500">
      projects
    </Link>

  </footer>
)

export default NavBar
