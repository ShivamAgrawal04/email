import express from "express";
import { trackerMail, trackerrMail, trackMail } from "./mail.controller.js";

const router = express.Router();

router.post("/sendMail", trackerMail);
router.get("/track-mail/:id", trackMail);
router.get("/get-mail-status/:id", trackerrMail);
export default router;
