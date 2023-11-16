import { OperationHandlerTestSetup } from '@trayio/cdk-dsl/connector/operation/OperationHandlerTest';
import { OperationHandlerResult } from '@trayio/cdk-dsl/connector/operation/OperationHandler';
import { getRecordsHandler } from './handler'
import '@trayio/cdk-runtime/connector/operation/OperationHandlerTestRunner';

OperationHandlerTestSetup.configureHandlerTest(
	getRecordsHandler,
	(handlerTest) =>
		handlerTest
			.usingHandlerContext('test')
			.nothingBeforeAll()
			.testCase('should do something', (testCase) =>
				testCase
					.givenNothing()
					.when(() => ({ record_type: "contacts" }))
					.then(({ output }) => {
						//included for auditing purposes - comment out if you don't want it
						console.log(output);
						const outputValue = OperationHandlerResult.getSuccessfulValueOrFail(output)
						//example test to check that the number of returned records is >= 28
						expect(outputValue.records.length).toBeGreaterThanOrEqual(28);
					})
					.finallyDoNothing()
			)
			.nothingAfterAll()
);
