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
        LOWEST_PRICE: 'lowest_price',
        HIGHEST_PRICE: 'highest_price'
    },

    INTEREST_DEPENDENCIES:{
        COMPANY_COLUMN_NAME: 'company',
        AGE_RATING_COLUMN_NAME: 'age_rating',
        DUBBING_LANGUAGES_COLUMN_NAME: 'dubbing_languages',
        SUBTITLED_LANGUAGES_COLUMN_NAME: 'subtitled_languages',
        GENRE_COLUMN_NAME: 'genre',
        SUBGENRE_COLUMN_NAME: 'subgenre',
        PLATFORM_COLUMN_NAME: 'platform',
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

