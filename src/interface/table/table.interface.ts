import {ReactNode} from "react";
import {TableColumn} from "react-data-table-component";

export interface TableInterfaceProps {
    data: any;
    columns: TableColumn<unknown>[];
    totalCount: number;
    size: number;
    progressPending: boolean;
    totalPages: number
    currentPage: number
    limit: number
    ref?: ReactNode;
    isPagination?: boolean;
    selectableRows?: boolean
    onSelectedRowsChange?: any
}