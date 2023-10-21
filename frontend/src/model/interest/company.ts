import {Interest} from "../interest";

export interface Company {
    id: bigint;
    name: string;
    interests: Array<Interest>;
}
