import { NextResponse } from "next/server";
import {
  GetDocumentsForDate,
  calculateDistractionScore,
  calculateProductivityScore,
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
  const userId = body.extension_user_id;
  const distractionScore = await calculateDistractionScore(userId);
  return NextResponse.json({
    distractionScore_Card: distractionScore?.distractionScores_Card || [],
  });
};
