import { NextResponse } from "next/server";
import {
  AddToDatabase,
  EditCategories,
  CheckIfCollectionExists,
  GetData,
  CheckIfCategoriesExist,
  GetCurrentCategories,
} from "@/lib";
// IMPORTANT: THIS IS HOW YOU MAKE AN API : https://www.youtube.com/watch?v=O-NGENb6LNg
export const GET = async (req: Request, res: Response) => {
  const body = await req.json();
  if (!body) {
    return NextResponse.json({ message: "no body!" });
  }
  const categories = await GetCurrentCategories(body.extension_user_id);
  return NextResponse.json({ categories: categories });
};

export const POST = async (req: Request, res: Response) => {
  const body = await req.json();
  if (!body) {
    return NextResponse.json({ message: "no body!" });
  }
  EditCategories(body.extension_user_id, body.categories);
  const returnData = await GetCurrentCategories(body.extension_user_id);
  return NextResponse.json({ categories: returnData });
};
