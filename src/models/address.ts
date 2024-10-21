export interface Address {
    id: number | string,
    street: string,
    city: string,
    state: string,
    country: string,
    pinCode: string,
    userId: number | null | string,
    landmark: string,
    addressType: string
    blockNo: string,
    apartment: string,
}