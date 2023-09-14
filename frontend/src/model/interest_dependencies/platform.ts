import {Interest} from "../interest";

export interface Platform {
    id: bigint;
    name: string;
    interests: Array<Interest>;
}
