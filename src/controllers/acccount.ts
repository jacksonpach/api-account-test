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
}

export default Account