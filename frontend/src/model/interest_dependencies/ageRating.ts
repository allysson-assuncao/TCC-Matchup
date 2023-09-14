import {Interest} from "../interest";

export interface AgeRating {
    id: bigint;
    name: string;
    interests: Array<Interest>;
}
