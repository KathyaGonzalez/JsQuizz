import { Card, ListItem, ListItemButton, ListItemText, Typography, List } from "@mui/material"
import { useQuestionsStore } from "../store/questions"
import { type Question as QuestionType } from "../types"
import SyntaxHighlighter from 'react-syntax-highlighter'
import { androidstudio} from 'react-syntax-highlighter/dist/esm/styles/hljs'

const Question = ({info}: {info: QuestionType}) => {
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
                        <ListItem key={index} disablePadding divider >
                            <ListItemButton>
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
    return (
        <Question info={questionInfo}/>
    )
}