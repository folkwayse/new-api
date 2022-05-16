import { Router } from 'express'
import { body, query } from 'express-validator'
import requestValidator from './../middlewares/requestValidator.js'
import sessionValidator from './../middlewares/sessionValidator.js'
import * as controller from './../controllers/botController.js'
import getMessages from './../controllers/getMessages.js'

const router = Router()

router.post('/mulai', query('id').notEmpty(), requestValidator, sessionValidator, controller.mulaiUpload)
router.post('/kirimtutupan', query('id').notEmpty(), requestValidator, sessionValidator, controller.kirimTutupan)

export default router
