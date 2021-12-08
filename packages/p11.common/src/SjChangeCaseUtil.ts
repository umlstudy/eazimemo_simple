import { camelCase, pascalCase } from 'change-case'

export class SjChangeCaseUtil {

    public static convertCase(name: string
        , caseType: 'pascal' | 'camel' | 'lower' | 'upper') {
        switch (caseType) {
            case 'pascal':
                return pascalCase(name)
            case 'camel':
                return camelCase(name)
            case 'lower':
                return name.toLowerCase()
            case 'upper':
                return name.toUpperCase()
            default:
                return name
        }
    }
}