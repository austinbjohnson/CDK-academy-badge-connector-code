"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OperationHandlerTest_1 = require("@trayio/cdk-dsl/connector/operation/OperationHandlerTest");
var OperationHandler_1 = require("@trayio/cdk-dsl/connector/operation/OperationHandler");
var handler_1 = require("./handler");
require("@trayio/cdk-runtime/connector/operation/OperationHandlerTestRunner");
OperationHandlerTest_1.OperationHandlerTestSetup.configureHandlerTest(handler_1.getRecordsHandler, function (handlerTest) {
    return handlerTest
        .usingHandlerContext('test')
        .nothingBeforeAll()
        .testCase('should do something', function (testCase) {
        return testCase
            .givenNothing()
            .when(function () { return ({ record_type: "contacts" }); })
            .then(function (_a) {
            var output = _a.output;
            //included for auditing purposes - comment out if you don't want it
            console.log(output);
            var outputValue = OperationHandler_1.OperationHandlerResult.getSuccessfulValueOrFail(output);
            //example test to check that the number of returned records is >= 28
            expect(outputValue.records.length).toBeGreaterThanOrEqual(28);
        })
            .finallyDoNothing();
    })
        .nothingAfterAll();
});
