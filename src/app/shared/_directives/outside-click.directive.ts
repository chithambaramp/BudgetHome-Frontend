import { Directive, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appOutsideClick]'
})
export class OutsideClickDirective {

  @Output()
  appOutsideClick = new EventEmitter<void>();

  private isFirstClick = true;

  constructor(private elementRef: ElementRef) { }

  @HostListener('document:click', ['$event.target'])
  onClick(target: HTMLElement) {

    // Ignore first click (prevents immediate close on open)
    if (this.isFirstClick) {
      this.isFirstClick = false;
      return;
    }

    const isInside = this.elementRef.nativeElement.contains(target);

    // Emit only when clicked outside
    if (!isInside) {
      this.appOutsideClick.emit();
    }
  }
}

// FYI
// How to use HTML & TS to Single ElementData
// <div class="dropdown" (appOutsideClick)="closeDropdown()">
//   <button (click)="toggle()">Toggle</button>

//   <ul *ngIf="isOpen">
//     <li>Item 1</li>
//     <li>Item 2</li>
//   </ul>
// </div>

// isOpen = false;
// toggle() {
//   this.isOpen = !this.isOpen;
// }

// closeDropdown() {
//   this.isOpen = false;
// }
// Instead of isFirstClick, you can also stop propagation:
// <button (click)="toggle(); $event.stopPropagation()">Toggle</button>


// How to use HTML & TS to Table loops like Action Column
// <tr *ngFor="let row of data; let i = index">
//   <td>{{ row.name }}</td>

//   <td>
//     <div class="dropdown" (appOutsideClick)="closeDropdown(i)">
//       <button (click)="toggle(i, $event)">Toggle</button>

//       <ul *ngIf="openIndex === i">
//         <li>Edit</li>
//         <li>Delete</li>
//       </ul>
//     </div>
//   </td>
// </tr>

// openIndex: number | null = null;
// toggle(index: number, event: Event) {
//   event.stopPropagation(); // IMPORTANT
//   this.openIndex = this.openIndex === index ? null : index;
// }

// closeDropdown(index: number) {
//   if (this.openIndex === index) {
//     this.openIndex = null;
//   }
// }