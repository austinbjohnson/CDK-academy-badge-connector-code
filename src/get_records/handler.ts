import { OperationHandlerSetup } from '@trayio/cdk-dsl/connector/operation/OperationHandlerSetup';
import { CdkAcademyBadgeAuth } from '../CdkAcademyBadgeAuth'
import { GetRecordsInput } from './input'
import { GetRecordsOutput } from './output'

export const getRecordsHandler = 
    OperationHandlerSetup.configureHandler<CdkAcademyBadgeAuth, GetRecordsInput, GetRecordsOutput>((handler) =>
        handler.usingHttp((http) =>
            http.get('https://9b1bb69b-c349-4e95-a0e1-e8d21f1cc6b8.trayapp.io/:record_type')
            .handleRequest((ctx, input, request) => {
                //log the API request to console before sending
                console.log(request.withBearerToken(ctx.auth!.user.access_token)) 
                return request
                    //simple token based auth
                    .withBearerToken(ctx.auth!.user.access_token)
                    //path parameter code
                    .addPathParameter('record_type', input.record_type)

            })
            .handleResponse((response) => {
                //log the API response to console
                console.log(response) 
                return response
                    .parseWithBodyAsJson()
            }
            )
    )
);

