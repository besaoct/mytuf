'use client'

import Link from 'next/link'
import React from 'react'
import { ModeToggle } from './ModeToggle'

import { usePathname } from 'next/navigation'
import { MenuToggle } from './MobileMenu'

export const navItems = [
  { href: '/', label: 'Home' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/tuf-plus', label: 'Explore +' },
  { href: '/flashcards', label: 'Flashcards' },
  { href: 'https://resayai.vercel.app', label: 'Generate resume' , blank:true },
]

const NavLink = ({ href, label,blank }: { href: string, label: string, blank?:boolean }) => {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      target={blank? '_blank': '_self'}
      className={`flex p-2 justify-between gap-1 items-center hover:bg-accent rounded-md ${
        isActive ? 'bg-accent ' : ''
      } ` }
    >
      {label}
    </Link>
  )
}

const NavBar = () => {



  return (
    <div className="sm:max-w-[12rem] w-full h-fit sm:h-full flex flex-col gap-4 rounded-md sm:top-4 sm:sticky">
      <div className="px-4 py-2 flex justify-between gap-1 items-center rounded-md bg-white dark:bg-black ">
     
        <Link href={'/'}  className="flex-1">
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
        <ModeToggle />
        <MenuToggle/>
        </div>
      </div>
      <div
        className={`hidden p-2 sm:flex flex-col gap-2 justify-start rounded-md bg-white dark:bg-black  sm:h-full`}
      >
        {navItems.map((item) => (
          <NavLink key={item.href} href={item.href} label={item.label} blank={item.blank} />
        ))}
      </div>
      <Footer />
    </div>
  )
}

const Footer = () => (
  <footer className="hidden break-words line-clamp-1 text-xs text-muted-foreground sm:flex items-center gap-1 flex-wrap">
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
