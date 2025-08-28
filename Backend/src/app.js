import express from "express";
import { router } from "./router/router.js";
import cors from "cors";

import { swaggerDocs } from "./swagger/swagger.js";

const app = express();

swaggerDocs(app);

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", router);

export { app };
