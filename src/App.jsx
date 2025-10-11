import { useState } from 'react';
import './App.css';

import { ApiProvider } from "./contexts/ApiContext";
import SearchForm from "./components/SearchForm";
import DataList from "./components/DataList";
import { Container, CssBaseline, Typography } from "@mui/material";

function App() {
  return (
    <>
      <ApiProvider>
        <CssBaseline />
        <Container sx={{ py: 4 }}>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Rick and Morty Explorer
          </Typography>
          <SearchForm />
          <DataList />
        </Container>
      </ApiProvider>
    </>
  )
}

export default App
