import { defaultKeys } from './variable.interface.ts';
import { likeDataProps } from './like.interface.ts';
import { mediaDataProps } from './media.interface.ts';

export interface ProductInitialStateProps {
    loading: boolean;
    products: productDataProps[] | [];
    product: productDataProps | null;

    currentPage: number;
    pageCount: number;
    limit: number;
    totalCount: number;
}

export interface productDataProps extends defaultKeys {
    amount: number;
    name: string;
    description: string;
    price: number;
    category: string;
    sizes: string[] | [];
    like: likeDataProps | null;
    media: mediaDataProps[] | [];
}