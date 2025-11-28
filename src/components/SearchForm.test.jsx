import { render, screen, fireEvent } from '@testing-library/react'
import SearchForm from './SearchForm'
import { useApi } from '../contexts/ApiContext'


// Mocks de teste
const mockSetType = vi.fn()
const mockFetchData = vi.fn()

// Mock do hook useApi
vi.mock('../contexts/ApiContext', () => ({
  useApi: vi.fn()
}))

describe('SearchForm', () => {
  beforeEach(() => {
    // Configura o retorno padrão do useApi para cada teste
    useApi.mockReturnValue({
      type: '',
      setType: mockSetType,
      fetchData: mockFetchData,
      loading: false
    })

    mockSetType.mockClear()
    mockFetchData.mockClear()
  })

  it('renderiza os campos principais e o botão', () => {
    render(<SearchForm />)

    // Campo select (tipo)
    expect(screen.getByLabelText(/tipo/i)).toBeInTheDocument()

    // Campo de texto (filtrar pelo nome)
    expect(screen.getByLabelText(/filtrar pelo nome/i)).toBeInTheDocument()

    // Botão de busca
    expect(screen.getByRole('button', { name: /buscar/i })).toBeInTheDocument()
  })

  it('exibe mensagens de erro quando o usuário tenta buscar sem preencher os campos', () => {
    render(<SearchForm />)

    const button = screen.getByRole('button', { name: /buscar/i })

    fireEvent.click(button)

    expect(
      screen.getByText(/por favor selecione um tipo de pesquisa/i)
    ).toBeInTheDocument()

    expect(
      screen.getByText(/por favor preencha o campo corretamente/i)
    ).toBeInTheDocument()

    // Não deve chamar a API
    expect(mockFetchData).not.toHaveBeenCalled()
    expect(mockSetType).not.toHaveBeenCalled()
  })

  it('realiza busca quando o tipo e o nome são preenchidos corretamente', async () => {
  render(<SearchForm />)

  // 1. Abre o Select do MUI clicando nele
  const select = screen.getByLabelText(/tipo/i)
  fireEvent.mouseDown(select)

  // 2. Clica na opção "Personagem"
  const option = await screen.findByRole('option', { name: /personagem/i })
  fireEvent.click(option)

  // 3. Preenche o campo de nome com um valor válido
  const nameInput = screen.getByLabelText(/filtrar pelo nome/i)
  fireEvent.change(nameInput, { target: { value: 'Rick Sanchez' } })

  // 4. Clica no botão "Buscar"
  const button = screen.getByRole('button', { name: /buscar/i })
  fireEvent.click(button)

  // 5. Verifica se setType e fetchData foram chamados corretamente
  expect(mockSetType).toHaveBeenCalledTimes(1)
  expect(mockSetType).toHaveBeenCalledWith('character')

  expect(mockFetchData).toHaveBeenCalledTimes(1)
  expect(mockFetchData).toHaveBeenCalledWith('character', 'Rick Sanchez')
})

  it('não aceita caracteres especiais no campo de nome e mantém o erro ativo', () => {
    render(<SearchForm />)

    const nameInput = screen.getByLabelText(/filtrar pelo nome/i)

    // Digita um valor inválido com acento e caractere especial
    fireEvent.change(nameInput, { target: { value: 'Rïck@' } })

    // Como o regex não aceita, esperamos que o campo esteja com erro
    expect(nameInput).toHaveAttribute('aria-invalid', 'true')

    expect(
      screen.getByText(/não utilize acentos ou caracteres especiais/i)
    ).toBeInTheDocument()

    // Como o campo está inválido, mesmo clicando buscar não deve chamar a API
    const button = screen.getByRole('button', { name: /buscar/i })
    fireEvent.click(button)

    expect(mockFetchData).not.toHaveBeenCalled()
  })

  it('desabilita o botão quando loading é true', () => {
    // Sobrescreve o retorno do useApi para este teste específico
    useApi.mockReturnValueOnce({
      type: '',
      setType: mockSetType,
      fetchData: mockFetchData,
      loading: true
    })

    render(<SearchForm />)

    const button = screen.getByRole('button', { name: /carregando/i })
    expect(button).toBeDisabled()
  })
})
