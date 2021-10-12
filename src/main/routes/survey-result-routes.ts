import { makeSaveSurveyResultController } from '@/main/factories/controllers/survey-result/save-survey-result/save-survey-result-controller-factory'
import { Router } from 'express'
import { adapterRouter } from '../adapters/express/express-route-adapter'
import { auth } from '../middlewares/auth'

export default (router: Router): void => {
  router.put('/surveys/:surveyId/results', auth, adapterRouter(makeSaveSurveyResultController()))
}