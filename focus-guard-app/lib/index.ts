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

  // Find a collection of userId, if it does not exist, then create it, else return
  const collection = database.collection(userId);

  // Check if collection has any document in it
  const doc = await collection.findOne();
  if (doc) {
    return collection;
  } else {
    // Create a collection
    await database.createCollection(userId);
    const document = {
      userId: userId,
      CurrentCategories: ["Others"],
      AllCategories: ["Others"],
      updatedOn: new Date(),
    };

    // Add the document to the collection
    const collectionNew = database.collection(userId);
    await collectionNew.insertOne(document);
    return collectionNew;
  }
}

export async function EditCategories(userId: any, categories: string[]) {
  const collection = await CheckIfCollectionExists(userId);
  // AllCategories would get the new categories appended to it AND categories would be set to the new categories AND Others would be pushed to the end
  const doc = await collection.findOne();
  const AllCategories = doc?.AllCategories;
  let CurrentCategories = categories;
  CurrentCategories.push("Others");
  const Others = AllCategories?.filter(
    (category: string) => !CurrentCategories.includes(category)
  );
  const newCategories = CurrentCategories.concat(Others);

  const document = {
    userId: userId,
    CurrentCategories: CurrentCategories,
    AllCategories: newCategories,
    updatedOn: new Date(),
  };

  // Replace the existing document
  await collection.updateOne({ userId: userId }, { $set: document });

  return document;
}

// This is function that accepts, userId: a string, page_title: a string, category: a list of strings
export async function AddToDatabase(
  userId: any,
  page_title: string,
  url: string,
  categories: string[]
): Promise<string> {
  const collection = await CheckIfCollectionExists(userId);
  // Find the document with the given page title, sorted by date
  const doc: any = await collection
    .find({ page_title: page_title })
    .sort({ date: -1 })
    .limit(1)
    .toArray();

  const doc_template: any = await collection.findOne({});

  // If the document is found
  if (doc.length > 0) {
    console.log(doc);
    console.log("Document found");

    // Compare the 'CurrentCategories' from the document with the 'categories' array
    const match = doc_template.CurrentCategories.some((category: any) =>
      categories.includes(category)
    );
    // If a match is found, return 'BLOCK', else return 'ALLOW'
    return match ? "BLOCK" : "ALLOW";
  } else {
    const categories = doc_template.CurrentCategories;
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
