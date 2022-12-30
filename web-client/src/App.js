import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Header from './components/Header'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { createTheme, ThemeProvider } from '@mui/system'
import { theme } from './theme'
import { useState } from 'react'
import { Container } from '@mui/material'


function App() {
  const [mode, setMode] = useState('light')
  const lightTheme = createTheme({
    palette: {
      mode: mode,
    },
  })
  return (
    <ThemeProvider theme={theme}>
      <Container style={{ border: '1px solid coral' }}>
        <BrowserRouter>
          <div>
            <Header />
            <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='*' element={<Navigate to='/register' />} />
            </Routes>
          </div>
        </BrowserRouter>
        <ToastContainer
          position='top-right'
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='light'
        />
      </Container>
    </ThemeProvider>
  )
}

export default App
