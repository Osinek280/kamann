"use client"

import * as React from "react"
import { ThemeProvider } from "next-themes"

export function Providers({
  children,
}: React.ComponentProps<typeof ThemeProvider>) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

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