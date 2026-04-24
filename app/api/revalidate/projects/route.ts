import { NextRequest, NextResponse } from "next/server";
import { revalidateProjects } from "@/app/actions/revalidate";

function readProvidedToken(request: NextRequest): string {
  const authHeader = request.headers.get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.slice("Bearer ".length).trim();
  }

  const customHeader = request.headers.get("x-revalidate-token");
  if (customHeader) return customHeader.trim();

  return request.nextUrl.searchParams.get("token")?.trim() ?? "";
}

export async function POST(request: NextRequest) {
  const expectedToken = process.env.REVALIDATE_TOKEN;
  if (!expectedToken) {
    return NextResponse.json(
      {
        ok: false,
        error: "REVALIDATE_TOKEN is not configured on the server.",
      },
      { status: 500 },
    );
  }

  const providedToken = readProvidedToken(request);
  if (!providedToken || providedToken !== expectedToken) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized revalidation request." },
      { status: 401 },
    );
  }

  const result = await revalidateProjects();
  return NextResponse.json(result, { status: 200 });
}
