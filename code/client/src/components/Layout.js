import { Outlet } from "react-router-dom";

// Outlet component represents all the chilren of the layout component
const Layout = () => {
  return (
    <main className="App">
      <Outlet />
    </main>
  );
};

export default Layout;
