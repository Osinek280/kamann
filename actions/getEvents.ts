"use server"

import { cookies } from 'next/headers';

export async function getEvents(available: boolean) {

  const sessionToken = (await cookies()).get('session')?.value;

  console.log(`${process.env.BACKEND_URL}/client/events/${available ? "available" : "registered"}`)

  console.log(sessionToken);

  try {
    const response = await fetch(`http://localhost:8080/api/client/occurrences?filter=upcoming&page=0&size=10`, {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${sessionToken}`
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);

    return data.content.map((el: { start: string, end: string }) => ({
        ...el,
        start: new Date(el.start),
        end: new Date(el.end)
    }));

} catch (error) {
    console.error('Error fetching events:', error);
    return [];
}
}