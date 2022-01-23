import Storage from "../storage/storage";
import Account from "../controllers/acccount";
import AccountEntity from "../entities/account"

interface IResponse {
    destination: {
        id: number,
        balance: number
    }
}

class AccountService {
    async createAccount(data) {
        const dataAccount = new AccountEntity(data)
        const idAccount = dataAccount.getId()
        const storage = new Storage();

        await storage.set('account_'+idAccount,dataAccount)
        return await this.getBalance(idAccount)
    }

    async getBalance(idAccount) {
        const storage = new Storage();
        const dataAccount = await storage.get('account_'+idAccount)

        return this.getResponseBalance(dataAccount)
    }

    getResponseBalance(dataAccount){
        let response: IResponse;

        response = {
            destination:  {
                id: dataAccount.id,
                balance: dataAccount.amount
            }
        }
        return response
    }
}

export default AccountService