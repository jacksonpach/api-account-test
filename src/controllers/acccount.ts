import {Request, Response} from "express"
import AccountService from "../services/account";

class Account {

    getBalance(request: Request, response: Response) {
        const nonExistingAccount: number = 1234
        const {account_id} = request.query

        if (Number(account_id) === nonExistingAccount) {
            return response.status(404).json(0)
        } else {
            return response.status(200).json('OK')
        }
    }

    async getEvent(request: Request, response: Response) {
        const data = request.body
        if (data.type == 'deposit') {
            const responseData = await this.deposit(data)
            console.log(responseData)
            return response.status(201).json(responseData)
        } else {
            return response.status(404).json('no')
        }

    }

    async deposit(data) {
        const service = new AccountService
        let response = await service.createAccount(data)
        console.log(response)
        return response
    }
}

export default Account