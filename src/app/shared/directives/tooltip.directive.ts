import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
} from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Directive({
  selector: "[tooltip]",
})
export class TooltipDirective implements OnInit {
  @Input() tooltip: string;
  @Input() tooltipPosition: string;

  tooltipDiv: HTMLElement;
  innerWidth: number = null;

  parentCoordinates: {
    x: number;
    y: number;
    width;
    height;
  };

  constructor(
    private el: ElementRef,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    if (!this.tooltipPosition) {
      this.tooltipPosition = "top";
    }
    this.onResize();
    this.createTooltipElement();
  }

  @HostListener("mouseenter")
  mouseenter() {
    if (this.innerWidth <= 767) {
      return;
    }
    this.getParentElementCoordinates();
    this.el.nativeElement.appendChild(this.tooltipDiv);
    this.giveTooltipCoordinates();
  }

  @HostListener("mouseleave")
  mouseleave() {
    this.el.nativeElement.removeChild(this.tooltipDiv);
  }

  @HostListener("window:resize", ["$event"])
  onResize() {
    this.innerWidth = window.innerWidth;
  }

  createTooltipElement() {
    this.tooltipDiv = document.createElement("div");
    this.tooltipDiv.classList.add("tooltip");
    if (this.tooltipPosition === "top") {
      this.tooltipDiv.classList.add("bottom");
    } else if (this.tooltipPosition === "bottom") {
      this.tooltipDiv.classList.add("top");
    }

    this.translateService.get(this.tooltip).subscribe((translation: string) => {
      this.tooltipDiv.innerText = translation;
    });
  }

  getParentElementCoordinates() {
    this.parentCoordinates = {
      x: this.el.nativeElement.getBoundingClientRect().left,
      y: this.el.nativeElement.getBoundingClientRect().top,
      width: this.el.nativeElement.offsetWidth,
      height: this.el.nativeElement.offsetHeight,
    };
  }

  giveTooltipCoordinates() {
    // console.log(this.tooltipPossition);
    if (this.tooltipPosition === "top") {
      this.tooltipDiv.style.left =
        this.parentCoordinates.x +
        this.parentCoordinates.width / 2 -
        this.tooltipDiv.offsetWidth / 2 +
        "px";

      this.tooltipDiv.style.top =
        this.parentCoordinates.y - this.tooltipDiv.offsetHeight - 10 + "px";
    } else if (this.tooltipPosition === "bottom") {
      this.tooltipDiv.style.left =
        this.parentCoordinates.x +
        this.parentCoordinates.width / 2 -
        this.tooltipDiv.offsetWidth / 2 +
        "px";

      this.tooltipDiv.style.top =
        this.parentCoordinates.y + this.parentCoordinates.height + 10 + "px";
    }
  }
}
