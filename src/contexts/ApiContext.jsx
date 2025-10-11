import { createContext, useContext, useState } from "react";

const ApiContext = createContext();

export function ApiProvider({ children }) {
  const [type, setType] = useState("character");
  const [data, setData] = useState([]);


  // const [searchUrl, setSearchUrl] = useState("https://rickandmortyapi.com/api/");
  const [characterPages, setCharacterPages] = useState(42);
  const [episodePages, setEpisodePages] = useState(3);
  const [locationPages, setLocationPages] = useState(7);

  async function fetchData(selectedType = type) {
    try {
      // limpa os dados antes de carregar novos
      setData([]);

      var searchUrl = "https://rickandmortyapi.com/api/"

      if(selectedType === "character"){
        searchUrl = searchUrl + `${selectedType}?page=` + Math.floor(Math.random() * 42);
      }

      if(selectedType === "episode"){
        searchUrl = searchUrl + `${selectedType}?page=` + Math.floor(Math.random() * 3);
      }

      if(selectedType === "location"){
        searchUrl = searchUrl + `${selectedType}?page=` + Math.floor(Math.random() * 7);
      }


      const response = await fetch(searchUrl);
      const json = await response.json();

      setData(json.results || []);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      setData([]); // evita ficar com dados quebrados
    }
  }

  return (
    <ApiContext.Provider value={{ type, setType, data, fetchData }}>
      {children}
    </ApiContext.Provider>
  );
}

export function useApi() {
  return useContext(ApiContext);
}
