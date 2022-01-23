import React, { useContext } from "react";
import { Header } from "./components/Header";
import { motion } from "framer-motion";
import { Outlet, Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import Login from "./routes/login";

export default function App() {
  const { user, setuser } = useContext(UserContext);

  const articles = () => (
    <>
      <Header />
      <div className="w-full flex justify-center">
        <Link className="" to="/articles">
          Articles
        </Link>
      </div>
    </>
  );

  return (
    <>
      {window.location.pathname === "/word-me-up" ? "" : { articles }}
      <Outlet />
    </>
  );
}
