import express from "express";
import db from "../utils/db_config";

async function getHomeHandler(req: express.Request, res: express.Response) {
  // Ensure the MongoDB connection is established
  try {
    if (db.readyState !== 1) {
      throw new Error("MongoDB connection not ready");
    }
  } catch (error) {
    console.error(error);
  }
}

export { getHomeHandler };
