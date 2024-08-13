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


export const navItems = [
  { href: '/', label: 'Home' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/flashcards', label: 'Flashcards' },
  { href: '/tuf-plus', label: 'Explore +' },
  { href: 'https://resayai.vercel.app', label: 'Generate resume' , blank:true },
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
          <svg
            width="80"
            height="20"
            viewBox="0 0 135 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 5.89409H15.3693L9.5331 36H21.8368L27.2126 5.89409H42.2511L43.4131 0H1.17165L0 5.89409Z"
              fill="#D41F30"
            ></path>
            <path
              d="M47.2951 0L42.512 26.9438L49.9857 36H82.8746L89.1533 0H77.1198L71.8129 30.008H56.8626L54.4711 27.0927L59.1053 0H47.2951Z"
              fill="#D41F30"
            ></path>
            <path
              d="M86.9282 36H98.7784L100.699 23.9651H130.691L131.882 17.9993H101.825L103.214 8.93625L106.724 5.82379H122.018L120.826 11.9812H132.81L134.929 0H102.156L91.6286 9.00241L86.9282 36Z"
              fill="#D41F30"
            ></path>
          </svg>
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
          <NavLink key={item.href} href={item.href} label={item.label} blank={item.blank} />
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
              <DropdownMenuItem key={item.href} onClick={() => push(item.href)}>
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
