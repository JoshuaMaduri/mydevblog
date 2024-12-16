import { handleUpload } from "@vercel/blob/client";
import { NextResponse } from "next/server";

export async function POST(request) {
    

    try {

        const body = await Response.json();

        const jsonResponse = await handleUpload({
            body,
            request
        });

        return NextResponse.json(jsonResponse)
    } catch(error) {
        console.error("Error during file upload:", error)
        return NextResponse.json(
            {error: "File Upload failed"},
            {status: 500}
        )
    }
}