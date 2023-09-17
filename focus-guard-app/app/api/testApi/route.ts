import { NextResponse } from "next/server";
import { AddToDatabase, EditCategories, CheckIfCollectionExists } from "@/lib";
// IMPORTANT: THIS IS HOW YOU MAKE AN API : https://www.youtube.com/watch?v=O-NGENb6LNg
export const GET = async (req: Request, res: Response) => {
  return NextResponse.json({ message: "Hello from the API!" });
};

export const POST = async (req: Request, res: Response) => {
  const body = await req.json();
  if (!body) {
    return NextResponse.json({ message: "no body!" });
  }
  // const category = await SendToAI(body.page_title, [
  //   "Gaming",
  //   "Politcal News",
  //   "Other",
  // ]);
  // console.log(body.page_title + "-", category);

  CheckIfCollectionExists(body.extension_user_id);
  EditCategories(body.extension_user_id, ["Gaming", "Politcal News"]);

  const category = await AddToDatabase(
    body.extension_user_id,
    body.page_title,
    body.page_url,
    ["Gaming", "Politcal News", "Other"]
  );
  return NextResponse.json({ category: category });
};
