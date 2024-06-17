import CountryItem, { Country } from "./CountryItem";

type ListCountryProps = {
  countrys: Country[];
};

export default function ListCountry({ countrys }: ListCountryProps) {
  return (
    <div className="flex flex-col gap-9 w-full px-6">
      {countrys.map((c) => (
        <CountryItem country={c} key={c.name.common} />
      ))}
    </div>
  );
}
