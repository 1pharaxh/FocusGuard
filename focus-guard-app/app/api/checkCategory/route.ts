import { NextResponse } from "next/server";
import {
  AddToDatabase,
  EditCategories,
  CheckIfCollectionExists,
  GetData,
  CheckIfCategoriesExist,
} from "@/lib";
// IMPORTANT: THIS IS HOW YOU MAKE AN API : https://www.youtube.com/watch?v=O-NGENb6LNg
export const GET = async (req: Request, res: Response) => {
  return NextResponse.json({ message: "Hello from the API!" });
};

export const POST = async (req: Request, res: Response) => {
  const body = await req.json();
  if (!body) {
    return NextResponse.json({ message: "no body!" });
  }
  const returnData = await CheckIfCategoriesExist(body.extension_user_id);
  return NextResponse.json({ exists: returnData });
};
