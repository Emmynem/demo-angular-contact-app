import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { catchError, retry, throwError } from 'rxjs';
import { Profile } from "./profile-editor/profile";

@Injectable({
    providedIn: 'root'
})
export class DataService {

    private REST_API_SERVER = "http://localhost:8080/runaway/backend/api";

    constructor(private httpClient: HttpClient) { }

    public sendGetRequest(start: number, numLimit: number, path: string) {
        const options = {params: new HttpParams({fromObject: {start: start, numLimit: numLimit}})}
        return this.httpClient.get(`${this.REST_API_SERVER}${path}`, options)
            .pipe(
                retry(1),
                catchError(this.handleError)
            );
    }

    public retrieveGetRequest(param: string, path: string) {
        const options = { params: new HttpParams({ fromString: param }) }
        return this.httpClient.get(`${this.REST_API_SERVER}${path}`, options)
            .pipe(
                retry(1),
                catchError(this.handleError)
            );
    }

    public deleteRequest(data: Object, path: string) {
        // const options = { params: new HttpParams({ fromString: param }) }
        return this.httpClient.post(`${this.REST_API_SERVER}${path}`, data)
            .pipe(
                // retry(1),
                catchError(this.handleError)
            );
    }

    public postRequest(formData: Object, path: string) {
        // const options = { params: new HttpParams({ fromString: param }) }
        return this.httpClient.post(`${this.REST_API_SERVER}${path}`, formData)
            .pipe(
                // retry(1),
                catchError(this.handleError)
            );
    }

    public updateRequest(formData: FormData, path: string) {
        // const options = { params: new HttpParams({ fromString: param }) }
        return this.httpClient.post(`${this.REST_API_SERVER}${path}`, formData)
            .pipe(
                retry(1),
                catchError(this.handleError)
            );
    }

    handleError(error: HttpErrorResponse) {
        let errorMessage = 'Unknown error!';
        if (error.error instanceof ErrorEvent) {
            // Client-side errors
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // Server-side errors
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        window.alert(errorMessage);
        return throwError(() => new Error(errorMessage));
    }

}