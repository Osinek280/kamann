"use server"

import { cookies } from 'next/headers';

export async function getEvents(available: boolean) {

  const sessionToken = (await cookies()).get('session')?.value;

  console.log(`http://localhost:8080/api/client/events/${available ? "available" : "registered"}`)

  const response = await fetch(`http://localhost:8080/api/client/events/${available ? "available" : "registered"}`, {
    headers: {
      "Authorization": `Bearer ${sessionToken}`
    }
  })

  const data = await response.json()

  return data
}