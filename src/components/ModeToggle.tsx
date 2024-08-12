"use client"

import * as React from "react"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <>

        <Button variant="link" size="icon" onClick={() => setTheme("dark")} className="dark:hidden block w-fit"  >
          <SunIcon  className="h-[1.2rem] w-[1.2rem]" />
        </Button>

        <Button variant="link" size="icon" onClick={() => setTheme("light")}  className="hidden dark:block w-fit">
          <MoonIcon className="h-[1.2rem] w-[1.2rem] " />
        </Button>
    
    </>
  )
}
