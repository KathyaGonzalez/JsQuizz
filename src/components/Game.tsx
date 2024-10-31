import { Card, ListItem, ListItemButton, ListItemText, Typography, List, Stack, IconButton } from "@mui/material"
import { useQuestionsStore } from "../store/questions"
import { type Question as QuestionType } from "../types"
import SyntaxHighlighter from 'react-syntax-highlighter'
import { androidstudio} from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material"

const showCheck = (index: number, info: QuestionType) => {
    const {userSelectedAnswer, correctAnswer} = info
    if(userSelectedAnswer== null) return 'transparent'
    else if(index !== correctAnswer && index !==userSelectedAnswer) return 'transparent'
    else if(index === correctAnswer) return 'green'
    else if(index !== correctAnswer) return 'red'
    return 'transparent'
}

const Question = ({info}: {info: QuestionType}) => {
    const selectAnswer = useQuestionsStore(state => state.selectAnswer)

    const createHeandleClick = (answerIndex: number) => () => {
        selectAnswer(info.id, answerIndex)
    }

    return (
        <Card variant='outlined' sx={{ bgcolor: '#222', p:2, marginTop: 4}}>
            
            <Typography variant='h5'>
                {info.question}
            </Typography>

            <SyntaxHighlighter language="javascript" style={androidstudio}>
                {info.code}
            </SyntaxHighlighter>

            <List sx={{bgcolor: '#333'}} disablePadding>
                {
                    info.options.map((answer, index) => (
                        <ListItem key={index} disablePadding divider>
                            <ListItemButton 
                                disabled={info.userSelectedAnswer!=null}
                                onClick={createHeandleClick(index)} sx={{
                                backgroundColor: showCheck(index, info)
                                }}>
                                <ListItemText primary={answer}/>
                            </ListItemButton>
                        </ListItem>
                    ))
                }
            </List>
        </Card>
    )
}

export const Game = () =>{
    const questions = useQuestionsStore(state => state.questions)
    const currentQuestion = useQuestionsStore(state => state.currentQuestion)
    const questionInfo = questions[currentQuestion]
    const goNextQuestion = useQuestionsStore(state => state.goNextQuestion)
    const goPreviousQuestion = useQuestionsStore(state => state.goPreviousQuestion)
    
    return (
        <>
        <Stack direction='row' alignItems='center' justifyContent='center'>
            <IconButton onClick={goPreviousQuestion} disabled={currentQuestion===0}>
                <ArrowBackIosNew/>
            </IconButton>
            {currentQuestion+1}/{questions.length}
            <IconButton onClick={goNextQuestion} disabled={currentQuestion===questions.length-1}>
                <ArrowForwardIos/>
            </IconButton>
        </Stack>
            <Question info={questionInfo}/>
        </>
        )
}