export async function embedText(text: string): Promise<number[]> {
  const response = await fetch("https://openrouter.ai/api/v1/embeddings", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY!}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "openai/text-embedding-3-small", 
      input: text,
    }),
  });

  if (!response.ok) {
    throw new Error(`Embedding error: ${await response.text()}`);
  }

  const data = await response.json();
  return data.data[0].embedding as number[];
}