import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
const VITE_APP_COMMIT_HASH = import.meta.env.VITE_APP_COMMIT_HASH

function App() {
  const [count, setCount] = useState(0);

  // set commit hash
  const [commitHash, setCommitHash]  = useState(null);

  // get hash from server
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

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
