import {Interest} from "../interest";

export interface Genre {
    id: bigint;
    name: string;
    interests: Array<Interest>;
}
