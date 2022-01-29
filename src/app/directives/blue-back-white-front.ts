import { Directive, ElementRef, OnInit } from "@angular/core";

@Directive({
    selector: '[blueWhite]'
})

export class BlueBackWhiteFront implements OnInit {

    constructor (private elementRef: ElementRef){

    }

    ngOnInit() {
        // this.elementRef.nativeElement.style.backgroundColor = '#4b57db';
        // this.elementRef.nativeElement.style.color = 'white';
        this.elementRef.nativeElement.style.backgroundColor = 'white';
        this.elementRef.nativeElement.style.color = '#4b57db';
    }
}