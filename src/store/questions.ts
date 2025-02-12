import { create } from 'zustand'
import { type Question } from '../types'

interface State {
    questions: Question[]
    currentQuestion: number,
    fetchQuestions: (limit: number) => Promise<void>,
    selectAnswer: (questionId: number, answerIndex: number) => void,
    goNextQuestion: () => void,
    goPreviousQuestion: () => void
}

export const useQuestionsStore = create<State>((set, get) => {
    return{
        questions: [],
        currentQuestion: 0,
        fetchQuestions: async (limit: number) => {
            const res = await fetch('/data.json')
            const json = await res.json()
            const questions = json.sort(() => Math.random() -0.5).slice(0, limit)
            set({questions})
        },
        selectAnswer: (questionId: number, answerIndex: number) => {
            const { questions } = get()
            // deeo clone object 
            const newQuestions = structuredClone(questions)
            // find index question
            const questionIndex = newQuestions.findIndex(q => q.id === questionId)
            // find object question
            const questionInfo = newQuestions[questionIndex]
            // compare user answer and correct answer
            const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex

            newQuestions[questionIndex] = {
                ...questionInfo,
                isCorrectUserAnswer,
                userSelectedAnswer: answerIndex
            }
            
            // update state
            set({questions: newQuestions})

        },

        goNextQuestion: () => {
            const { currentQuestion, questions } = get()
            const nextQuestion = currentQuestion + 1
            if(nextQuestion < questions.length) {
               set({currentQuestion: nextQuestion}) 
            }
        },

        goPreviousQuestion: () => {
            const { currentQuestion } = get()
            const previousQuestion = currentQuestion - 1
            if(previousQuestion >= 0) {
               set({currentQuestion: previousQuestion}) 
            }
        }
    }

})