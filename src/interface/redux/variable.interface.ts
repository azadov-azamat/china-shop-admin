import { UserDataProps } from './auth.interface.ts';

export interface InitialStateProps {
    loading: boolean;
    users: UserDataProps[] | [];
    currentPage: number;
    pageCount: number;
    limit: number;
    totalCount: number;
}

export interface defaultKeys {
    id: number;
    createdAt: string; // Assuming the timestamp is stored in ISO format
    updatedAt: string; // Assuming the timestamp is stored in ISO format
}