import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

type SearchProps = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

export default function Search({ search, setSearch }: SearchProps) {
  const { theme } = useContext(ThemeContext);

  const bgSearchColor =
    theme === "light" ? "bg-light-mode-bg" : "bg-dark-mode-elements";

  return (
    <div className="w-full px-6">
      <div
        className={`w-full flex justify-center items-center shadow-md rounded-lg text-light-mode-input ${bgSearchColor}`}
      >
        <div className="w-1/5 h-full rounded-l-lg flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            height={"15px"}
            fill={theme === "light" ? "#000000" : "#ffffff"}
          >
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
          </svg>
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for a country..."
          className={`w-4/5 py-4 outline-none rounded-r-lg ${bgSearchColor}`}
        />
      </div>
    </div>
  );
}
