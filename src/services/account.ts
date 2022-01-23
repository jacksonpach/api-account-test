import Storage from "../storage/storage";

class AccountService {
    async createAccount(data) {
        let storage = new Storage();
        const {destination, amount} = data

        const dataObj =
            {
                destination: {
                    id: destination,
                    balance: amount
                }
            }
        await storage.set('account', dataObj)
        const res = await storage.get('account')
        return this.getBalance(res)
    }

    getBalance(res) {
        console.log(res)
        return res
    }
}

export default AccountService