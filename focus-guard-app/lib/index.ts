import OpenAI from "openai";

import { MongoClient } from "mongodb";

const uri = process.env.NEXT_PUBLIC_MONGODB_URI; // Connection string from MongoDB Atlas

let cachedDb: MongoClient;
// Function that connects to the database and returns the cached database connection
export async function connectToDatabase() {
  if (!uri) {
    throw new Error("Please define the MONGODB_URI environment variable");
  }

  if (cachedDb) {
    return cachedDb;
  }

  const client = await MongoClient.connect(uri);

  cachedDb = client;
  console.log("Connected to MongoDB");
  return cachedDb;
}

// This is the function that gets a string and returns the category of the string
export async function SendToAI(text: String, categories: String[]) {
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
          JSON.stringify(categories) +
          ", how would you categorize the following title: '" +
          text +
          "'",
      },
    ],
  });
  return chatCompletion.choices[0].message.content;
}

// This is function that accepts, userId: a string, page_title: a string, category: a list of strings
export async function AddToDatabase(
  userId: string,
  page_title: string,
  categories: string[]
) {
  // go into database "data"
  const db = await connectToDatabase();
  const database = db.db("data");
  // find a collection that is userId
  const collection = database.collection(userId);
  // check if collection exists
  const exsits = await collection.findOne({ userId: userId });
  if (exsits) {
    console.log("Collection exists");
  } else {
    console.log("Collection does not exist");
  }
}
