export default function Select() {
  const regions = [
    "Filter by Region",
    "Africa",
    "America",
    "Asia",
    "Europe",
    "Oceania",
  ];

  return (
    <select
      name="region"
      id="region"
      className="outline-none w-1/2 shadow-lg h-14 px-6 mx-6 text-light-mode-text text-sm font-semibold tracking-wide"
    >
      {regions.map((e, idx) => {
        return (
          <option
            value={e}
            key={idx}
            className="text-light-mode-text text-sm font-semibold tracking-wide"
          >
            {e}
          </option>
        );
      })}
    </select>
  );
}
