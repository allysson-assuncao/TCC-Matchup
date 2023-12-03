import {User} from "./user";

export const INTEREST_DEPENDENCIES = {
    COMPANY: 'company', LANGUAGE: 'language', AGE_RATING: 'age-rating', GENRE: 'genre', SUBGENRE: 'subgenre', PLATFORM: 'platform'};

export interface Interest {
    id?: bigint;
    name: string;
    description?: string;
    company: InterestDependency | undefined;
    lowestPrice: number;
    highestPrice: number;
    dubbingLanguages: Array<InterestDependency>;
    subtitleLanguages: Array<InterestDependency>;
    genres: Array<InterestDependency>;
    subGenres: Array<InterestDependency>;
    platforms: Array<InterestDependency>;
    ageRating: InterestDependency | undefined;
    users?: Array<User>;
}


export type InterestDto = {
    name: string | undefined;
    description?: string;
    companyId: undefined | string | number;
    lowestPrice: number | undefined;
    highestPrice: number | undefined;
    dubbingLanguagesIdList: Array<string>;
    subtitleLanguagesIdList: Array<string>;
    genresIdList: Array<number>;
    subGenresIdList: Array<number>;
    platformsIdList: Array<number>;
    ageRatingId: undefined | string | number;
    images: File[];
}



export interface InterestDependency {
    id: bigint | string;
    name: string;
}
