import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-reactive-favorite-color',
    template: `    
    Favorite Color Outside: <input type="text" class="form-control" [formControl]="favoriteColorControl2">
  `
})
export class FavoriteColorComponent2 {

    constructor () {
        this.favoriteColorControl2.setValue('Outside guy');
    }

    favoriteColorControl2 = new FormControl('');
}