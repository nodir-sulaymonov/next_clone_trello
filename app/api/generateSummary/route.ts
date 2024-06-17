import openai from "@/openai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { todos } = await request.json();

    const response = await openai.chat.completions.create({
        messages: [
            { 
                role: "system", 
                content: "Say this is a test" ,
            },
        ],
        model: "gpt-3.5-turbo",
        temperature: 0.8,
        stream: false,
    });

    const { data } = response;

    return NextResponse.json(data.choices[0].message);
}