import { Knex } from "knex";
import SchemaInspector from "knex-schema-inspector";

export namespace SjKnexSchemaUtil {

    export const extractColumns4Gql = async (database: Knex, tableName: string): 
    Promise<{ [key: string]: string }> => {
        const columns = await extractColumns(database, tableName);
        const typeMap = JsToGqlTypeMap;
        for ( const key in columns ) {
            const convertedType = Object.keys(typeMap)
                .find(f => (typeMap as any)[f].includes(columns[key]));
            if (convertedType != null ) {
                columns[key] = convertedType;
            }
        }
        return columns;
    }
    
    export const extractColumns = async (database: Knex, tableName: string): 
    Promise<{ [key: string]: string }> => {
        try {
            const inspector = SchemaInspector(database);
            const simpleColumnInfos = await inspector.columns(tableName);
    
            const columns: { [key: string]: string } = {};
            for ( let i=0;i<simpleColumnInfos.length;i++ ) {
                const simpleColumnInfo = simpleColumnInfos[i];
                const columnName = simpleColumnInfo.column;
                const detailColumnInfo = await inspector.columnInfo(tableName, columnName);
                columns[columnName] = convertType(detailColumnInfo.data_type);
            }
    
            return columns;
        } catch ( e ) {
            console.log(e);
            throw e;
        }
    }

    const convertType = (columnType: string, dbDialect?: 'postgres' | 'mssql'): string => {

        let convertedType = null;
        if (dbDialect != null) {
            const perDBTypeMap = DbToJsTypeMap[dbDialect];
            if (perDBTypeMap != null) {
                convertedType = Object.keys(perDBTypeMap)
                    .find(f => (perDBTypeMap as any)[f].includes(columnType));
            }
        }

        if (convertedType == null) {
            const globalMap = DbToJsTypeMap['global']
            convertedType = Object.keys(globalMap)
                .find(f => (globalMap as any)[f].includes(columnType))
        }

        return convertedType == null ? 'any' : convertedType
    }

    const DbToJsTypeMap = {
        global: {
            string: ['nchar', 'nvarchar', 'varchar', 'char', 'tinytext', 'text', 'longtext', 'mediumtext', 'ntext', 'citext', 'varbinary', 'uuid', 'uniqueidentifier', 'character varying', 'bigint', 'xml'],
            'string[]': ['_text'],
            number: ['tinyint', 'int', 'numeric', 'integer', 'real', 'smallint', 'decimal', 'float', 'float4', 'float8', 'double precision', 'double', 'dec', 'fixed', 'year', 'serial', 'bigserial', 'int2', 'int4', 'money', 'smallmoney'],
            Date: ['datetime', 'timestamp', 'date', 'time', 'timestamptz', 'datetime2', 'smalldatetime', 'datetimeoffset'],
            boolean: ['bit', 'boolean', 'bool'],
            Object: ['json', 'TVP'],
            Buffer: ['binary', 'varbinary', 'image', 'UDT']
        },
        postgres: {
            string: ['numeric', 'decimal', 'int8', 'money', 'bpchar', 'character_data'],
            'string[]': ['_char', '_varchar', '_bpchar', '_character_data']
        },
        mssql: {
            string: ['timestamp']
        }
    };

    const JsToGqlTypeMap = {
        String: ['string'],
        Int: ['Date', 'number'],
    };
}