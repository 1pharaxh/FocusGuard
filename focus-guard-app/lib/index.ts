import OpenAI from "openai";

import { MongoClient, Db, Collection } from "mongodb";

const uri = process.env.NEXT_PUBLIC_MONGODB_URI; // Connection string from MongoDB Atlas

let cachedDb: MongoClient;
// DONE✅ Function that connects to the database and returns the cached database connection
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
let lastCall = 0;

// DONE✅ This is the function that gets a string and returns the category of the string, accepts text and categories array
export async function SendToAI(
  text: String,
  categories: String[]
): Promise<string> {
  const now = Date.now();
  if (now - lastCall < 20000) {
    console.log("Waiting for 20 seconds before next call...");
    await new Promise((resolve) =>
      setTimeout(resolve, 10000 - (now - lastCall))
    );
  }

  lastCall = Date.now();

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
          "You can only reply with one of the following answers, Never reply with any other answer apart from these: " +
          JSON.stringify(categories) +
          ", how would you categorize the following title: '" +
          text +
          "'",
      },
    ],
  });
  console.log(
    "MESSAGE: got AI response",
    text + " - " + chatCompletion.choices[0].message.content
  );
  return chatCompletion.choices[0].message.content !== null
    ? chatCompletion.choices[0].message.content
    : "Others";
}

// DONE✅ Responsible for checking if collection of user Id exists, if it does, then return collection else create collection and return the new one
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

// DONE✅ This is the function that accepts, userId: a string, categories: a list of strings, and replaces the current categories and adds the new categories
// to the end of all categories.
export async function EditCategories(userId: any, categories: string[]) {
  const collection = await CheckIfCollectionExists(userId);
  // AllCategories would get the new categories appended to it AND categories would be set to the new categories AND Others would be pushed to the end
  const doc = await collection.findOne();
  const AllCategories = doc?.AllCategories;
  let CurrentCategories = categories;
  if (categories.length === 0) {
    CurrentCategories = ["Others"];
  }
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

// DONE✅ This is the function that accepts, userId: a string, page_title: a string, categories: a list of strings, and URL: a string
// It then adds the page_title, categories, and URL to the database
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

  // add the document to the collection and wait for it to finish
  await collection.insertOne(document);
}

// DONE✅ This is function that accepts, userId: a string, page_title: a string, and URL: a string
// It then checks the database for the page_title, if it exists, then it checks if the category of the page_title is in
// the current categories, if it is, then it returns the category else it sends the page_title to the AI and gets a category for the title
// and adds the page_title, category, and URL to the database and returns the category
export async function AddToDatabase(
  userId: any,
  page_title: string,
  url: string
): Promise<string> {
  const collection = await CheckIfCollectionExists(userId);
  // Find the document with the given url,  sort it by latest date, and limit it to 1
  // Check if the data already exists in the database
  const existingDoc: any = await collection
    .find({ url: url })
    .sort({ date: -1 })
    .limit(1)
    .toArray();

  const doc_template: any = await collection.findOne({
    CurrentCategories: { $exists: true },
    AllCategories: { $exists: true },
  });
  // If the document is found
  if (existingDoc.length > 0) {
    console.log("MESSAGE: found document");
    // If the document has the category in the current categories, then return the category
    if (doc_template.CurrentCategories.includes(existingDoc[0].category)) {
      console.log(
        "MESSAGE: found document CATEGORY, RETURNING ",
        existingDoc[0].category
      );
      return existingDoc[0].category;
    } else {
      console.log(
        "MESSAGE: DID NOT FIND document CATEGORY -",
        doc_template.CurrentCategories,
        existingDoc[0].category
      );
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
      console.log("MESSAGE: ADDED TO DATABASE, RETURNING CATEGORY ", category);
      return category;
    }
  } else {
    console.log("MESSAGE: DID NOT FIND URL");
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
    return category;
  }
}

// DONE✅ This is the function that accepts, userId: a string, and returns all the documents in the collection
// except for the one with 'CurrentCategories' and 'AllCategories'
export async function GetData(userId: string) {
  const collection = await CheckIfCollectionExists(userId);

  // send all the documents in the collection except for the one with 'CurrentCategories' and 'AllCategories'
  const documents = await collection
    .find({
      $nor: [
        { CurrentCategories: { $exists: true } },
        { AllCategories: { $exists: true } },
      ],
    })
    .toArray();

  return documents;
}

// DONE✅ function is responsbile for checking if categories exist for a user, in database, if they do, then return true, else return false
export async function CheckIfCategoriesExist(userId: string) {
  const collection = await CheckIfCollectionExists(userId);
  const doc = await collection.findOne({
    CurrentCategories: { $exists: true },
    AllCategories: { $exists: true },
  });

  if (
    doc &&
    doc.userId &&
    doc.CurrentCategories &&
    doc.AllCategories &&
    doc.AllCategories.length > 1
  ) {
    return true;
  } else {
    return false;
  }
}

// DONE✅ this function is responsbile for getting the current categories of a user
export async function GetCurrentCategories(
  userId: string
): Promise<{ categories: string[]; updateOn: Date } | []> {
  const collection = await CheckIfCollectionExists(userId);
  const doc = await collection.findOne({
    CurrentCategories: { $exists: true },
    AllCategories: { $exists: true },
  });
  if (doc && doc.CurrentCategories) {
    return { categories: doc.CurrentCategories, updateOn: doc.updatedOn };
  } else {
    return [];
  }
}
// This function finds all the document for current user for given date and returns the documents in an array and also returns how many documents had
// category as 'Others' and how many documents had category not as 'Others'
export async function GetDocumentsForDate(userId: string, date: Date) {
  const collection = await CheckIfCollectionExists(userId);
  // get all documents IGNORE DATE FOR NOW
  const documents = await collection.find().toArray();
  let others = 0;
  let notOthers = 0;
  documents.forEach((document) => {
    if (document.category === "Others") {
      others++;
    } else {
      notOthers++;
    }
  });
  return {
    others: others,
    notOthers: notOthers,
  };
}

export async function calculateProductivityScore(userId: string) {
  const db = await connectToDatabase();
  const database = db.db("data");
  const collection = database.collection(userId);
  try {
    const productivityScores: { date: string; score: number }[] = [];

    let dates = await collection
      .aggregate([
        {
          $group: {
            _id: {
              $dateToString: { format: "%Y-%m-%d", date: "$date" },
            },
          },
        },
      ])
      .toArray(); // get all distinct dates

    dates = dates.filter((date: any) => date._id !== null); // remove null dates

    dates = dates.map((date: any) => ({ _id: new Date(date._id) })); // convert date strings to Date objects
    dates.sort(
      // @ts-ignore
      (a: { _id: Date }, b: { _id: Date }) => a._id.getTime() - b._id.getTime()
    ); // sort dates in ascending order

    for (let i = 0; i < Math.min(7, dates.length); i++) {
      const date = new Date(dates[i]._id);

      // Query the collection for documents within the date range
      // gteDate should be todays date
      new Date(date.setHours(0, 0, 0, 0));
      new Date(date.setDate(date.getDate() + 1));
      const documents = await collection
        .find({
          date: {
            $gte: new Date(date.setHours(0, 0, 0, 0)),
            // add one day to the date
            $lt: new Date(date.setDate(date.getDate() + 1)),
          },
        })
        .toArray();

      const totalTabs = documents.length;
      const otherTabs = documents.filter(
        (doc: any) => doc.category === "Others"
      ).length;

      let score =
        totalTabs > 0
          ? (otherTabs / totalTabs) * 100 === 0
            ? 100
            : (otherTabs / totalTabs) * 100
          : 0;

      score = Math.round(score * 100) / 100;
      productivityScores.push({ date: dates[i]._id, score });
    }
    return {
      productivityScore_Card: productivityScores.map((item) => item.score),
      productivityScore_Expanded: productivityScores,
    };
  } catch (error) {
    console.error("Error occurred:", error);
  }
}
