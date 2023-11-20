"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecordsHandler = void 0;
var OperationHandlerSetup_1 = require("@trayio/cdk-dsl/connector/operation/OperationHandlerSetup");
exports.getRecordsHandler = OperationHandlerSetup_1.OperationHandlerSetup.configureHandler(function (handler) {
    return handler.usingHttp(function (http) {
        return http.get('https://9b1bb69b-c349-4e95-a0e1-e8d21f1cc6b8.trayapp.io/:record_type')
            .handleRequest(function (ctx, input, request) {
            //log the API request to console before sending
            console.log(request.withBearerToken(ctx.auth.user.access_token));
            return request
                //simple token based auth
                .withBearerToken(ctx.auth.user.access_token)
                //path parameter code
                .addPathParameter('record_type', input.record_type);
        })
            .handleResponse(function (response) {
            //log the API response to console
            console.log(response);
            return response
                .parseWithBodyAsJson();
        });
    });
});
