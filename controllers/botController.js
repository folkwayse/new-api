import {
    getSession,
    getChatList,
    isExists,
    sendMessage,
    formatPhone,
    sendMessageMedia,
    getChatListAdmin,
} from './../whatsapp.js'
import response from './../response.js'

const mulaiUpload = async (req, res) => {
    console.log('mulaiUpload')
    const session = getSession(res.locals.sessionId)
    const receiver = formatPhone(req.body.receiver)
    const {
        message
    } = req.body

    try {
        const exists = await isExists(session, receiver)

        if (!exists) {
            return response(res, 400, false, 'The receiver number is not exists.')
        }

        await sendMessage(session, receiver, {
            text: message
        })

        response(res, 200, true, 'The message has been successfully sent.')
    } catch {
        response(res, 500, false, 'Failed to send the message.')
    }
}


const kirimTutupan = async (req, res) => {
    let groups = await  getChatListAdmin(req.query.id,true);
    console.log('kirimtutupan')
    console.log(groups.data)
    const session = getSession(res.locals.sessionId)
    const receiver = formatPhone(req.body.receiver)
    const {
        message
    } = req.body

    try {
        const exists = await isExists(session, receiver)

        if (!exists) {
            return response(res, 400, false, 'The receiver number is not exists.')
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
    mulaiUpload,
    kirimTutupan,
}
