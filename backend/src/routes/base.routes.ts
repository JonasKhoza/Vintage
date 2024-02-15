import express from "express";
import { getHomeHandler } from "../controllers/base.controllers";

const router = express.Router();

router.get("/", getHomeHandler);

export default router;
