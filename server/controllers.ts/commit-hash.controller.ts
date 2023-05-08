// import relevant module;
import { Response, Request } from "express";
import fs from 'fs';
import path from "path";

// commit hash controller
export const commitHash = async (req: Request, res : Response) => {
    const commitHash = fs.readFileSync(path.join(__dirname, "..", "..", 'client', 'dist', 'commit-hash.txt'), 'utf-8').trim();
    // send to client
    res.status(200).json({
      commitHash 
    })
}