import {
    getSession,
    getChatList,
    isExists,
    sendMessage,
    formatGroup,
    getChatListAdmin,
    sendMessageMedia,
    getGroupAdmin,
    groupInvite,
    groupParticipants
    
} from './../whatsapp.js'
import response from './../response.js'

const getList = (req, res) => {
    return response(res, 200, true, '', getChatList(res.locals.sessionId, true))
}
const getListIamAdmin = async (req, res) => {
    let groups = await getChatListAdmin(res.locals.sessionId, true);
    // console.log(groups)
    return response(res, 200, true, '',groups )
}
const GroupWhereAdmin = async (req, res) => {
    let groups = await getGroupAdmin(res.locals.sessionId, true);
    // console.log(groups)
    
    return response(res, 200, true, '',groups )
}


const Groupinvitelink = async (req, res) => {
   
    const session = getSession(res.locals.sessionId)
    const group_id = formatGroup(req.body.group_id)
    let code = await groupInvite(session,group_id)
    // console.log(groups)
    return response(res, 200, true, '',code )
}
const GroupParticipants = async (req, res) => {
   
    const session = getSession(res.locals.sessionId)
    const group_id = formatGroup(req.body.group_id)
    let participants = await groupParticipants(session,group_id)
    // console.log(participants)
    return response(res, 200, true, '',participants )
}
const send = async (req, res) => {
    const session = getSession(res.locals.sessionId)
    const receiver = formatGroup(req.body.receiver)
    const {
        message
    } = req.body

    try {
        const exists = await isExists(session, receiver, true)

        if (!exists) {
            return response(res, 400, false, 'The group is not exists.')
        }

        await sendMessage(session, receiver, {
            text: message
        })

        response(res, 200, true, 'The message has been successfully sent.')
    } catch {
        response(res, 500, false, 'Failed to send the message.')
    }
}
const sendtoyourgroup = async (req, res) => {
    const session = getSession(res.locals.sessionId)
    const receiver = formatGroup(req.body.receiver)
    const {
        message
    } = req.body

    try {
        const exists = await isExists(session, receiver, true)

        if (!exists) {
            return response(res, 400, false, 'The group is not exists.')
        }

        await sendMessage(session, receiver, {
            text: message
        })

        response(res, 200, true, 'The message has been successfully sent.')
    } catch {
        response(res, 500, false, 'Failed to send the message.')
    }
}

export {
    getList,
    send,
    getListIamAdmin,
    GroupWhereAdmin,
    sendtoyourgroup,
    Groupinvitelink,
    GroupParticipants
    
}
