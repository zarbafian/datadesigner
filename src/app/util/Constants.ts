export class Constants {

    // Server URL
    static SERVER = 'http://localhost:8080';

    static LOGIN = Constants.SERVER + '/login';
    static LOGOUT = Constants.SERVER + '/logout';

    static API = Constants.SERVER + '/api';
    static ADMIN = Constants.SERVER + '/admin';

    static PRINCIPAL = Constants.API + '/principal';
    static API_STATUS = Constants.API + '/status';
    static ADMIN_STATUS = Constants.ADMIN + '/status';
    
    static DEFINITIONS = Constants.API + '/definitions';
    static FIELDS = '/fields';
    static FIELD_TYPES = '/fieldtypes';

    static getFielsTypesUrl() {
        return Constants.API + '/' + Constants.FIELD_TYPES;
    }

    static getDefinitionsUrl() {
        return Constants.DEFINITIONS;
    }

    static getDefinitionUrl(entityName: string) {
        return Constants.DEFINITIONS + '/' + entityName;
    }

    static getFieldsUrl(entityName: string) {
        return Constants.DEFINITIONS + '/' + entityName + Constants.FIELDS;
    }
    
    static getFieldUrl(entityName: string, fieldName: string) {
        return Constants.DEFINITIONS + '/' + entityName + Constants.FIELDS + '/' + fieldName;
    }
}
