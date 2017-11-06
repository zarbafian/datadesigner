export class Constants {

    // Field types
    static FIELD_TYPE_TEXT = 'text';
    static FIELD_TYPE_ENTITY = 'entity';
    
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

    static ENTITIES = Constants.API + '/entities';
    static PARAMETER_TYPE = 'type';

    static REPORTS = Constants.API + '/reports';
    static ENTITIES_TYPE_REPORTS = Constants.REPORTS + '/entities';
    
    static EVENTS = Constants.API + '/events';
    
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

    // ENTITIES
    static getEntityType(type: string) {
        return Constants.ENTITIES + '/' + type;
    }
    static getEntityByTypeAndId(type: string, id: number) {
        return Constants.getEntityType(type) + '/' + id;
    }
    /*static getFieldByEntityAndName(entity: string, id: number, name: string) {
        return Constants.ENTITIES + '/' + id + '/' + name + '?' + Constants.PARAMETER_TYPE + '=' + entity;
    }*/

    // REPORTS
    static getMainReports() {
        return Constants.ENTITIES_TYPE_REPORTS;
    }
    static getEntityReport(name: string) {
        return Constants.REPORTS + '/entities' + '/' + name;
    }

    // EVENT LOGS
    static getEventLogs() {
        return Constants.EVENTS;
    }
}
