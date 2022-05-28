import logo from './logo.svg';
import './App.css';
import {Table} from './Table';
import {Chart} from './Chart';
import { BrowserRouter,Route,Routes,NavLink } from 'react-router-dom';



function App() {
  return (
    <BrowserRouter>
      <div className="App container">
        <h3 className="d-flex justify-content-center m-3">
          DASHBOARD
        </h3>

        <nav className="navbar navbar-expand-sm bg-light navbar-dark">
          <ul className="navbar-nav">
            <li className="nav-item- m-1">
                <NavLink className="btn btn-light btn-outline-primary" to="/table">
                  Table
                 </NavLink>
            </li>
            <li className="nav-item- m-1">
                <NavLink className="btn btn-light btn-outline-primary" to="/chart">
                  Chart
                </NavLink>
            </li>
          </ul>
        </nav>

      <Routes>
        <Route path='/table' element={<Table/>}/>
        <Route path='/chart' element={<Chart/>}/>
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
