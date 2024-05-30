const { Router } = require('express')
const { AnswerModel,IndiceModel,QuestionModel,QuizModel } = require('../../../models')
const manageAllErrors = require('../../../utils/routes/error-management')
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
            const value = req.body.answers[i].value;
            const isCorrect = req.body.answers[i].isCorrect
            const answer = AnswerModel.create( {value,isCorrect})
            answers.push(answer)
        }
        
        // on ajoute les indice
        const indices = []
        for(let i=0; i< req.body.indice.lenght ; i++){
            indices.push(IndiceModel.create({...req.body.indice[i].value}))
        }

        // on ajoute la question au quiz
        const question = QuestionModel.create({...req.body} , answers, indices, req.body.idQuiz) 
        
        res.status(201).json(question)
        } catch (err) {
            console.log(err)
            manageAllErrors(res, err)
    }
  })

router.put('/:id', (req, res) => {
    try {
        const question = QuestionModel.updateById(req.params.id.substring(1),req.body)
        res.status(200).json(answer)
    } catch (err) {
        console.log(err)
        manageAllErrors(res, err)
    }
})

router.delete('/:id', (req, res) => {
    try {
        const idQuestion = req.body.params.id.substring(1);
        const question = QuestionModel.getById(idQuestion.idQuiz)
        const quiz = QuizModel.getById(question.id)
        //       -- dans le manager --
        // on supprime la question du quiz
        const numQuestion = 0;
        for(let i=0;i<quiz.questions.lenght;i++){
            if(quiz.questions[i].id == idQuestion){
                numQuestion = i;
            }
        }
        quiz.questions.remove(numQuestion)

        // on supprime les indices
        while(question.indice != []){
            IndiceModel.delete(question.indice[0].id)
            question.indice.remove(0)
        }
        // on supprime les réponses
        while(question.answers != []){
            AnswerModel.delete(question.answers[0].id)
            question.answers.remove(0)
        }
        //       -- dans le manager --
        QuestionModel.delete(idQuestion)
        res.status(204).end()
    } catch (err) {
        console.log(err)
        manageAllErrors(res, err)
    }
})

module.exports = router