class AccountEntity {
    private readonly id
    private amount
    private type
    private destination

    constructor(obj, id) {
        this.id = id;
        this.amount = 0;
        this.type = '';
        this.destination = 0;

        if (obj) {
            Object.assign(this, obj);
        }
    }

    getId() {
        return this.id;
    }

    setAmount(amount) {
        this.amount = amount;
    }
    getAmount() {
        return this.amount;
    }

}
export default AccountEntity