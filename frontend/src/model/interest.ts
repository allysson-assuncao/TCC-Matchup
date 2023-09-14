import {Company} from "./interest_dependencies/company";
import {Language} from "./interest_dependencies/language";
import {Genre} from "./interest_dependencies/genre";
import {SubGenre} from "./interest_dependencies/subGenre";
import {Platform} from "./interest_dependencies/platform";
import {AgeRating} from "./interest_dependencies/ageRating";
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
