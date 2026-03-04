import { NextRequest, NextResponse } from "next/server";
import { extractSamuderaBastb } from "@/lib/ocr/samudera-bastb-extractor";
import { storeDocument } from "@/lib/store-document";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const { imageBase64, store } = JSON.parse(body); // store = true/false

    if (!imageBase64) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const result = await extractSamuderaBastb(imageBase64);

    let pineconeId: string | null = null;
    if (store) {
      pineconeId = await storeDocument("samudera-bastb", result);
    }

    return NextResponse.json({ success: true, data: result, pineconeId });

  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}