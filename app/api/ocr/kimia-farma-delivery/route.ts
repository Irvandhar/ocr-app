import { NextRequest, NextResponse } from "next/server";
import { extractKimiaFarmaDelivery } from "@/lib/ocr/kimia-farma-delivery-extractor";
import { storeDocument } from "@/lib/store-document";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();

    if (!body) {
      return NextResponse.json({ error: "Empty request body" }, { status: 400 });
    }

    const { imageBase64, store } = JSON.parse(body);

    if (!imageBase64) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const result = await extractKimiaFarmaDelivery(imageBase64);

    let pineconeId: string | null = null;
    if (store) {
      pineconeId = await storeDocument("kimia-farma-delivery", result);
    }

    return NextResponse.json({ success: true, data: result, pineconeId });

  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Route error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}