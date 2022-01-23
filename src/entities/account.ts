class AccountEntity {
    private id
    private amount
    private type
    private destination

    constructor(obj) {
        this.id = "100";
        this.amount = 0;
        this.type = '';
        this.destination = 0;

        if (obj) {
            Object.assign(this, obj);
        }
    }
    setId(id) {
        this.id = id;
    }
    getId() {
        return this.id;
    }
    setType(type) {
        this.type = type;
    }
    getType() {
        return this.type;
    }

    setDestination(destination) {
        this.destination = destination;
    }
    getDestination() {
        return this.destination;
    }

    setAmount(amount) {
        this.amount = amount;
    }
    getAmount() {
        return this.amount;
    }

}
export default AccountEntity