import {Router} from "express";
import Account from "./controllers/acccount";

export const router = Router()

router.post('/reset', (request, response) => {
        const body: string = 'OK'
        const success: number = 200
        response.send(body).status(success)
    }
)

router.get('/balance', (request, response) => {
        const account = new Account()
        account.getBalance(request, response)
    }
)
