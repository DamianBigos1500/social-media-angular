import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
})
export class DropdownComponent {
  isOpen: boolean = false;
  selectedOption: string | null = null;

  constructor(private elementRef: ElementRef) {}

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  selectOption(option: string): void {
    this.selectedOption = option;
    this.isOpen = false;
    // Do something with the selected option
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }
}
