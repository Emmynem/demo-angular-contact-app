import { Directive, ElementRef, OnInit } from "@angular/core";

@Directive({
    selector: '[redWhite]'
})

export class RedBackWhiteFront implements OnInit {

    constructor (private elementRef: ElementRef){

    }

    ngOnInit() {
        // this.elementRef.nativeElement.style.backgroundColor = '#ff0000';
        // this.elementRef.nativeElement.style.color = 'white';
        this.elementRef.nativeElement.style.backgroundColor = 'white';
        this.elementRef.nativeElement.style.color = '#ff0000';
    }
}