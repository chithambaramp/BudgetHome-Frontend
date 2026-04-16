import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[disableCutCopyPaste]'
})
export class DisableCutCopyPasteDirective {

  constructor() { }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    event.preventDefault();
  }

  @HostListener('copy', ['$event'])
  onCopy(event: ClipboardEvent) {
    event.preventDefault();
  }

  @HostListener('cut', ['$event'])
  onCut(event: ClipboardEvent) {
    event.preventDefault();
  }
}