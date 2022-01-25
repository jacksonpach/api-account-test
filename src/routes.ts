import {Router} from "express";
import Account from "./controllers/acccount";

export const router = Router()

router.post('/reset', async (request, response) => {
        const account = new Account()
        await account.getReset(response)
    }
)

router.get('/balance', async (request, response) => {
        const account = new Account()
        await account.getBalance(request, response)
    }
)

router.post('/event', async (request, response) => {
        const account = new Account()
        return await account.getEvent(request, response)
    }
)
