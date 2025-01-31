"use server"

export function parseJwt(token: string) {
  try {
    const base64Url = token.split('.')[1]; // Druga część tokena to payload
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Base64Url → Base64
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    

    return JSON.parse(jsonPayload); // Parsowanie payloadu jako obiekt JSON
  } catch (error) {
    console.error('Invalid JWT:', error);
    return null; // Zwróć null w przypadku błędu
  }
}

export async function getUser(token: string) {

  const response = await fetch("http://localhost:8080/api/admin/users/logged", {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })

  const data = await response.json()
  console.log(data);

  return { role: "admin" }
}