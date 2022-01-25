export interface IResponseBalanceDestination {
    destination: {
        id: number
        balance: number
    }
}
export interface IResponseBalanceOrigin {
    origin: {
        id: number
        balance: number
    }
}

export interface IResponseBalanceTransfer {
    origin: {
        id: number
        balance: number
    },
    destination: {
        id: number
        balance: number
    }
}

export interface IEvent {
    type: string
    origin?: string
    destination?: string
    amount: number

}

