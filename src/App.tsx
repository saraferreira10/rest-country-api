import { useEffect, useState } from "react";
import "./App.css";
import Menu from "./components/Menu";
import Search from "./components/Search";
import Select from "./components/Select";

export default function App() {
  const [countrys, setCountrys] = useState<
    {
      name: { common: string };
      flags: { png: string };
    }[]
  >([]);

  useEffect(() => {
    async function fetchData() {
      const resp = await fetch("https://restcountries.com/v3.1/all");
      const data = await resp.json();
      setCountrys(data.slice(0, 9));
    }

    fetchData();
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col gap-6">
      <Menu />
      <Search />
      <Select />

      <div className="flex flex-col justify-center items-center w-full">
        {countrys.map((c) => (
          <li key={c.name.common}>
            {c.name.common}
            <img src={c.flags.png} />
          </li>
        ))}
      </div>
    </div>
  );
}
