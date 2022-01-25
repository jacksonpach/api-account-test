import Storage from "../storage/storage";
import AccountEntity from "../entities/account"
import {
    IEvent,
    IResponseBalanceDestination,
    IResponseBalanceOrigin,
    IResponseBalanceTransfer
} from "../models/generics";


class AccountService {

    async reset() {
        const storage = new Storage();
        storage.reset();
    }

    async deposit(data: IEvent) {
        let result = await this.existAccount(data.destination)
        if (result === null) {
            return await this.createAccount(data)
        } else {
            return await this.addAccount(data)
        }
    }

    async withdraw(data: IEvent) {
        let result = await this.existAccount(data.origin)
        if (result === null) {
            return false
        } else {
            return await this.withDrawAccount(data)
        }
    }

    async getBalance(idAccount) {
        const storage = new Storage();
        const dataAccount = await storage.get('account_' + idAccount)

        return this.getResponseBalanceDestination(dataAccount)
    }

    async createAccount(data: IEvent) {
        const dataAccount = new AccountEntity(data, data.destination)
        const idAccount = dataAccount.getId()
        const storage = new Storage();

        await storage.set('account_' + idAccount, dataAccount)
        return this.getResponseBalanceDestination(dataAccount)
    }

    async addAccount(data: IEvent) {
        const account = new AccountEntity(data, data.destination)
        account.setAmount(data.amount + account.getAmount())
        const idAccount = account.getId()
        const storage = new Storage();

        await storage.set('account_' + idAccount, account)
        return this.getResponseBalanceDestination(account)
    }

    async withDrawAccount(data: IEvent) {
        const storage = new Storage();
        const accountData = await storage.get('account_' + data.origin)
        const account = new AccountEntity(accountData, data.origin)
        account.setAmount(account.getAmount() - data.amount)
        const idAccount = account.getId()
        await storage.set('account_' + idAccount, account)
        return this.getResponseBalanceOrigin(account)
    }

    async transferAccount(data: IEvent) {
        const storage = new Storage();
        const accountOriginData = await storage.get('account_' + data.origin)
        const accountDestinationData = await storage.get('account_' + data.destination)

        const accountOrigin = new AccountEntity(accountOriginData, data.origin)
        const accountDestination = new AccountEntity(accountDestinationData, data.destination)
        accountOrigin.setAmount(accountOrigin.getAmount() - data.amount)

    }

    async existAccount(idAccount) {
        const storage = new Storage();
        return await storage.get('account_' + idAccount)
    }

    getResponseBalanceDestination(dataAccount) {
        let response: IResponseBalanceDestination;
        response = {
            destination: {
                id: dataAccount.id,
                balance: dataAccount.amount
            }
        }
        return response
    }

    getResponseBalanceOrigin(dataAccount) {
        let response: IResponseBalanceOrigin;
        response = {
            origin: {
                id: dataAccount.id,
                balance: dataAccount.amount
            }
        }
        return response
    }

    getBalanceTransfer(dataAccount) {
        let response: IResponseBalanceTransfer;
        response = {
            origin: {
                id: dataAccount.id,
                balance: dataAccount.amount
            },
            destination: {
                id: dataAccount.id,
                balance: dataAccount.amount
            }
        }
        return response
    }

}

export default AccountService