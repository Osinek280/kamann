"use server"

import { cookies } from 'next/headers';

export async function getMembership() {

  const sessionToken = (await cookies()).get('session')?.value;

  const response = await fetch(`${process.env.BACKEND_URL}/client/membership-cards/active`, {
    headers: {
      "Authorization": `Bearer ${sessionToken}`
    }
  })

  const data = await response.json()

  return data
}