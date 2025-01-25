"use server"

import { cookies } from 'next/headers';

export async function getEvents() {

  const sessionToken = (await cookies()).get('session')?.value;

  const response = await fetch("http://localhost:8080/api/client/events/available", {
    headers: {
      "Authorization": `Bearer ${sessionToken}`
    }
  })

  const data = await response.json()

  return data
}