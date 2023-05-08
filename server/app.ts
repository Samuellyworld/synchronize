// import relevant modules;
import express, {Response, Request} from "express";
import cors from "cors";
import morgan from "morgan";

// import routes
import { hashRouter } from "./routes/commit-hash.route";

// start an express server;
export const app = express();

// middlewares;
app.use(express.json());
app.use(morgan("combined"));
app.use(cors());

// start route
app.get("/", (req : Request, res : Response) => {
    res.json("test server is starting 🎈");
});

// commit hash route endpoint
app.use('/api/v1', hashRouter);