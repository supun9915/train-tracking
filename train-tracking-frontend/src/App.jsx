import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <Router>
        <Routes>
          <Route path="/page/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Login />} />
            <Route path="/page/landing" element={<Landing />} />
            <Route path="/page/store" element={<Store />} />
            <Route path="/page/account" element={<Account />} />
            <Route path="/page/shuttle" element={<Shuttle />} />
            <Route path="/page/schedule" element={<Schedule />} />
            <Route path="/page/inbox" element={<Inbox />} />
            <Route path="/page/unauthorized" element={<Unauthorized />} />
            <Route
              path="page/unauthorized/access"
              element={<UnauthorizedAccess />}
            />
          </Route>
        </Routes>
      </Router> */}
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
