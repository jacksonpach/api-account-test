import {Router} from "express";

export const router = Router()

router.post('/reset', (request, response) => {
        const body: string = 'OK'
        const success: number = 200
        response.send(body).status(success)
    }
)
