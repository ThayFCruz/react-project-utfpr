import { useState } from 'react';
import './App.css';
import CharacterList from "./components/CharacterList";



import { ApiProvider } from "./contexts/ApiContext";
import SearchForm from "./components/SearchForm";
import DataList from "./components/DataList";
import { Container, CssBaseline, Typography } from "@mui/material";

function App() {
  const [count, setCount] = useState(0)


  return (
    <>
      <h1>Começando projeto Frontend utfpr</h1>
      <hr />

      <h3>Checklist de coisas a fazer</h3>
      <h4>Primeira parte</h4>
      <ul>
        <li className='feito'>Criar requisição https para a api https://rickandmortyapi.com/api/character</li>
        <li className='feito'>Validar resultados da requisição</li>
        <li className='feito'>Formatar resultados</li>
        <li className='feito'>Apresentar resultados das requisições</li>
      </ul>

      <h4>Segunda parte</h4>
      <ul>
        <li className='feito' >Criar formulario customizado para envio de parametros</li>
        <li className='atencao'>Validar campos com mensagens de erros</li>
      </ul>

      <br />
      <br />
      <br />

      <hr />

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
