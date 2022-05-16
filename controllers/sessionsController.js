import makeWASocket, {

    delay,
} from '@adiwajshing/baileys'
import {
    isSessionExists,
    createSession,
    getSession,
    deleteSession,
    getSessionReady,
    getwid,
    getChatListAdmin
} from './../whatsapp.js'
import response from './../response.js'
import axios from 'axios'
const find = (req, res) => {
    response(res, 200, true, 'Session found.')
}
const wid = (req, res) => {
    const {
        id,

    } = req.body
    let wid = getwid(id)
    response(res, 200, true, wid)
}

const status = (req, res) => {
    const states = ['connecting', 'connected', 'disconnecting', 'disconnected']

    const session = getSession(res.locals.sessionId)
    let state = states[session.ws.readyState]

    state =
        state === 'connected' && typeof (session.isLegacy ? session.state.legacy.user : session.user) !== 'undefined' ?
        'authenticated' :
        state

    response(res, 200, true, '', {
        status: state
    })
}

const add = async (req, res) => {
    const {
        id,
        isLegacy
    } = req.body

    if (isSessionExists(id)) {
        return response(res, 409, false, 'Session already exists, please use another id.')
    }


    await createSession(id, isLegacy === 'true', res)

    
}
const getAll = async (req, res) => {

    let session = await getSessionReady()
    // console.log(session)
    response(res, 200, true, session)
}
const del = async (req, res) => {
    const {
        id
    } = req.params
    const session = getSession(id)

    try {
        await session.logout()
    } catch {} finally {
        deleteSession(id, session.isLegacy)
    }

    response(res, 200, true, 'The session has been successfully deleted.')
}

export {
    find,
    status,
    add,
    del,
    getAll,
    wid
}
