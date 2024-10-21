export interface User {
    name: string | null;
    displayName: string | null;
    phoneNumber: number | string | null;
    userId: string | number;
    email: string | null;
    mobile_number: string | number | null;
    username: string | null;
    is_verified: boolean | null;
}

export interface UserLoginValues {
    phoneNumber: number | string,
    otp?: string
}
