import { Component, OnInit } from '@angular/core';
import { Hero } from './hero';
import { HeroesService } from './heroes.service';

@Component({
    selector: 'app-heroes',
    templateUrl: './heroes.component.html',
    providers: [HeroesService],
    styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

    heroes: Hero[] = [];
    editHero: Hero | undefined; // the hero currently being edited

    constructor(private heroesService: HeroesService) { }

    ngOnInit(): void {
    }

}
