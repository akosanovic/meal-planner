import { Directive, HostListener, HostBinding, ElementRef, Renderer2, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appDropdown]',
  exportAs:'appDropdown'
})

export class DropdownDirective implements OnDestroy{
  nativeEl = null;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
  }

  @HostListener('click') toggleDropdown() {
    this.nativeEl =  this.elementRef.nativeElement;
    const dropdownMenu = this.nativeEl.querySelector('.dropdown-menu');

    if (this.nativeEl.classList.contains('show')) {
      this.renderer.removeClass(this.nativeEl, 'show');
      this.renderer.removeClass(dropdownMenu, 'show');
      return;
    }
    else {
      this.renderer.addClass(this.nativeEl, 'show');
      this.renderer.addClass(dropdownMenu, 'show');
    }
  }

  ngOnDestroy() {
    this.nativeEl = null;
  }
}
