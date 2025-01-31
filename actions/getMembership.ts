"use server"

import { cookies } from 'next/headers';

export async function getMembership() {

  const sessionToken = (await cookies()).get('session')?.value;

  const response = await fetch('http://localhost:8080/api/client/membership-cards/active', {
    headers: {
      "Authorization": `Bearer ${sessionToken}`
    }
  })

  const data = await response.json()

  return data
}