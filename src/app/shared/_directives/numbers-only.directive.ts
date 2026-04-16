import { Directive, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[numbersOnly]'
})
export class NumbersOnlyDirective {

    @Input() allowDecimal: boolean = false;

    @HostListener('keypress', ['$event'])
    onKeyPress(event: KeyboardEvent) {
        const char = event.key;

        if (this.allowDecimal) {
            if (!/[0-9.]$/.test(char)) {
                event.preventDefault();
            }
        } else {
            if (!/[0-9]$/.test(char)) {
                event.preventDefault();
            }
        }
    }

    @HostListener('paste', ['$event'])
    onPaste(event: ClipboardEvent) {
        const input = event.clipboardData?.getData('text') || '';

        const regex = this.allowDecimal ? /^[0-9.]*$/ : /^[0-9]*$/;

        if (!regex.test(input)) {
            event.preventDefault();
        }
    }
}

// FYI
// Use to HTML Example:
// <form>
//   <label>Age</label>
//   <input type="text" numbersOnly />

//   <label>Amount</label>
//   <input type="text" numbersOnly [allowDecimal]="true" />
// </form>