import express, { Application } from "express";
import cors from "cors";
// @local
import Router from "./routes";

const PORT = process.env.PORT || 5000;

const app: Application = express();

app.use(cors()); // not having cors enabled will cause an access control error
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use(Router);

app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
});
