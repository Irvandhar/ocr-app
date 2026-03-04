import { NextRequest, NextResponse } from "next/server";
import { extractKimiaFarmaDelivery } from "@/lib/ocr/kimia-farma-delivery-extractor";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    console.log("Request body length:", body.length);

    if (!body) {
      return NextResponse.json({ error: "Empty request body" }, { status: 400 });
    }

    const { imageBase64 } = JSON.parse(body);

    if (!imageBase64) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    console.log("Image base64 length:", imageBase64.length);

    const result = await extractKimiaFarmaDelivery(imageBase64);
    return NextResponse.json({ success: true, data: result });

  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Route error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}