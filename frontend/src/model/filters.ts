export const OPERATION = {
    EQUAL: 'EQUAL',
    LIKE: 'LIKE',
    LOWER_THAN: 'LOWER_THAN',
    GREATER_THAN: 'LIGREATER_THANKE',
    JOIN: 'JOIN'
}

export const OPERATOR = {
    AND: 'AND',
    OR: 'OR'
}

export const sla = {
    /*USER:{
        tableName: 'user',
        birth_date: Date,
        bio: '',
        access,
        email,
    }*/

    INTEREST:{
        TABLE_NAME: 'interest',
        ID: 'id',
        NAME: 'name',
        DESCRIPTION: 'description',
        LOWEST_PRICE: 'lowestPrice',
        HIGHEST_PRICE: 'highestPrice'
    },

    INTEREST_DEPENDENCIES:{
        COMPANY_COLUMN_NAME: 'company',
        AGE_RATING_COLUMN_NAME: 'ageRating',
        DUBBING_LANGUAGES_COLUMN_NAME: 'dubbingLanguages',
        SUBTITLED_LANGUAGES_COLUMN_NAME: 'subtitledLanguages',
        GENRE_COLUMN_NAME: 'genres',
        SUBGENRE_COLUMN_NAME: 'subGenre',
        PLATFORM_COLUMN_NAME: 'platforms',
        ID: 'id',
        NAME: 'name',
    }

}

export interface Filters {
    column: string;
    values: [],
    joinTable: string;
    operation: string;
    operator: string;
}

