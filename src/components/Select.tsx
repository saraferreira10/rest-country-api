import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

type SelectProps = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

export default function Select({ search, setSearch }: SelectProps) {
  const regions = [
    "All regions",
    "Africa",
    "Americas",
    "Asia",
    "Europe",
    "Oceania",
  ];

  const { theme } = useContext(ThemeContext);

  const bgColor =
    theme === "light" ? "bg-light-mode-bg" : "bg-dark-mode-elements";
  const textColor =
    theme === "light" ? "text-light-mode-text" : "text-dark-mode-elements-text";

  return (
    <select
      name="region"
      id="region"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className={`outline-none w-52 shadow-lg h-14 px-6 mx-6 rounded-lg text-sm font-semibold tracking-wide ${bgColor} ${textColor}`}
    >
      <option value="Filter by Region" disabled hidden>
        Filter by Region
      </option>
      {regions.map((e, idx) => {
        return (
          <option
            value={e}
            key={idx}
            className={`font-semibold tracking-wide text-xs ${bgColor} ${textColor}`}
          >
            {e}
          </option>
        );
      })}
    </select>
  );
}
