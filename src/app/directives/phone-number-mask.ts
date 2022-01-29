import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[phoneMask]'
})
export class PhoneMasksDirective {

  constructor() { }

  @HostListener('input', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    let trimmed = input.value.replace(/\s+/g, '');

    if (trimmed.length > 12) {
      trimmed = trimmed.substring(0, 12);
    }
 
    trimmed = trimmed.replace(/-/g,'');

    let numbers = [];
    numbers.push(trimmed.substring(0,3));
    if(trimmed.substring(3,3)!=="")
    numbers.push(trimmed.substring(3,3));
    if(trimmed.substring(6,4)!="")
    numbers.push(trimmed.substring(6,4));
    input.value = numbers.join('-');

  }

}