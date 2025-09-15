import { useEffect, useState } from "react";
import countryService from "../services/countries.js";
import crud from "../services/crud.js";

export const useField = (type, name, placeholder) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onReset = () => {
    setValue("");
  };

  return {
    type,
    name,
    placeholder,
    value,
    onChange,
    onReset,
  };
};

export const useCountry = (initialCountryName) => {
  const [country, setCountry] = useState(null);
  const [countryName, setCountryName] = useState(initialCountryName);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await countryService.getByName(countryName);
        console.log(`fetched country '${countryName}'`, response);
        return response;
      } catch (error) {
        console.log(`error fetching country '${countryName}'`, error);
        return null;
      }
    };
    fetchCountry().then(setCountry);
  }, [countryName]);

  return {
    country,
    setCountryName,
  };
};

export const useResource = (baseUrl, initialToken) => {
  const [token, setToken] = useState(initialToken);

  const getAll = async () => {
    const result = await crud.getAll(baseUrl);
    console.log("got all ", result);
    return result;
  };

  const get = async (id) => {
    return await crud.get(baseUrl, id);
  };

  const create = async (newObject) => {
    return await crud.create(baseUrl, newObject, token);
  };

  const update = async (id, modifiedObject) => {
    return await crud.update(baseUrl, id, modifiedObject, token);
  };

  const deleteId = async (id) => {
    return await crud.deleteId(baseUrl, id, token);
  };

  return {
    setToken,
    getAll,
    get,
    create,
    update,
    deleteId,
  };
};
