import Storage from "../storage/storage";

class AccountService {
    createAccount(data){
        let storage = new Storage();
        storage.set('account', data)
        return {"destination": {"id":"100", "balance":10}}
    }

    getBalance(id) {
        let storage = new Storage();

    }
}

export default AccountService