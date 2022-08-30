import express from "express";
// @local
import PossibilityRouter from "./possibilities.router";
import ConversionRouter from "./conversions.router";

const router = express.Router();

router.use("/possibilities", PossibilityRouter);
router.use("/conversion", ConversionRouter);

export default router;
