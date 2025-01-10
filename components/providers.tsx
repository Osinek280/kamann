"use client"

import * as React from "react"
import { ThemeProvider } from "next-themes"

export function Providers({
  children,
}: React.ComponentProps<typeof ThemeProvider>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>)
}