import { NextResponse } from "next/server";
import { connectToDatabase, SendToAI, AddToDatabase } from "@/lib";
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
  const category = "Other";
  AddToDatabase(
    "IAMANID",
    "10000 KILL SQUAD WIPED TWIN TOWER FORTNITE MONTAGE EPIC 2021 KILLS | SUICDE SQUAD | CASTORS CURSE",
    ["Gaming", "Others", "Political News", "United Kingdom", "Canada", "USA"]
  );

  return NextResponse.json({ category: category });
};
