import { useState } from "react";
import { fetchData } from "../utils/HttpsRequire";
import CharacterItem from "./CharacterItem";

import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';


function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectSearchType, setSelectSearchType] = useState('');
  const [characterStatus, setCharacterStatus] = useState('');

  const selectSearchTypeHandleChange = (event) => {
    setSelectSearchType(event.target.value);
  };

  const characterStatusHandleChange = (event) => {
    setCharacterStatus(event.target.value);
  };

  const handleFetch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await fetchData("https://rickandmortyapi.com/api/character?page=" + Math.floor(Math.random() * 42));
      setCharacters(data.results);
    } catch (error) {
      alert("Erro ao buscar personagens!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="character-list-wrapper">
      <h3>Lista de Personagens</h3>



      <form className="character-form-options-container">

        <div className="field">
          <FormControl fullWidth>
            <InputLabel id="search-type-label">Selecione o tipo de Pesquisa</InputLabel>
            <Select
              labelId="search-type-label"
              id="select-search-type"
              value={selectSearchType}
              label="Selecione o tipo de Pesquisa"
              onChange={selectSearchTypeHandleChange}
            >
              <MenuItem value={'character'}>Personagem</MenuItem>
              <MenuItem value={"episode"}>Episódio</MenuItem>
              <MenuItem value={"location"}>Localização</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className="field">
          <FormControl fullWidth>
            <TextField id="character-name" label="Nome do Personagem" variant="outlined" />
          </FormControl>
        </div>

        <div className="field">
          <FormControl fullWidth>
            <InputLabel id="character-status-label">Selecione o status do personagem</InputLabel>
          <Select
            labelId="character-status-label"
            id="character-status"
            value={characterStatus}
            label="Selecione o status do personagem"
            onChange={characterStatusHandleChange}
          >
            <MenuItem value={"alive"}>Vivo</MenuItem>
            <MenuItem value={"dead"}>Morto</MenuItem>
            <MenuItem value={"unknown"}>Desconhecido</MenuItem>
          </Select>
          </FormControl>
          
        </div>

        <Button variant="contained" onClick={handleFetch}>Buscar Personagens</Button>
      </form>

      {loading && <p>Carregando...</p>}

      <ul className="character-list" style={{ listStyle: "none", padding: 0 }}>
        {characters.map((p) => (
          <CharacterItem key={p.id} character={p} />
        ))}
      </ul>
    </div>
  );
}

export default CharacterList;
