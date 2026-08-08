  
export async function runAgent(task: string) {
  const response = await fetch("http://localhost:5083/api/ai/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task ),
  });

  if (!response.ok) {
   // throw new Error("Failed to run agent");
     throw new Error(`Agent request failed: ${response.status}`);
  }

  return response.json();
}