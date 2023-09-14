import {Interest} from "../interest";

export interface Language {
    id: bigint;
    name: string;
    dubbedInterests: Array<Interest>;
    subtitledInterest: Array<Interest>;
}
