const { Router } = require('express')

const { QuizModel, statsQuizModel, ProfilModel, statsPatientModel } = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')
const { buildQuizzes } = require('./manager')
const { QuestionsDELETE } = require('./questions/manager')

const router = new Router()

router.get('/', (req, res) => {
    try {
      const quizzes = buildQuizzes()
      //console.log("quizzes : ",quizzes)
      res.status(200).json(quizzes)
    } catch (err) {
      console.log(err)
      manageAllErrors(res, err)
    }
})

router.post('/', (req, res) => {
  try {
    const stats = statsQuizModel.create({...req.body.selfStats});
    const idStats = stats.id
    
    req.body.selfStats = idStats;
    const quiz = QuizModel.create({...req.body})
    res.status(201).json(quiz)
  } catch (err) {
    console.log(err)
    manageAllErrors(res, err)
  }
})

router.put('/:id', (req, res) => {
  try {
    console.log("body : ",req.body)
    
    if(req.body.selfStats == undefined){ // cas valeurs globales
      console.log("id : ",req.params.id.substring(1))
      const quiz = QuizModel.getById(req.params.id.substring(1));
      quiz.name = req.body[0]
      quiz.theme = req.body[1]
      if(req.body[2] != undefined) quiz.photo = req.body[2]
      res.status(200).json(QuizModel.update(req.params.id.substring(1), quiz))
    }
    else {
      console.log("id : ",req.params.id.substring(1))
      const quiz = QuizModel.getById(req.params.id.substring(1))
      const selfStats = statsQuizModel.getById(quiz.selfStats)
      selfStats.playedTime = req.body.selfStats.playedTime
      selfStats.meanScore = req.body.selfStats.meanScore
      selfStats.meanHintUsed = req.body.selfStats.meanHintUsed
      selfStats.resTab = req.body.selfStats.resTab
      selfStats.nbHintUsed = req.body.selfStats.nbHintUsed
      selfStats.successPercentageByQuestion = req.body.selfStats.successPercentageByQuestion

      console.log("self : ",selfStats)
      res.status(200).json(statsQuizModel.update(selfStats.id,selfStats))
    }
  } catch (err) {
    console.log(err)
    manageAllErrors(res, err)
  }
})

router.delete('/:quizId', (req, res) => {
  try {
    const idQuiz = req.params.quizId.substring(1); 
    const quiz = QuizModel.getById(idQuiz)
    const idSelfStats = statsQuizModel.getById(quiz.selfStats).id

    // on supprime dans les stats profils le quiz s'il a été joué
    const profilsSelfStats = statsPatientModel.get();
    for(let i=0; i<profilsSelfStats.length;i++){
      console.log("avant : ",profilsSelfStats[i].quizDone);
      let indexToDelete = [];
      for(let j=0; j<profilsSelfStats[i].quizDone.length;j++){
        if(profilsSelfStats[i].quizDone[j] == quiz.name){
          indexToDelete.push(j);        
        }
      }
      console.log("truc à delete : ",indexToDelete)
      if(indexToDelete.length >= 1) {
        let quizDone = profilsSelfStats[i].quizDone;
        let newQuizDone = [];
        let quizRes = profilsSelfStats[i].quizRes;
        let newQuizRes = [];
        console.log("quizDone : ",quizDone);

        for(let j=0; j>=quizDone;j++){
          if(indexToDelete.findIndex(j) == -1){
            newQuizDone.push(quizDone[j]);
            newQuizRes.push(quizRes[j]);
          }
          console.log("newQuizDone : ",newQuizDone);  
        }

        let profilsStats = statsPatientModel.getById(profilsSelfStats[i].id);
        profilsStats.quizDone = newQuizDone;
        profilsStats.quizRes = newQuizRes;

        // on update les autres stats
        profilsStats.nbQuizDone = profilsStats.quizDone.length;
        let meanScore = 0;
        for(let j=0;j<profilsStats.quizRes.length;j++){
          console.log("moyenne (boucle) : ",meanScore);
          meanScore += profilsStats.quizRes[j];
        }
        if(profilsStats.quizRes.length != 0){
          meanScore = meanScore/profilsStats.quizRes.length;
        }
        console.log("moyenne : ",meanScore);
        profilsStats.meanScore = meanScore;

        statsPatientModel.update(profilsStats.id,profilsStats);
        console.log("après : ",profilsSelfStats[i].quizDone);
      }
      
    }

    // on supprime les questions
    const idQuestions = []
    for(let i=0; i< quiz.questions.length;i++){
      idQuestions.push(quiz.questions[i]);
    }

    QuestionsDELETE(idQuiz);
    QuizModel.delete(idQuiz);

    // on supprime les stats
    statsQuizModel.delete(idSelfStats);
    
    res.status(204).end()
  } catch (err) {
    console.log(err);
    manageAllErrors(res, err)
  }
})

module.exports = router