"use server"

import { cookies } from 'next/headers';

export async function joinEvent(eventId: string) {

  const sessionToken = (await cookies()).get('session')?.value;

  const response = await fetch(`${process.env.BACKEND_URL}/client.attendance/${eventId}/join`, {
    headers: {
      "Authorization": `Bearer ${sessionToken}`
    }
  })
  
  const data = await response.json()

  console.log(data)

  return { success: true, message: "Successfully joined the event" }
}
