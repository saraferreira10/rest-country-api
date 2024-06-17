import { Link, useParams } from "react-router-dom";
import { Country } from "../components/CountryItem";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function CardDetails() {
  const { name } = useParams();
  const [country, setCountry] = useState<Country>();
  const [error, setError] = useState<Error>();

  const { theme } = useContext(ThemeContext);

  const textColor =
    theme === "light" ? "text-light-mode-text" : "text-dark-mode-elements-text";

  useEffect(() => {
    async function fetchData() {
      try {
        const resp = await fetch(
          `https://restcountries.com/v3.1/name/${name}?fullText=true`
        );

        if (!resp.ok) {
          throw new Error("Country not found");
        }

        const data = await resp.json();

        if (data.length === 0) {
          throw new Error("Country not found");
        }

        setCountry(data[0]);
        console.log(data[0]);
      } catch (error) {
        setError(error as Error);
        console.log(error);
      }
    }

    fetchData();
  }, [name]);

  if (error) {
    return <div>{error.message}</div>; // Renderizar a mensagem de erro
  }

  if (country === null) {
    return <div>Loading...</div>; // Renderizar um estado de carregamento enquanto a API é chamada
  }

  const firstKeyName = country?.name.nativeName
    ? Object.keys(country?.name.nativeName)[0]
    : "";

  const firstValueName = country?.name.nativeName
    ? country.name.nativeName[firstKeyName]
    : { common: "", official: "" };

  return (
    <div
      className={`${textColor} text-justify flex flex-col justify-center px-6 gap-11 pb-12`}
    >
      <div>
        <Link
          to={"/"}
          className={`px-8 py-3 shadow-xl ${
            theme === "light" ? "bg-light-mode-bg" : "bg-dark-mode-elements"
          } `}
        >
          {"<- Back"}
        </Link>
      </div>
      <div className="flex flex-col gap-5">
        <div>
          <img
            src={country?.flags.png}
            alt={country?.name.common}
            width={"400px"}
          />
        </div>
        <div className="flex flex-col gap-10">
          <div>
            <h1 className="text-2xl font-bold">{country?.name.common}</h1>
          </div>
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <p>
                <b>Native name: </b>
                {firstValueName.common}
              </p>
              <p>
                <b>Population: </b>
                {country?.population?.toLocaleString("en-US")}
              </p>
              <p>
                <b>Region: </b>
                {country?.region}
              </p>
              <p>
                <b>Sub region: </b>
                {country?.subregion}
              </p>
              <p>
                <b>Capital: </b>
                {country?.capital}
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <p>
                <b>Top level domain: </b>
                {country?.flag}
              </p>
              <p>
                <b>Currencies: </b>
                {country?.currencies
                  ? Object.entries(country.currencies)
                      .map(([, value]) => `${value.name} (${value.symbol})`)
                      .join(", ")
                  : ""}
              </p>
              <p>
                <b>Languages: </b>
                {country?.languages
                  ? Object.entries(country.languages)
                      .map(([, value]) => `${value}`)
                      .join(", ")
                  : ""}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {country?.borders && <b>Border Countrys:</b>}
            <div className="flex flex-wrap gap-3 justify-start items-center">
              {country?.borders
                ? country?.borders.map((item, idx) => (
                    <p
                      key={idx}
                      className={`px-8 py-2 text-xs shadow-xl ${
                        theme === "light"
                          ? "bg-light-mode-bg"
                          : "bg-dark-mode-elements"
                      } `}
                    >
                      {item}
                    </p>
                  ))
                : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
