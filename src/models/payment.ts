export interface OrderReq {
    userId: string | number,
    amount: string | number,
    receipt: string,
    item: string,
    itemContents: string,
    templeId: string | number,
    toAddressId: string | number,
    phoneNumber: string | number | null

}
export interface OrderResp {
    amount: number,
    amountDue: number,
    amountPaid: number,
    attempts: number,
    createdAt: number,
    currency: string,
    entity: string,
    id: string,
    notes: string[],
    offerId: null | string | number,
    receipt: string,
    status: string

}