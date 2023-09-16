import OpenAI from "openai";
import { NextResponse } from "next/server";

import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../../../services/database.service";
import { connectToDatabase } from "../../../services/database.service";

export const router = express.Router();
router.use(express.json());

const app = express();
const port = 8080; // default port to listen

connectToDatabase()
    .then(() => {
        app.use("/api/testApi", router);

        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });

// IMPORTANT: THIS IS HOW YOU MAKE AN API : https://www.youtube.com/watch?v=O-NGENb6LNg
export const GET = async (req: Request, res: Response) => {
  
  return NextResponse.json({ message: "Hello from the API!" });
};

export const POST = async (req: Request, res: Response) => {
  const body = await req.json();
  if (!body) {
    return NextResponse.json({ message: "no body!" });
  }
  const category = await openai(body.page_title);
  console.log(body.page_title + "-", category);

  return NextResponse.json({ category: category });
};

const openai = async (text: String) => {
  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, // This is also the default, can be omitted
  });

  // New
  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content:
          "You can only reply with one of the following answers: " +
          "['Gaming', 'Politcal News', 'Other'], how would you categorize the following title: '" +
          text +
          "'",
      },
    ],
  });
  return chatCompletion.choices[0].message.content;
};
