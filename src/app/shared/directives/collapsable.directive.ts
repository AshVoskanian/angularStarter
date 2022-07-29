import { Directive, ElementRef, OnInit } from "@angular/core";

@Directive({
  selector: "[collapsable]",
})
export class CollapsableDirective implements OnInit {
  constructor(private el: ElementRef) {
  }

  ngOnInit(): void {
    for (const element of this.el.nativeElement.children) {
      if (element.classList.contains("trigger")) {
        element.addEventListener("click", () => {
          if (this.el.nativeElement.classList.contains("collapsed")) {
            this.el.nativeElement.classList.remove("collapsed");
          } else {
            this.el.nativeElement.classList.add("collapsed");
          }
        });
      }
    }
  }
}
