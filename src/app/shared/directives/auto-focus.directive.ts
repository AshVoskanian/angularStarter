import { Directive, ElementRef, Input, OnInit } from "@angular/core";

@Directive({
  selector: "[appAutoFocus]",
})
export class AutoFocusDirective implements OnInit {
  @Input() public autoFocus: boolean;

  constructor(private el: ElementRef) {
  }

  ngOnInit(): void {
    document.getElementById("otpCodeInput").focus();
  }
}
