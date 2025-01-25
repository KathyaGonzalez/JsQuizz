import './App.css'
import { JavaScriptLogo } from './assets/JavaScript.tsx'
import { Container, Stack, Typography } from '@mui/material'
import { useQuestionsStore } from './store/questions.ts'
import { Start } from './components/Start.tsx'
import { Game } from './components/Game.tsx'
import { Complete } from './components/Complete.tsx'
import { useQuestionData } from './hooks/useQuestionData.ts'

function App() {
  const questions = useQuestionsStore(state=> state.questions)
  const {finished} = useQuestionData()
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
      
      {questions.length === 0 ? <Start/>: 
        <>
        {finished? <Complete/>: <Game/>}
        </>
      }
      
    </main>
  )
}

export default App
