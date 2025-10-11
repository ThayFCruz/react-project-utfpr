import { useApi } from "../contexts/ApiContext";
import { useState } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select, Typography, Button, TextField, FormHelperText } from "@mui/material";

export default function SearchForm() {
  const { type, setType, fetchData, loading } = useApi();

  const [selectSearchType, setSelectSearchType] = useState('');
  const [filterByName, setFilterByName] = useState();

  const [errorSelectField, setErrorSelectField] = useState(false);
  const [errorTextField, setErrorTextField] = useState(false);

  const handleFilterByName = (e) => {
    const value = e.target.value;
    const regex = /^[a-zA-Z0-9\s]*$/;

    if (!regex.test(value)) {
      setErrorTextField(true);
    } else {
      setErrorTextField(false);
      setFilterByName(value);
    }
  }

  const handleSearch = () => {
    if (selectSearchType) {
      setErrorSelectField(false);
      setType(selectSearchType);
      fetchData(selectSearchType, filterByName);
    } else {
      setErrorSelectField(true);
    }
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Selecionar tipo de busca:
      </Typography>

      <FormControl fullWidth sx={{ mb: 2 }} error={errorSelectField}>
        <InputLabel id="type-label">Tipo</InputLabel>
        <Select
          labelId="type-label"
          value={selectSearchType}
          label="Tipo"
          onChange={(e) => {
            setSelectSearchType(e.target.value);
            setErrorSelectField(false);
          }}
        >
          <MenuItem value=""></MenuItem>
          <MenuItem value="character">Personagem</MenuItem>
          <MenuItem value="episode">Episódio</MenuItem>
          <MenuItem value="location">Localização</MenuItem>
        </Select>

        {errorSelectField && (
          <FormHelperText>Por favor selecione um tipo de pesquisa.</FormHelperText>
        )}
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <TextField id="character-name" label="Filtrar pelo nome" variant="outlined"
          value={filterByName}
          onChange={handleFilterByName}
          error={errorTextField}
        />

        {errorTextField && (
          <FormHelperText>Por favor não utilize caracteres especiais ou com acentuação.</FormHelperText>
        )}
      </FormControl>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSearch}
        disabled={loading || errorSelectField || errorTextField}
      >
        {loading ? "Carregando..." : "Buscar"}
      </Button>
    </Box>
  );
}
