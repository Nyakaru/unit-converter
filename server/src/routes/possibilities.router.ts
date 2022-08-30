import express from "express";
import convert, { Measure } from "convert-units";

const router = express.Router();

router.get("/", async (req, res) => {
    const response = convert().list(req.query.unit as Measure)
    return res.send(response);
  });

export default router;
