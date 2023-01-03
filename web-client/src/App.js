import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Header from './components/Header'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { createTheme, ThemeProvider } from '@mui/material'
// import { theme } from './theme'
import { useEffect, useState } from 'react'
import { Container, Stack } from '@mui/material'
import Welcome from './pages/Welcome'
import SignIn from './pages/SignIn'
import { useSelector } from 'react-redux'

function App() {
  const user = useSelector((state) => state.auth.user)

  const useThemeDetector = () => {
    const getCurrentTheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches
    const [isDarkTheme, setIsDarkTheme] = useState(getCurrentTheme())
    const mqListener = (e) => {
      setIsDarkTheme(e.matches)
    }

    useEffect(() => {
      const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)')
      darkThemeMq.addListener(mqListener)
      return () => darkThemeMq.removeListener(mqListener)
    }, [])
    return isDarkTheme
  }

  const isDarkTheme = useThemeDetector
  const [mode, setMode] = useState(!isDarkTheme ? 'dark' : 'light') // remember fo reverse logic for easier read
  const darkTheme = createTheme({
    palette: {
      mode: mode,
      primary: {
        main: '#1760a5',
      },
      secondary: {
        main: '#15c630',
      },
      black: {
        main: '#000',
      },
    },
  })

  return (
    <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
        <Stack bgcolor={'background.default'} color={'text.primary'} minHeight={'100vh'}>
          {user ? <Header mode={mode} setMode={setMode} /> : null}
          <Routes>
            <Route path='/' element={<Welcome />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='*' element={<Navigate to='/register' />} />
          </Routes>
        </Stack>
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
    </ThemeProvider>
  )
}

export default App
