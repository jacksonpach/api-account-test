export interface IResponseBalance {
    destination: {
        id: number,
        balance: number
    }
}

export interface IEvent {
    type: string,
    destination: string,
    amount: number
}
