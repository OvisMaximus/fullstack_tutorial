import { useEffect, useState } from "react";
import countryService from "../services/countries.js";
import { useCountry } from "../hooks/index.js";

const SelectionInput = ({ countryName, setCountryName }) => {
  const handleInput = (event) => {
    setCountryName(event.target.value);
  };

  const defaultCountry = countryName || "";

  return (
    <div>
      find countries:{" "}
      <input defaultValue={defaultCountry} onChange={handleInput} />
    </div>
  );
};
const Flag = ({ flag }) => {
  return <img src={flag.png} alt={flag.alt} width="200" />;
};
const CountryDescription = ({ country }) => {
  if (!country) {
    return null;
  }
  const languages = country.languages;
  return (
    <div>
      <h1>{country.name.official}</h1>
      Capital {country.capital.join(", ")} <br />
      area {country.area} km2
      <h2>Languages</h2>
      <ul>
        {Object.keys(languages).map((languageKey) => (
          <li key={languageKey}>{languages[languageKey]}</li>
        ))}
      </ul>
      <Flag flag={country.flags} />
    </div>
  );
};

const CandidateList = ({ countryNames, setSelectedCountry }) => {
  if (countryNames === null || countryNames.length === 1) return null;

  if (countryNames.length === 0) {
    return <div>No matches</div>;
  }

  if (countryNames.length < 11) {
    return (
      <div>
        {countryNames.map((name) => (
          <div key={name}>
            {name} &nbsp; &nbsp; &nbsp;
            <button onClick={() => setSelectedCountry(name)}>show</button>
            <br />
          </div>
        ))}
      </div>
    );
  }

  return <div>Too many matches, specify another filter</div>;
};

const CountryInfo = () => {
  const [searchName, setSearchName] = useState(null);
  const [countryNames, setCountryNames] = useState(null);
  const [candidates, setCandidates] = useState(null);
  const country = useCountry(null);

  const fetchCountries = () => {
    console.log("fetch countries");
    countryService.getAll().then((countries) => {
      console.log("countries fetched, total: ", countries.length, "");
      const commonNames = countries.map((country) => country.name.common);
      setCountryNames(commonNames);
    });
  };
  const updateCandidates = () => {
    const searchString = searchName ? searchName.toLowerCase() : "";
    const matchingCountries = countryNames
      ? countryNames.filter((countryName) =>
          countryName.toLowerCase().includes(searchString),
        )
      : null;
    setCandidates(matchingCountries);
    if (matchingCountries && matchingCountries.length === 1) {
      country.setCountryName(matchingCountries[0]);
    } else {
      country.setCountryName(null);
    }
  };

  useEffect(fetchCountries, []);
  useEffect(updateCandidates, [searchName, countryNames]);

  return (
    <div>
      <h1>Country Info</h1>
      <SelectionInput countryName={searchName} setCountryName={setSearchName} />
      <CandidateList
        countryNames={candidates}
        setSelectedCountry={country.setCountryName}
      />
      <CountryDescription country={country.country} />
    </div>
  );
};

export default CountryInfo;
