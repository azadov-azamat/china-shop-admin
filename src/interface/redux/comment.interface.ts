import { UserDataProps } from './auth.interface.ts';
import { defaultKeys } from './variable.interface.ts';
import { productDataProps } from './product.interface.ts';

export interface CommentInitialStateProps {
    loading: boolean;
    comments: commentDataProps[] | [];
    currentPage: number;
    pageCount: number;
    limit: number;
    totalCount: number;
}

export interface commentDataProps extends defaultKeys {
    rate: number;
    text: string;
    user: UserDataProps | null;
    product: productDataProps | null
}