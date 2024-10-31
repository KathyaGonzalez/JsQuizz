import { useQuestionsStore } from '../store/questions';
export const useQuestionData = () => {
    const questions = useQuestionsStore(state=> state.questions)

    let complete = 0;
    let correctAnswers = 0;
    let wrongAnswers = 0;
    questions.forEach(question => {
        if(question.userSelectedAnswer!= null){
            complete+=1
            if(question.isCorrectUserAnswer) correctAnswers+=1
            else wrongAnswers+=1
        }
    
    })

    return {finished: complete===questions.length, correctAnswers, wrongAnswers, approved: correctAnswers>=(questions.length*0.65)}
}