import { Directive, ElementRef, HostListener, OnInit } from "@angular/core";

@Directive({
  selector: "[passwordInputToggle]",
})
export class PasswordInputToggleDirective implements OnInit {

  @HostListener('click', ['$event']) onClick() {
    if (this.el.nativeElement.previousSibling.previousSibling.type === 'text') {
      this.el.nativeElement.previousSibling.previousSibling.type = "password";
    } else {
      this.el.nativeElement.previousSibling.previousSibling.type = "text";
    }
  }

  constructor(private el: ElementRef) {
  }

  ngOnInit(): void {

    // this.el.nativeElement.onmousedown = () => {
    //   this.el.nativeElement.previousSibling.previousSibling.type = "text";
    // };
    //
    // this.el.nativeElement.onmouseup = () => {
    //   this.el.nativeElement.previousSibling.previousSibling.type = "password";
    // };
  }
}
