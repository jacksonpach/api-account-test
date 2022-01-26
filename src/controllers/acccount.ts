import {SUCCESS, NOT_FOUND, BODY_OK, CREATE, NO_EXISTS_ACCOUNT} from '../config'
import {Request, Response} from "express"

import AccountService from "../services/account";
import {IEvent} from "../models/generics";

class Account {

    async getReset(response: Response) {
        const service = new AccountService
        await service.resetStorage()
        return response.send(BODY_OK).status(SUCCESS)
    }

    async getBalance(request: Request, response: Response) {
        const {account_id} = request.query

        if (Number(account_id) === NO_EXISTS_ACCOUNT) {
            return response.status(NOT_FOUND).json(0)
        } else {
            const service = new AccountService
            const result = await service.getBalance(account_id)
            return response.status(SUCCESS).json(result.destination.balance)
        }
    }

    async getEvent(request: Request, response: Response) {
        const service = new AccountService
        const data: IEvent = request.body
        let result

        switch (data.type) {
            case 'deposit':
                result = await service.deposit(data)
                return this.createResponse(result, response);
            case 'withdraw':
                result = await service.withdraw(data)
                return this.createResponse(result, response);
            case 'transfer':
                result = await service.transfer(data)
                return this.createResponse(result, response);
        }
    }

    private createResponse(result, response: Response<any, Record<string, any>>) {
        if (result) {
            return response.status(CREATE).json(result)
        }
        return response.status(NOT_FOUND).json(0)
    }
}

export default Account