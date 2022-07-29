import { Directive, ElementRef, HostListener } from "@angular/core";

@Directive({
  selector: "[appEnglishLettersWithNumbers]",
})
export class EnglishLettersWithNumbersDirective {
  inputElement: HTMLElement;
  constructor(public el: ElementRef) {
    this.inputElement = el.nativeElement;
  }

  @HostListener("input", ["$event"])
  onInput(event) {
    const regex = RegExp(/^[A-Za-z0-9]+$/g);
    if (!regex.test(event.data)) {
      const target = event.target as HTMLTextAreaElement;
      target.value = target.value.replace(event.data, "");
    }
  }

  @HostListener("paste", ["$event"])
  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const pastedInput: string = event.clipboardData
      .getData("text/plain")
      .replace(/[^a-zA-Z0-9]/g, ""); // get a digit-only string
    document.execCommand("insertText", false, pastedInput);
  }
}
