import { Routes, Route, Outlet, Link } from "react-router-dom";
import { CheckName } from './pages/CheckName';
import { Home } from './pages/Home';
import { CheckUserInformation } from './pages/CheckUserInformation';

export default function App() {
  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="check-name" element={<CheckName />} />
          <Route path="check-user-information" element={<CheckUserInformation />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
  );
}

function Layout() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/check-name">Check Name</Link>
          </li>
          <li>
            <Link to="/check-user-information">Check user information</Link>
          </li>
        </ul>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
}




function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}