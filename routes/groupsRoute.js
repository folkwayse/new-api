import {
    Router
} from 'express'
import {
    body,
    query
} from 'express-validator'
import requestValidator from './../middlewares/requestValidator.js'
import sessionValidator from './../middlewares/sessionValidator.js'
import * as controller from './../controllers/groupsController.js'
import getMessages from './../controllers/getMessages.js'

const router = Router()

router.get('/', query('id').notEmpty(), requestValidator, sessionValidator, controller.getList)
router.get('/iamadmin', query('id').notEmpty(),
    requestValidator, sessionValidator, controller.GroupWhereAdmin)

router.post('/invitelink',
    query('id').notEmpty(),
    body('group_id').notEmpty(),
    requestValidator, sessionValidator, controller.Groupinvitelink)

router.post('/participants',
    query('id').notEmpty(),
    body('group_id').notEmpty(),
    requestValidator, sessionValidator, controller.GroupParticipants)

// router.post('/sendGroupImage', 
// query('id').notEmpty(),
// body('imgurl').notEmpty(), 
// body('caption').notEmpty(), 
// requestValidator, sessionValidator, controller.sendMessageGroupMedia)

router.get('/:jid', query('id').notEmpty(), requestValidator, sessionValidator, getMessages)


router.post(
    '/send',
    query('id').notEmpty(),
    body('receiver').notEmpty(),
    body('message').notEmpty(),
    requestValidator,
    sessionValidator,
    controller.send
)
router.post(
    '/sendtoyourgroup',
    query('id').notEmpty(),
    body('message').notEmpty(),
    requestValidator,
    sessionValidator,
    controller.sendtoyourgroup
)
export default router
