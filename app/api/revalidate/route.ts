import { revalidateTag, revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const secret =
      req.headers.get("x-sanity-secret") ||
      req.nextUrl.searchParams.get("secret");
    const configuredSecret = process.env.SANITY_REVALIDATE_SECRET;

    if (!configuredSecret || secret !== configuredSecret) {
      return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
    }

    const body = (await req.json().catch(() => ({}))) as { _type?: string };
    const type = body?._type;

    if (type) {
      revalidateTag(type, { expire: 0 });
    }
    // Also revalidate generic site collections
    revalidateTag("siteSettings", { expire: 0 });
    revalidateTag("projects", { expire: 0 });
    revalidateTag("notes", { expire: 0 });
    revalidateTag("experience", { expire: 0 });

    // Ensure layout and pages refresh
    revalidatePath("/", "layout");

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      type,
    });
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { message: "Error revalidating", error: errorMessage },
      { status: 500 }
    );
  }
}
