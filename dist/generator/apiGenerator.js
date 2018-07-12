"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const request_1 = tslib_1.__importDefault(require("request"));
const path_1 = tslib_1.__importDefault(require("path"));
const SwaggerParser_1 = require("./SwaggerParser");
const TSWriter_1 = require("./TSWriter");
const SWAGGER = 'https://www.bitmex.com/api/explorer/swagger.json';
const outputClass = path_1.default.resolve(__dirname, '../../src/BitmexAPI.ts');
const outputInterfaces = path_1.default.resolve(__dirname, '../../src/BitmexInterfaces.ts');
const HEADER = `
    /** THIS FILE IS AUTOMATICALLY GENERATED FROM : ${SWAGGER} **/

    // tslint:disable:max-line-length`;
request_1.default.get(SWAGGER, (err, res, body) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    // tslint:disable-next-line:no-console
    if (err) {
        return console.log(err);
    }
    const data = JSON.parse(body);
    const swagger = new SwaggerParser_1.SwaggerParser(data);
    const interfacesBody = [];
    const classBody = [];
    classBody.push(`readonly basePath = 'https://www.bitmex.com${data.basePath}';`);
    yield TSWriter_1.TSWriter(outputInterfaces, `
    ${HEADER}
    ${swagger.createInterfaces()}
    `);
    yield TSWriter_1.TSWriter(outputClass, `
    ${HEADER}
    import { BitmexAbstractAPI } from './BitmexAbstractAPI';
    import * as ${SwaggerParser_1.CONTAINER} from './BitmexInterfaces';
    export class BitmexAPI extends BitmexAbstractAPI {
    ${swagger.createClass()}
    }`);
}));