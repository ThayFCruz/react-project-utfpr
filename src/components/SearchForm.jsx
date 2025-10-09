// src/components/SearchForm.jsx
import { useApi } from "../contexts/ApiContext";
import { useEffect } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";

export default function SearchForm() {
  const { type, setType, fetchData } = useApi();

  useEffect(() => {
    fetchData();
  }, [type]);

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Selecionar tipo de busca:
      </Typography>

      <FormControl fullWidth>
        <InputLabel id="type-label">Tipo</InputLabel>
        <Select
          labelId="type-label"
          value={type}
          label="Tipo"
          onChange={(e) => setType(e.target.value)}
        >
          <MenuItem value="character">Personagem</MenuItem>
          <MenuItem value="episode">Episódio</MenuItem>
          <MenuItem value="location">Localização</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
