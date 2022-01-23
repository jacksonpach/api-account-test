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

    getEvent = (request: Request, response: Response) => {
        const data = request.body
        if (data.type === 'deposit') {
            const responseData = this.deposit(data)
            return response.status(201).json(responseData)
        } else {
            return response.status(404).json('no')
        }

    }

    deposit = (data) => {
        const service = new AccountService
        // if(data.id === 1) {
        //
        // }

        return  service.createAccount(data)
    }
}

export default Account