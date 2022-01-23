import {Request, Response} from "express"

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
        const bodyRes = {
            "destination": {"id": "100", "balance": 10}
        }
        return bodyRes
    }
}

export default Account