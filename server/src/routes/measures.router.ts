import express from "express";
import convert from "convert-units";

const router = express.Router();

router.get("/", async (req, res) => {
    const response = convert().measures();
    return res.send(response);
  });

export default router;
