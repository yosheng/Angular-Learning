import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appLogOnClick]'
})
export class LogOnClickDirective {

  constructor() { }

  @HostListener('click')
  onclick() {
    console.log('I am clicked!');
  }

}
