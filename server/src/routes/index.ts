import express from "express";
// @local
import PossibilityRouter from "./possibilities.router";
import ConversionRouter from "./conversions.router";
import MeasureRouter from "./measures.router";

const router = express.Router();

router.use("/possibilities", PossibilityRouter);
router.use("/conversion", ConversionRouter);
router.use("/measures", MeasureRouter);

export default router;
