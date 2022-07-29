import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[digitOnly]'
})
export class DigitOnlyDirective {
  private navigationKeys = [
    'Backspace',
    'Delete',
    'Tab',
    'Escape',
    'Enter',
    'Home',
    'End',
    'ArrowLeft',
    'ArrowRight',
    'Clear',
    'Copy',
    'Paste'
  ];
  inputElement: HTMLElement;
  constructor(public el: ElementRef) {
    this.inputElement = el.nativeElement;
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    if (
      this.navigationKeys.indexOf(e.key) > -1 || // Allow: navigation keys: backspace, delete, arrows etc.
      (e.code === 'KeyA' && e.ctrlKey === true) || // Allow: Ctrl+A
      (e.code === 'KeyC' && e.ctrlKey === true) || // Allow: Ctrl+C
      (e.code === 'KeyV' && e.ctrlKey === true) || // Allow: Ctrl+V
      (e.code === 'KeyX' && e.ctrlKey === true) || // Allow: Ctrl+X
      (e.code === 'KeyA' && e.metaKey === true) || // Allow: Cmd+A (Mac)
      (e.code === 'KeyC' && e.metaKey === true) || // Allow: Cmd+C (Mac)
      (e.code === 'KeyX' && e.metaKey === true) || // Allow: Cmd+V (Mac)
      (e.code === 'KeyX' && e.metaKey === true) // Allow: Cmd+X (Mac)
    ) {
      // let it happen, don't do anything
      return;
    }
    // Ensure that it is a number and stop the keypress
    if (isNaN(Number(e.key)) || e.key === ' ') {
      e.preventDefault();
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const pastedInput: string = event.clipboardData
      .getData('text/plain')
      .replace(/\D/g, ''); // get a digit-only string
    document.execCommand('insertText', false, pastedInput);
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    event.preventDefault();
    const textData = event.dataTransfer.getData('text').replace(/\D/g, '');
    this.inputElement.focus();
    document.execCommand('insertText', false, textData);
  }
}
