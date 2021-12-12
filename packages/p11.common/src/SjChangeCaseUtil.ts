import { camelCase, pascalCase, snakeCase } from 'change-case'

export module SjChangeCaseUtil {

    export const convertCase = (name: string
        , caseType: 'pascal' | 'camel' | 'snake' | 'lower' | 'upper'): string => {
        switch (caseType) {
            case 'pascal':
                return pascalCase(name)
            case 'camel':
                return camelCase(name)
            case 'snake':
                return snakeCase(name)
            case 'lower':
                return name.toLowerCase()
            case 'upper':
                return name.toUpperCase()
            default:
                return name
        }
    };
}