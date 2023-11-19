import {User} from "./user";

export const INTEREST_DEPENDENCIES = {
    COMPANY: 'company', LANGUAGE: 'language', AGE_RATING: 'age-rating', GENRE: 'genre', SUBGENRE: 'subgenre', PLATFORM: 'platform'};

export interface Interest {
    id: bigint;
    name: string;
    description: string;
    company: InterestDependency;
    lowestPrice: number;
    highestPrice: number;
    dubbingLanguages: Array<InterestDependency>;
    subtitleLanguages: Array<InterestDependency>;
    genres: Array<InterestDependency>;
    subGenres: Array<InterestDependency>;
    platforms: Array<InterestDependency>;
    ageRating: Array<InterestDependency>;
    users: Array<User>;
}

export interface InterestDependency {
    id: bigint | string;
    name: string;
}
