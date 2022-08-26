/* tslint:disable */
/* eslint-disable */
/**
 * Theia.cloud API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.8.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists } from '../runtime';
/**
 * Response for a session launch. Allows to access the URL of the session or the error that occured during launch.
 * @export
 * @interface SessionLaunchResponse
 */
export interface SessionLaunchResponse {
    /**
     * Specifies which kind of response this is. This is optional.
     * @type {string}
     * @memberof SessionLaunchResponse
     */
    kind?: string;
    /**
     * Whether the request was successful
     * @type {boolean}
     * @memberof SessionLaunchResponse
     */
    success: boolean;
    /**
     * The error message. Empty if request was successful.
     * @type {string}
     * @memberof SessionLaunchResponse
     */
    error?: string;
    /**
     * The URL of the running workspace or empty if there was an error.
     * @type {string}
     * @memberof SessionLaunchResponse
     */
    url?: string;
}

/**
 * Check if a given object implements the SessionLaunchResponse interface.
 */
export function instanceOfSessionLaunchResponse(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "success" in value;

    return isInstance;
}

export function SessionLaunchResponseFromJSON(json: any): SessionLaunchResponse {
    return SessionLaunchResponseFromJSONTyped(json, false);
}

export function SessionLaunchResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): SessionLaunchResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'kind': !exists(json, 'kind') ? undefined : json['kind'],
        'success': json['success'],
        'error': !exists(json, 'error') ? undefined : json['error'],
        'url': !exists(json, 'url') ? undefined : json['url'],
    };
}

export function SessionLaunchResponseToJSON(value?: SessionLaunchResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'kind': value.kind,
        'success': value.success,
        'error': value.error,
        'url': value.url,
    };
}
