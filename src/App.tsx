import './App.css'
import { JavaScriptLogo } from './assets/JavaScript.tsx'
import { Container, Stack, Typography } from '@mui/material'
import { useQuestionsStore } from './store/questions.ts'
import { Start } from './components/Start.tsx'
import { Game } from './components/Game.tsx'

function App() {
  const questions = useQuestionsStore(state=> state.questions)
  return (
    <main>
      <Container maxWidth='sm'>
          <Stack direction='row' gap={2} alignItems='center' justifyContent='center'>
            <JavaScriptLogo/>
            <Typography variant='h2' component='h1'>
              JavaScript Quizz
            </Typography>
          </Stack>
      </Container>

      {questions.length === 0 ? <Start/>: <Game/>}
      
    </main>
  )
}

export default App
