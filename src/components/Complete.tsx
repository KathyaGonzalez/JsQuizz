import confetti from 'canvas-confetti';
import { useQuestionData } from '../hooks/useQuestionData';
import { Alert, Avatar, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { ClearOutlined } from '@mui/icons-material';
import SentimentDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentDissatisfiedOutlined';
import SentimentVerySatisfiedOutlinedIcon from '@mui/icons-material/SentimentVerySatisfiedOutlined';
export const Complete = () => {
    const {correctAnswers, wrongAnswers, approved} = useQuestionData()
    if (approved) confetti()
    return (
        <>
            <Grid container spacing={2} direction={'row'} sx={{ marginBottom: 4, marginTop: 2}}>
                <Stack spacing={2} direction={'row'} sx={{ alignItems: 'center'}}>
                    <Avatar>
                        <CheckOutlinedIcon/>
                    </Avatar>
                    <Typography noWrap>Correct Answers: {correctAnswers}</Typography>
                </Stack>
                <Stack spacing={2} direction={'row'} sx={{ alignItems: 'center' }}> 
                    <Avatar>
                        <ClearOutlined/>
                    </Avatar>
                    <Typography noWrap>Wrong Answers: {wrongAnswers}</Typography>
                </Stack>
            </Grid>
            {
                approved    ? 
                <Alert icon={<SentimentVerySatisfiedOutlinedIcon/>}variant='outlined' severity="success">
                    Approved Quizz
                </Alert>
                :
                <Alert icon={<SentimentDissatisfiedOutlinedIcon/>}variant='outlined' severity="error">    
                    Quizz not approved
                </Alert>
            }
        </>
    )
}