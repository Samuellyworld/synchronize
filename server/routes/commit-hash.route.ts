// import relevant module
import express, { Router } from "express";

// import relevant controllers to the route;
import { commitHash } from "../controllers.ts/commit-hash.controller";

// create hash router
export const hashRouter : Router = express.Router();

// hash endpoint
hashRouter.get('/hash', commitHash);
