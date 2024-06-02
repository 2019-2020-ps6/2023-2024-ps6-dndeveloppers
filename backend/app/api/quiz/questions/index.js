const { Router } = require('express')
const { AnswerModel,IndiceModel,QuestionModel,QuizModel, statsQuizModel } = require('../../../models')
const manageAllErrors = require('../../../utils/routes/error-management')
const quizModel = require('../../../models/quiz.model')
const router = new Router()

router.get('/:id', (req, res) => {
    try {
        const question = AnswerModel.getById(req.body.params.substring(1)) 
        res.status(200).json(answer)
    } catch (err) {
        console.log(err)
        manageAllErrors(res, err)
  }
})

router.post('/', (req, res) => {
    try {
        console.log("body : ",req.body)
        // on ajoute les réponses
        const body = req.body;
        const answers = []
        for(let i=0; i<4;i++){
            let value = req.body.answers[i].value;
            let isCorrect = req.body.answers[i].isCorrect
            let answer = AnswerModel.create( {value,isCorrect})
            answers.push(answer.id)
        }
        
        // on ajoute les indice
        const indices = []
        for(let i=0; i< 3 ; i++){
            let value = req.body.indice[i].value;
            if(value != ""){
                let indice = IndiceModel.create({value})
                indices.push(indice.id)
            }          
        }

        // on ajoute la question au quiz
        req.body.answers = answers
        req.body.indice = indices
        console.log("body ++ : ",req.body)
        const question = QuestionModel.create({...req.body}) 
        
        const quiz = QuizModel.getById(question.idQuiz)
        quiz.questions.push(question.id)
        QuizModel.update(quiz.id,quiz)
        res.status(201).json(question)
        } catch (err) {
            console.log(err)
            manageAllErrors(res, err)
    }
  })

router.put('/', (req, res) => {
    try {
        const question = QuestionModel.getById(req.body.id);
        question.label = req.body.label;

        // update réponses
        for(let i=0;i<4;i++){
            const answer = AnswerModel.getById(question.answers[i]);
            answer.value = req.body.answers[i].value;
            answer.isCorrect = req.body.answers[i].isCorrect;
            AnswerModel.update(answer.id,answer);
        }

        // update indices
        const indices = []
        for(let i=0; i< 3 ; i++){
            const value = req.body.indice[i].value;
            if(value != ""){
                const indice = IndiceModel.create({value})
                indices.push(indice.id)
            }          
        }
        for(let i=0;i<question.indice.length;i++){
            IndiceModel.delete(question.indice[i])
        }
        question.indice = indices;
        res.status(200).json(QuestionModel.update(question.id, question))
    } catch (err) {
        console.log(err)
        manageAllErrors(res, err)
    }
})

router.delete('/:id', (req, res) => {
    try {
        const idQuestion = req.params.id.substring(1);
        const question = QuestionModel.getById(idQuestion)
        const quiz = QuizModel.getById(question.idQuiz)

        // on supprime la question du quiz
        const numQuestion = 0;
        for(let i=0;i<quiz.questions.length;i++){
            if(quiz.questions[i].id == idQuestion){
                numQuestion = i;
            }
        }

        // on update quiz et quizStats
        quiz.questions.pop(numQuestion)
        QuizModel.update(quiz.id,quiz)
        const quizStats = statsQuizModel.getById(quiz.selfStats)
        if(quizStats.successPercentageByQuestion.length > 0){
            quizStats.successPercentageByQuestion.pop(numQuestion);
            statsQuizModel.update(quizStats.id,quizStats)
        }

        // on supprime les indices
        for(let i=0; i<question.indice.length;i++){
            IndiceModel.delete(question.indice[i])
        }
        
        // on supprime les réponses
        const answerToDelete = question.answers
        console.log(answerToDelete)
        for(let i=0;i<4;i++){
            AnswerModel.delete(answerToDelete[i])
            console.log(answerToDelete)
        }
        console.log("taille : ",AnswerModel.get().length)
        //       -- dans le manager --
        QuestionModel.delete(idQuestion)
        res.status(204).end()
    } catch (err) {
        console.log(err)
        manageAllErrors(res, err)
    }
})

module.exports = router