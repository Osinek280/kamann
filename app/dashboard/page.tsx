"use client";

import { Button } from "@/components/ui/button";

export default function Home() {
  const handleFetch = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/admin/users?page=0&size=1', {
        method: 'GET',
        headers: {
          'accept': '*/*'
        }
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);  
        })
        .catch(error => {
          console.error('Błąd:', error);
        });
      

        console.log(response)

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
