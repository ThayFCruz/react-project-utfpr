import { createContext, useContext, useState } from "react";

const ApiContext = createContext();

export function ApiProvider({ children }) {
  const [type, setType] = useState("character");
  const [data, setData] = useState([]);

  const [filterByName, setFilterByName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [characterPages] = useState(42);
  const [episodePages] = useState(3);
  const [locationPages] = useState(7);

  async function fetchData(selectedType = type, nameFilter = filterByName) {
    try {
      setErrorMessage("");
      setData([]);

      var baseUrl = `https://rickandmortyapi.com/api/${selectedType}`;

      var totalPages = 1;

      if (nameFilter) {
        var searchUrl = `${baseUrl}?name=${nameFilter}`;

      } else {
        if (selectedType === "character") totalPages = characterPages;
        if (selectedType === "episode") totalPages = episodePages;
        if (selectedType === "location") totalPages = locationPages;

        const randomPage = Math.floor(Math.random() * totalPages) + 1;

        var searchUrl = `${baseUrl}?page=${randomPage}`;
      }

      const response = await fetch(searchUrl);

      if (!response.ok) {
        if (response.status == 404) {
          throw new Error("Nenhum resultado encontrado para sua busca.");
        } else {
          throw new Error("Ocorreu um erro ao buscar os dados.");
        }
      }

      const json = await response.json();

      setData(json.results || []);
    } catch (error) {

      setErrorMessage(error.message || "Erro inesperado ao buscar dados.");
      console.error("Erro ao buscar dados:", error);
      setData([]);
    }
  }

  return (
    <ApiContext.Provider value={{ type, setType, data, fetchData, filterByName, setFilterByName, errorMessage }}>
      {children}
    </ApiContext.Provider>
  );
}

export function useApi() {
  return useContext(ApiContext);
}
