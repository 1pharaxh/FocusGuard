// External Dependencies
import * as mongoDB from "mongodb";

// Global Variables
export const collections: { games?: mongoDB.Collection } = {}

// Initialize Connection
export async function connectToDatabase () {

    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.NEXT_PUBLIC_DB_CONN_STRING);
    await client.connect();
        
    const db: mongoDB.Db = client.db(process.env.DB_NAME);

    const gamesCollection: mongoDB.Collection = db.collection(process.env.NEXT_PUBLIC_GAMES_COLLECTION_NAME);
 
    collections.games = gamesCollection;
       
    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${gamesCollection.collectionName}`);
 }