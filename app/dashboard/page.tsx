"use client";

import { Button } from "@/components/ui/button";

export default function Home() {
  const handleFetch = async () => {
    try {

      const response = await fetch("http://localhost:8080/api/admin/users/register", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: "gfhfgjhtg@gmail.com",
          password: "admin123",
          firstName: "John",
          lastName: "Doe"
        })
      });
      
      const responseData = await response.json(); // Jeśli odpowiedź zawiera JSON
      console.log(response.status)
      console.log(responseData)
      console.log(responseData.status);

    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <Button onClick={handleFetch}>
      Fetch
    </Button>
  );
}
