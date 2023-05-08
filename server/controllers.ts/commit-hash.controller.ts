// import relevant module;
import { Response, Request } from "express";
import fs from 'fs';
import path from "path";

// commit hash
export const commitHash = async (req: Request, res : Response) => {
    const commitHash = fs.readFileSync(path.join(__dirname, 'client', 'build', 'commit-hash.txt'), 'utf-8').trim();
    // send to client
    res.status(200).json({
      commitHash 
    })
}