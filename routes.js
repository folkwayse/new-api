import { Router } from 'express'
import sessionsRoute from './routes/sessionsRoute.js'
import chatsRoute from './routes/chatsRoute.js'
import groupsRoute from './routes/groupsRoute.js'
import botRoute from './routes/botRoute.js'
import response from './response.js'
import path from 'path';
const __dirname = path.resolve();
const router = Router()

router.use('/sessions', sessionsRoute)
router.use('/chats', chatsRoute)
router.use('/groups', groupsRoute)
router.use('/bots', botRoute)



router.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/index.html'));
    //__dirname : It will resolve to your project folder.
  });



router.all('*', (req, res) => {
    response(res, 404, false, 'The requested url cannot be found.')
})

export default router
