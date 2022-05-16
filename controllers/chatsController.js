import {
    getSession,
    getChatList,
    isExists,
    sendMessage,
    formatPhone,
    sendMessageMedia
} from './../whatsapp.js'
import response from './../response.js'
import axios from 'axios'
import sharp from 'sharp'

const getList = (req, res) => {
    return response(res, 200, true, '', getChatList(res.locals.sessionId))
}

const sendGroupText = async (req, res) => {
    const session = getSession(res.locals.sessionId)
    const receiver = req.body.receiver
    const {
        message
    } = req.body

    try {

        await sendMessage(session, receiver, {
            text: message
        })

        response(res, 200, true, 'The message has been successfully sent.')
    } catch {
        response(res, 500, false, 'Failed to send the message.')
    }
}
const send = async (req, res) => {
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

const sendmedia = async (req, res) => {
    const session = getSession(res.locals.sessionId)
    const receiver = req.body.receiver
    let imgurl = req.body.imgurl
    const caption = req.body.caption


    try {
        // // const fileUrl = new URL('https://i.imgur.com/QGpP4WT.png');



        // const attachment = await axios.get(imgurl, {
        //     responseType: 'arraybuffer'
        // }).then(response => {
        //     // mimetype = response.headers['content-type'];
        //     return sharp(response.data).resize(1)
        //         .toBuffer();

        // });

        await sendMessageMedia(session, receiver, {

            image: {
                url: imgurl,
                jpegThumbnail: imgurl,
            },

            caption: caption
        })

        response(res, 200, true, 'The message has been successfully sent.')
    } catch (err) {
        console.log(err)
        response(res, 500, false, 'Failed to send the message.')
    }
}


const sendBulk = async (req, res) => {
    const session = getSession(res.locals.sessionId)
    const errors = []

    for (const [key, data] of req.body.entries()) {
        if (!data.receiver || !data.message) {
            errors.push(key)

            continue
        }

        data.receiver = formatPhone(data.receiver)

        try {
            const exists = await isExists(session, data.receiver)

            if (!exists) {
                errors.push(key)

                continue
            }

            await sendMessage(session, data.receiver, {
                text: data.message
            })
        } catch {
            errors.push(key)
        }
    }

    if (errors.length === 0) {
        return response(res, 200, true, 'All messages has been successfully sent.')
    }

    const isAllFailed = errors.length === req.body.length

    response(
        res,
        isAllFailed ? 500 : 200,
        !isAllFailed,
        isAllFailed ? 'Failed to send all messages.' : 'Some messages has been successfully sent.', {
            errors
        }
    )
}

export {
    getList,
    send,
    sendBulk,
    sendmedia,
    sendGroupText,
}
