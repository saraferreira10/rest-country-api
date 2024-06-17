import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";

export type Country = {
  name: {
    common: string;
    nativeName: { [key: string]: { common: string; official: string } };
  };
  languages: { [key: string]: string };
  currencies: { [key: string]: { name: string; symbol: string } };
  flag: string;
  borders: string[];
  capital: string[];
  flags: { png: string };
  region: string;
  population: number;
  subregion: string;
};

type CountryProps = {
  country: Country;
};

export default function CountryItem({ country }: CountryProps) {
  const { name, capital, flags, region, population } = country;

  const { theme } = useContext(ThemeContext);

  const textColor =
    theme === "light" ? "text-light-mode-text" : "text-dark-mode-elements-text";
  const cardColor = theme === "light" ? "" : "bg-dark-mode-elements";
  const borderColor =
    theme === "light" ? "border-light-mode-bg" : "border-dark-mode-elements";

  const navigate = useNavigate();

  const bgStyle = {
    backgroundImage: `url('${flags.png}')`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };

  function updateCountryName(name: string): string {
    return name.length > 25 ? name.substring(0, 25) + "..." : name;
  }

  return (
    <div
      onClick={() => navigate(`/countrys/${country.name.common}`)}
      className={`rounded-lg text-justify ${textColor} ${cardColor} ${borderColor} shadow-lg  flex flex-col gap-6 border-8 pb-8`}
    >
      <div
        className="h-36 w-full rounded-t-lg border-b border-b-light-mode-input"
        style={bgStyle}
      ></div>
      <div className="flex flex-col gap-6 px-7">
        <b className="font-bold text-lg">{updateCountryName(name.common)}</b>
        <ul className="">
          <li>
            <span className="font-medium">Population:</span> {population}
          </li>
          <li>
            <span className="font-medium">Region: </span>
            {region}
          </li>
          <li>
            <span className="font-medium">Capital: </span>
            {capital}
          </li>
        </ul>
      </div>
    </div>
  );
}
