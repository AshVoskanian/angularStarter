
import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[dropdown]'
})
export class DropdownDirective {

  @HostBinding('class.open') isOpen = false;

  @HostListener('click', ['$event'])
  toggleOpen(e: Event) {
    e.stopPropagation();
    this.isOpen = !this.isOpen;
  }

  @HostListener('document:click', ['$event'])
  close() {
    this.isOpen = false;
  }

  constructor() { }
}
