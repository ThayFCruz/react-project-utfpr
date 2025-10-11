import { useApi } from "../contexts/ApiContext";
import { useState } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select, Typography, Button, TextField } from "@mui/material";

export default function SearchForm() {
  const { type, setType, fetchData, loading } = useApi();

  const [selectSearchType, setSelectSearchType] = useState('');

  const [filterByName, setFilterByName] = useState();

  const handleFilterByName = (e) => {
    setFilterByName(e.target.value);
  }

  const handleSearch = () => {
    setType(selectSearchType);
    fetchData(selectSearchType, filterByName);
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Selecionar tipo de busca:
      </Typography>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="type-label">Tipo</InputLabel>
        <Select
          labelId="type-label"
          value={selectSearchType}
          label="Tipo"
          onChange={(e) => setSelectSearchType(e.target.value)}
        >
          <MenuItem value="character">Personagem</MenuItem>
          <MenuItem value="episode">Episódio</MenuItem>
          <MenuItem value="location">Localização</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <TextField id="character-name" label="Filtrar pelo nome" variant="outlined" onChange={handleFilterByName} />
      </FormControl>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSearch}
        disabled={loading}
      >
        {loading ? "Carregando..." : "Buscar"}
      </Button>
    </Box>
  );
}
