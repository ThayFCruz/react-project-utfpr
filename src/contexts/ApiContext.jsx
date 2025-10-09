// src/contexts/ApiContext.jsx
import { createContext, useContext, useState } from "react";

const ApiContext = createContext();

export function ApiProvider({ children }) {
  const [type, setType] = useState("character"); // padrão inicial
  const [data, setData] = useState([]);

  const characterPages = 42; 

  async function fetchData(selectedType = type) {
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/${selectedType}`);
      const json = await response.json();

      // results para character/episode, mas location usa o mesmo formato
      setData(json.results || []);

      console.log(json.results);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  }

  return (
    <ApiContext.Provider value={{ type, setType, data, fetchData }}>
      {children}
    </ApiContext.Provider>
  );
}

// Hook customizado pra facilitar o uso
export function useApi() {
  return useContext(ApiContext);
}
