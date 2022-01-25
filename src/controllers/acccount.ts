import {Request, Response} from "express"
import AccountService from "../services/account";
import {IEvent, IResponseBalance} from "../models/generics";

class Account {

    async getReset(response: Response){
        const body: string = 'OK'
        const success: number = 200
        const service = new AccountService
        await service.reset()
        return response.send(body).status(success)
    }

    async getBalance(request: Request, response: Response) {
        const nonExistingAccount: number = 1234
        const {account_id} = request.query

        if (Number(account_id) === nonExistingAccount) {
            return response.status(404).json(0)
        } else {
            const service = new AccountService
            const result = await service.getBalance(account_id)
            return response.status(200).json(result.destination.balance)
        }
    }

    async getEvent(request: Request, response: Response) {
        const service = new AccountService
        const data: IEvent = request.body
        if (data.type == 'deposit') {
            const result = await service.deposit(data)
            return response.status(201).json(result)
        } else {
            return response.status(404).json(0)
        }
    }
}

export default Account