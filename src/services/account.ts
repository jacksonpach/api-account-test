import Storage from "../storage/storage";
import AccountEntity from "../entities/account"
import {IResponseBalance} from "../models/generics";


class AccountService {

    async reset() {
        const storage = new Storage();
        storage.reset();
    }

    async deposit(data) {
        let responseExist = await this.existAccount(data.destination)
        if (responseExist === null) {
            return await this.createAccount(data)

        } else {
            return await this.updateAccount(data)
        }
    }

    async createAccount(data) {
        const dataAccount = new AccountEntity(data, data.destination)
        const idAccount = dataAccount.getId()
        const storage = new Storage();

        await storage.set('account_' + idAccount, dataAccount)
        return await this.getBalance(idAccount)
    }

    async updateAccount(data){
        const account = new AccountEntity(data, data.destination)
        account.setAmount(data.amount + account.getAmount())
        const idAccount = account.getId()
        const storage = new Storage();

        await storage.set('account_' + idAccount, account)
        return await this.getBalance(idAccount)
    }

    async getBalance(idAccount) {
        const storage = new Storage();
        const dataAccount = await storage.get('account_' + idAccount)

        return this.getResponseBalance(dataAccount)
    }

    async existAccount(idAccount) {
        const storage = new Storage();
        return await storage.get('account_' + idAccount)
    }

    getResponseBalance(dataAccount) {
        let response: IResponseBalance;

        response = {
            destination: {
                id: dataAccount.id,
                balance: dataAccount.amount
            }
        }
        return response
    }
}

export default AccountService