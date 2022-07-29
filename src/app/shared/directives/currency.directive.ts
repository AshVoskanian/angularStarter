import { CurrencyPipe } from "@angular/common";
import { Directive, ElementRef, HostListener, OnInit } from "@angular/core";

@Directive({
  selector: "[currencyInputDirective]",
})
export class CurrencyDirective implements OnInit {
  private navigationKeys = [
    "Backspace",
    "Delete",
    "Tab",
    "Escape",
    "Enter",
    "Home",
    "End",
    "ArrowLeft",
    "ArrowRight",
    "Clear",
    "Copy",
    "Paste",
  ];

  constructor(private el: ElementRef, private currencyPipe: CurrencyPipe) {
  }

  ngOnInit() {
    this.format();
  }

  @HostListener("paste", ["$event"])
  onPaste(event: ClipboardEvent) {
    event.preventDefault();

    const pastedInput: string = event.clipboardData.getData("text/plain");
    const regexp = new RegExp(/^[0-9]{1,12}([,.]{1}[0-9]{0,2}){0,1}$/);

    if (regexp.test(pastedInput)) {
      document.execCommand("insertText", false, pastedInput);
    }
  }

  @HostListener("keydown", ["$event"])
  onKeyDown(e: KeyboardEvent) {
    if (e.key === "e" || e.key === "-") {
      e.preventDefault();
    }

    if (this.getSelectedText()) {
      return;
    }

    const elem = e.target as HTMLInputElement;
    const stringValue = elem.value.toString();

    const regexp = new RegExp(/^[0-9]{1,12}([,.]{1}[0-9]{0,2}){0,1}$/);


    if (!regexp.test(stringValue + e.key) && !this.pressNavigationKeys(e)) {
      e.preventDefault();
    }

    this.el.nativeElement.value = this.el.nativeElement.value.replace(/,/g, '.');
  }

  pressNavigationKeys(e) {
    if (
      this.navigationKeys.indexOf(e.key) > -1 || // Allow: navigation keys: backspace, delete, arrows etc.
      (e.code === "KeyA" && e.ctrlKey === true) || // Allow: Ctrl+A
      (e.code === "KeyC" && e.ctrlKey === true) || // Allow: Ctrl+C
      (e.code === "KeyV" && e.ctrlKey === true) || // Allow: Ctrl+V
      (e.code === "KeyX" && e.ctrlKey === true) || // Allow: Ctrl+X
      (e.code === "KeyA" && e.metaKey === true) || // Allow: Cmd+A (Mac)
      (e.code === "KeyC" && e.metaKey === true) || // Allow: Cmd+C (Mac)
      (e.code === "KeyX" && e.metaKey === true) || // Allow: Cmd+V (Mac)
      (e.code === "KeyX" && e.metaKey === true) // Allow: Cmd+X (Mac)
    ) {
      // let it happen, don't do anything
      return true;
    }
  }

  getSelectedText() {
    let text = "";
    if (typeof window.getSelection !== "undefined") {
      text = window.getSelection().toString();
    } else {
      // @ts-ignore
      if (typeof document.selection !== "undefined" && document.selection.type === "Text") {
        // @ts-ignore
        text = document.selection.createRange().text;
      }
    }
    return text;
  }

  @HostListener("focus")
  onFocus() {
    this.el.nativeElement.value = this.el.nativeElement.value.replace(/,/g, "");
    if (this.el.nativeElement.value && this.el.nativeElement.value.includes('.')) {
      this.el.nativeElement.value = this.el.nativeElement.value.replace(
        /\.00/g,
        ""
      );
    } else {
      this.el.nativeElement.value = this.el.nativeElement.value.replace(
        /\,00/g,
        ""
      );
    }
  }

  @HostListener("blur")
  onBlur() {
    this.format();
  }

  format() {
    if (!this.el.nativeElement.value) {
      this.el.nativeElement.value = "0";
    }

    this.el.nativeElement.value = this.currencyPipe.transform(
      this.el.nativeElement.value.replace(/,/g, '.'),
      null,
      "",
      "0.2-2"
    );
  }
}
