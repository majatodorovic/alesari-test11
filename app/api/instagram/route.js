import { NextResponse } from "next/server";

export async function GET() {
  try {
    const currentToken = process.env.INSTAGRAM_ACCESS_TOKEN;

    if (!currentToken) {
      throw new Error(
        "Instagram access token is missing in environment variables",
      );
    }

    const response = await fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_url,timestamp,media_type,permalink&access_token=${currentToken}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        details:
          process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 },
    );
  }
}
