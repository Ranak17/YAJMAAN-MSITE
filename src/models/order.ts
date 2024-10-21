import { Address } from "./address"

export interface Order {
    orderId: string,
    item: string,
    itemContents: string,
    createdAt: string,
    lastUpdated: string,
    payment: Payment,
    toAddress: Address,
    fromAddress: Address,
    status: string,
    templeId: number,
    templeName: string
}

export interface Payment {
    status: string,
    amount: number,
    currency: string
}