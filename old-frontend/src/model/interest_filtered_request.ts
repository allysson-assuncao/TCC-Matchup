import {Interest} from "./interest";

export interface InterestRequest {
    content: Interest[];
    pageable: Pageable;
    last: boolean;
    totalPages: number;
    totalElements: number;
    first: boolean;
    size: number;
    number: number;
    sort: Sort;
    numberOfElements: number;
    empty: boolean;
}

export interface Pageable {
    sort: Sort;
    name: string;
    pageNumber: number,
    pageSize: number,
    offset: number
    paged: boolean,
    unpaged: boolean

}

export interface Sort {
    sorted: boolean;
    empty: boolean;
    unsorted: boolean;
}


