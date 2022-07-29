import {Directive, Output, EventEmitter, ElementRef, HostListener} from "@angular/core";

@Directive({
  selector: "[clickOutside]",
})
export class ClickOutsideDirective {
  @Output() clickOutside = new EventEmitter<void>();

  constructor(private elementRef: ElementRef) {
  }

  @HostListener("document:mousedown", ["$event.target"])
  public onClick(target) {
    const clickedInside = this.elementRef.nativeElement.contains(target) || this.elementRef.nativeElement.parentNode.parentNode.contains(target);
    if (!clickedInside) {
      this.clickOutside.emit();
    }
  }
}
