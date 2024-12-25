export interface AuthInitialProps {
    user: UserDataProps | null;
    auth: AuthDataProps | null;
    loading: boolean;
}

export interface AuthDataProps {
    token: string;
    userId: number;
    expires: string;
}

export interface UserDataProps {
    firstName: string;
    lastName: string;
    telegramId: string;
    phone: string;
    role: string;
    telegramUsername: string;
}