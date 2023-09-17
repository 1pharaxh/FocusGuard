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
export async function SendToAI(
  text: String,
  categories: String[]
): Promise<string> {
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
  return chatCompletion.choices[0].message.content !== null
    ? chatCompletion.choices[0].message.content
    : "Others";
}

// Responsible for checking if collection of user Id exists, if it does, then reutnr collection else create collection and return the new one
export async function CheckIfCollectionExists(userId: any) {
  const db = await connectToDatabase();
  const database = db.db("data");
  // find a collection of userId, // if it does not exists, then create it, else return
  const collection = database.collection(userId);
  // check if collection has any document in it
  const doc = await collection.findOne();
  if (doc) {
    console.log("Collection exists");
    return collection;
  } else {
    // create a collection
    database.createCollection(userId);
    const document = {
      userId: userId,
      CurrentCategories: ["Others"],
      AllCategories: ["Others"],
      updatedOn: new Date(),
    };
    // add the document to the collection
    const collectionNew = database.collection(userId);
    collectionNew.insertOne(document);
    return collectionNew;
  }
}

// This is function that accepts, userId: a string, page_title: a string, category: a list of strings
export async function AddToDatabase(
  userId: any,
  page_title: string,
  url: string,
  categories: string[]
): Promise<string> {
  const collection = await CheckIfCollectionExists(userId);
  // find the page title document sort by date, get the latest one
  // Find the document with the given page title, sorted by date
  const doc: any = collection
    .find({ page_title: page_title })
    .sort({ date: -1 })
    .limit(1)
    .toArray();
  // If the document is found
  if (doc) {
    // Compare the 'CurrentCategories' from the document with the 'categories' array
    const match = doc.CurrentCategories.some((category: any) =>
      categories.includes(category)
    );
    // If a match is found, return 'BLOCK', else return 'ALLOW'
    return match ? "BLOCK" : "ALLOW";
  } else {
    const categories = doc.CurrentCategories;
    const category = await SendToAI(page_title, categories);
    AddDataToDocument(
      userId,
      page_title,
      categories,
      url,
      category,
      collection
    );
    return category === "Others" ? "ALLOW" : "BLOCK";
  }
}

export async function AddDataToDocument(
  userId: string,
  page_title: string,
  categories: string[],
  url: string,
  category: string,
  collection: any
) {
  const document = {
    allowed: category === "Others" ? true : false,
    date: new Date(),
    page_title: page_title,
    categories: categories,
    category: category,
    userId: userId,
    url: url,
  };

  // add the document to the collection
  collection.insertOne(document);
}
