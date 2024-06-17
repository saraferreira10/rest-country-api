import { useContext } from "react";
import "./App.css";
import Menu from "./components/Menu";
import { ThemeContext } from "./context/ThemeContext";
import { Outlet } from "react-router-dom";

export default function App() {
  const { theme } = useContext(ThemeContext);
  const bgColor = theme === "light" ? "bg-light-mode-bg" : "bg-dark-mode-bg";

  return (
    <div className={`min-h-screen w-full flex flex-col gap-6 ${bgColor}`}>
      <Menu />
      <Outlet />
    </div>
  );
}
