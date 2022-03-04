import React, { useEffect, useRef, useState } from 'react';
import './App.scss';
import Card from './Card';
import ReplyUs from './ReplyUs';

import {
  BrowserRouter as Router,
  Switch,
  Routes,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

function App() {
  useEffect(() => {

  }, []);


  return (
    <div className="App">
      <Router>
        <div>
          {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/ReplyUs">Reply Us</Link>
            </li>

          </ul>
        </nav> */}

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Routes>
          <Route path="replyUs" element={<ReplyUs />} />

            <Route path="/" element={<Card />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
