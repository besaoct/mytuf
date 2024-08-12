"use client"

import * as React from "react"
import { HamburgerMenuIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { navItems } from "./Navbar"

export function MenuToggle() {
 
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
