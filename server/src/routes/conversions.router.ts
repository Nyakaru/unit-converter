import express from "express";
import convert, { Unit } from "convert-units";

const router = express.Router();

router.get("/", async (req, res) => {
    
    const response = convert(Number(req.query.number)).from(req.query.fromUnit as Unit).to(req.query.toUnit as Unit)
    return res.send({
      value: response
    });
  });

export default router;
