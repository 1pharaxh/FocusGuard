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
    // check for the page_title and get the recent most documents with page_title
    // if page title don't exist, add it to database, follow the steps
    //          1. get the category from AI
    //          2. if the category is Others, add a key value pair allowed: true, else add allowed: false
    //          3. add a date key value pair, for sorting the query by latest date
    //          4. add a key value pair page_title: page_title
    //          5. add a key value pair categories: categories
    //          6. add a key value pair category : category
    //          7. add a key value pair userId: userId
  } else {
    // if it does not exist, create a new collection
    //          1. create a new collection with userId

    //          2. add a document to it
    //          1. get the category from AI
    //          2. if the category is Others, add a key value pair allowed: true, else add allowed: false
    //          3. add a date key value pair, for sorting the query by latest date
    //          4. add a key value pair page_title: page_title
    //          5. add a key value pair categories: categories
    //          6. add a key value pair category : category
    //          7. add a key value pair userId: userId
    console.log("Collection does not exist");
  }
}

export async function AddDataToDocument(
  userId: string,
  page_title: string,
  categories: string[],
  url: string,
  category: string
) {
  const db = await connectToDatabase();
  const database = db.db("data");
  const collection = database.collection(userId);
  // construct the document
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
