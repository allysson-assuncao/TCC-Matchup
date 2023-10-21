import {Company} from "./interest/company";
import {Language} from "./interest/language";
import {Genre} from "./interest/genre";
import {SubGenre} from "./interest/subGenre";
import {Platform} from "./interest/platform";
import {AgeRating} from "./interest/ageRating";
import {User} from "./user";

export interface Interest {
    id: bigint;
    name: string;
    description: string;
    company: Company;
    lowestPrice: number;
    highestPrice: number;
    dubbingLanguages: Array<Language>;
    subtitleLanguages: Array<Language>;
    genres: Array<Genre>;
    subGenres: Array<SubGenre>;
    platforms: Array<Platform>;
    ageRating: Array<AgeRating>;
    users: Array<User>;
}
