class Account {

    private _id: number;
    private _amount: number;

    constructor(obj) {
        this._id = 0
        this._amount = 0;
    }

    get id(): number {
        return this._id;
    }
    set id(value: number) {
        this._id = value;
    }

    get amount(): number {
        return this._amount;
    }

    set amount(value: number) {
        this._amount = value;
    }
}