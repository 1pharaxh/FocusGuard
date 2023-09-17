import { NextResponse } from "next/server";
import { EditCategories, GetCurrentCategories } from "@/lib";
// IMPORTANT: THIS IS HOW YOU MAKE AN API : https://www.youtube.com/watch?v=O-NGENb6LNg
export const GET = async (req: Request, res: Response) => {
  return NextResponse.json({ message: "Hello from the API!" });
};

export const POST = async (req: Request, res: Response) => {
  const body = await req.json();
  if (!body) {
    return NextResponse.json({ message: "no body!" });
  }
  if (body.view === "get") {
    const returnData = await GetCurrentCategories(body.extension_user_id);
    return NextResponse.json({ categories: returnData });
  } else if (body.view === "post") {
    console.log("POSTING TO EDIT CATEGORIES", body.categories);
    const edit = await EditCategories(body.extension_user_id, body.categories);
    const returnData = await GetCurrentCategories(body.extension_user_id);
    return NextResponse.json({ categories: returnData });
  }
};
