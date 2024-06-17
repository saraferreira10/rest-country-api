import { useContext, useEffect, useState } from "react";
import ListCountry from "../components/ListCountry";
import Search from "../components/Search";
import Select from "../components/Select";
import { Country } from "../components/CountryItem";
import { ThemeContext } from "../context/ThemeContext";

const DEFAULT_REGION_VALUE = "All regions";

export default function Home() {
  const [countrys, setCountrys] = useState<Country[]>([]);
  const [searchByName, setSearchByName] = useState<string>("");
  const [filterByRegion, setFilterByRegion] =
    useState<string>(DEFAULT_REGION_VALUE);
  const [error, setError] = useState<Error | null>();

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    async function fetchAllData() {
      const resp = await fetch("https://restcountries.com/v3.1/all");
      const data = await resp.json();
      console.log(data);
      setCountrys(data);
      setError(null);
    }

    async function fetchByName() {
      try {
        const resp = await fetch(
          `https://restcountries.com/v3.1/name/${searchByName}`
        );

        if (!resp.ok) {
          throw new Error("country dont found");
        }

        const data = await resp.json();

        console.log(data);
        setCountrys(data);
        setError(null);
      } catch (e) {
        setError(e as Error);
        console.error(e);
      }
    }

    if (searchByName.length > 0 && filterByRegion === DEFAULT_REGION_VALUE) {
      fetchByName();
    } else if (
      searchByName.length > 0 &&
      filterByRegion !== DEFAULT_REGION_VALUE
    ) {
      setCountrys((countrys) =>
        countrys.filter((value) => value.name.common.match(searchByName))
      );
    } else {
      fetchAllData();
    }
  }, [searchByName, filterByRegion]);

  return (
    <div className="min-h-screen w-full flex flex-col gap-6 pb-10">
      <Search search={searchByName} setSearch={setSearchByName} />
      <Select search={filterByRegion} setSearch={setFilterByRegion} />
      {error ? (
        <p
          className={`${
            theme === "light"
              ? "text-light-mode-text"
              : "text-dark-mode-elements-text"
          }`}
        >
          {error.message}
        </p>
      ) : (
        <div className="flex flex-col justify-center items-center w-full">
          {filterByRegion !== "All regions" ? (
            <ListCountry
              countrys={countrys.filter(
                (value) => value.region === filterByRegion
              )}
            />
          ) : (
            <ListCountry countrys={countrys} />
          )}
        </div>
      )}
    </div>
  );
}
