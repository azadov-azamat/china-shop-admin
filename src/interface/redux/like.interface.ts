import { UserDataProps } from './auth.interface.ts';
import { defaultKeys } from './variable.interface.ts';
import { productDataProps } from './product.interface.ts';

export interface LikeInitialStateProps {
    currentPage: number;
    pageCount: number;
    limit: number;
    totalCount: number;
}

export interface likeDataProps extends defaultKeys {
    liked: boolean;
    owner?: UserDataProps | null;
    product?: productDataProps | null;
}