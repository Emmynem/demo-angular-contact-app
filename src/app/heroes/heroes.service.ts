import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Hero } from './hero';
import { catchError, Observable } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'my-auth-token'
    })
};

@Injectable()
export class HeroesService {

    heroesUrl = 'api/heroes';  // URL to web api
    // private handleError: HandleError;

    constructor(private http: HttpClient) { }

    /** POST: add a new hero to the database */
    // addHero(hero: Hero): Observable<Hero> {
    //     return this.http.post<Hero>(this.heroesUrl, hero, httpOptions)
    //         .pipe(
    //             catchError(this.handleError('addHero', hero))
    //         );
    // }
}
