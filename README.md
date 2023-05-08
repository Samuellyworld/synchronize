## Synchronize

When developing a web application, you may come into scenarios in which the backend has been updated but the frontend has not been updated owing to browser caching. This can lead to application failures and inconsistencies. To synchronize the frontend and backend, one method is to utilize a hash value.

A hash value is a unique identifier that represents the content of a file or an object. By using a hash value, you can ensure that the frontend and backend are synchronized, even if they are cached.

I recently had this issue at my place of work, where the backend is constantly being updated and the end user frontend still has the old cached client files.

Here's a step-by-step method for utilizing a hash value to synchronize client and server:

- if you are using this repo, here is a quick local installation;

- Make sure you have [Node](https://nodejs.org/en/download/) & [Git](https://git-scm.com/downloads) installed in your terminal.

* git clone repository

```
  $ git clone git@github.com:Samuellyworld/synchronize.git
```

- install both client and server

```
 $ npm run install-app
```

- start both in development
```
 $ npm run dev
```

Here is the approach that was used when solving this.

- in the `client` directory, 
A file called `commit-hash.cjs` was created, which uses a package called `git-rev-sync` to generate a unique identifier for the client code based on latest git commit hash.

- This include file include, which write a `txt` file to the `dist` folder when building.

```
const git = require('git-rev-sync');
const fs = require('fs');
const path = require("path")
const commitHash = git.short();

fs.writeFileSync(path.join(__dirname, "dist", 'commit-hash.txt'), commitHash);
```

- This is also included in the `package.json`, which run the file when building the client.

 ```
 "build": "tsc && vite build && node commit-hash.cjs",
 ```

- a `.env` is also created, which should include the latest commit hash after building the client.

```
VITE_APP_COMMIT_HASH=""
```

- in the server directory, a get endpoint called `/hash` was created to send the hash as a request to the client.
here is what the controller looks like, this is technically reading the hash txt file from the client's build and sending it as a request. 

```
export const commitHash = async (req: Request, res : Response) => {
    const commitHash = fs.readFileSync(path.join(__dirname, "..", "..", 'client', 'dist', 'commit-hash.txt'), 'utf-8').trim();
    // send to a response client
    res.status(200).json({
      commitHash 
    })
}
```

- in the client's `app.tsx`, we compare the hash value of `.env` from the client and what the hash the server is responding with.

```
  // get hash from server by sending a request
  useEffect(() => {
    fetch('http://localhost:8000/api/v1/hash')
      .then(response => response.json())
      .then(data => {
        setCommitHash(data?.commitHash);
        console.log(data)
      });
  }, []);

  // check if hash from server is the same with client
  useEffect(() => {
    const localCommitHash = VITE_APP_COMMIT_HASH;
     console.log(localCommitHash)
    if (commitHash && localCommitHash && commitHash !== localCommitHash) {
      alert('A new version of the app is available. Please refresh the page to get the latest version.');
    }
  }, [commitHash]);

  ```

By using a hash value to synchronize the frontend and backend, You can ensure that the most recent version of your application is always served to users by synchronizing the frontend and backend. This method is especially handy if you have a long-term caching strategy in place for frontend assets.


## License

Copyright Synchronize 2023 [**MIT LICENSE**](/LICENSE)



