import Storage from "../storage/storage";
import AccountEntity from "../entities/account"
import {
    IEvent,
    IResponseBalanceDestination,
    IResponseBalanceOrigin,
    IResponseBalanceTransfer
} from "../models/generics";


class AccountService {

    async resetStorage() {
        const storage = new Storage();
        storage.reset();
    }

    async deposit(data: IEvent) {
        let result = await this.existAccount(data.destination)
        if (result === null) {
            return await this.createAccount(data)
        }
        return await this.addAccount(data)
    }

    async withdraw(data: IEvent) {
        let result = await this.existAccount(data.origin)
        if (result === null) {
            return false
        }
        return await this.withDrawAccount(data)
    }

    async transfer(data: IEvent) {
        let existOrigin = await this.existAccount(data.origin)

        if (existOrigin) {
            return await this.transferAccount(data)
        }
        return false
    }

    async getBalance(idAccount) {
        const storage = new Storage();
        const dataAccount = await storage.get('account_' + idAccount)

        return this.getResponseBalanceDestination(dataAccount)
    }

    private async createAccount(data: IEvent) {
        const dataAccount = new AccountEntity(data, data.destination)
        const idAccount = dataAccount.getId()
        const storage = new Storage();

        await storage.set('account_' + idAccount, dataAccount)
        return this.getResponseBalanceDestination(dataAccount)
    }

    private async addAccount(data: IEvent) {
        const account = new AccountEntity(data, data.destination)
        account.setAmount(data.amount + account.getAmount())
        const idAccount = account.getId()
        const storage = new Storage();

        await storage.set('account_' + idAccount, account)
        return this.getResponseBalanceDestination(account)
    }

    private async withDrawAccount(data: IEvent) {
        const storage = new Storage();
        const accountData = await storage.get('account_' + data.origin)
        const account = new AccountEntity(accountData, data.origin)
        account.setAmount(account.getAmount() - data.amount)
        const idAccount = account.getId()
        await storage.set('account_' + idAccount, account)
        return this.getResponseBalanceOrigin(account)
    }

    private async transferAccount(data: IEvent) {
        const storage = new Storage();
        const accountOriginData = await storage.get('account_' + data.origin)
        const accountDestinationData = await storage.get('account_' + data.destination)
        const accountOrigin = new AccountEntity(accountOriginData, data.origin)
        const accountDestination = new AccountEntity(accountDestinationData, data.destination)

        accountOrigin.setAmount(accountOrigin.getAmount() - data.amount)
        accountDestination.setAmount(accountDestination.getAmount() + data.amount)

        return this.getResponseTransfer(accountOrigin, accountDestination)

    }

    private async existAccount(idAccount) {
        const storage = new Storage();
        return await storage.get('account_' + idAccount)
    }

    private getResponseBalanceDestination(dataAccount) {
        let response: IResponseBalanceDestination;
        response = {
            destination: {
                id: dataAccount.id,
                balance: dataAccount.amount
            }
        }
        return response
    }

    private getResponseBalanceOrigin(dataAccount) {
        let response: IResponseBalanceOrigin;
        response = {
            origin: {
                id: dataAccount.id,
                balance: dataAccount.amount
            }
        }
        return response
    }

    private getResponseTransfer(dataOrigin, dataDestination) {
        let response: IResponseBalanceTransfer;
        response = {
            origin: {
                id: dataOrigin.id,
                balance: dataOrigin.amount
            },
            destination: {
                id: dataDestination.id,
                balance: dataDestination.amount
            }
        }
        return response
    }

}

export default AccountService