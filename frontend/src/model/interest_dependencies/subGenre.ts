import {Interest} from "../interest";

export interface SubGenre {
    id: bigint;
    name: string;
    interests: Array<Interest>;
}
