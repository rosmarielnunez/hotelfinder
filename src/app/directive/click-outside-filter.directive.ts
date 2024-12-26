import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Directive, ElementRef, EventEmitter, Inject, OnDestroy, Output } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Directive({
  selector: '[appClickOutsideFilter]',
  standalone: true
})
export class ClickOutsideFilterDirective implements AfterViewInit, OnDestroy {
@Output() clickOutsideFilter = new EventEmitter<any>();

documentClickSubscription: Subscription | undefined;

  constructor(private element: ElementRef,
              @Inject(DOCUMENT) private document: Document
  ) { }

  ngAfterViewInit(): void {
    this.documentClickSubscription = fromEvent(this.document, 'click').pipe(filter((event) => {
      return !this.isInside(event.target as HTMLElement);
    })
  ).subscribe(() => {
    this.clickOutsideFilter.emit();
  });
  }

  isInside(elementToCheck: HTMLElement): boolean {
    return elementToCheck === this.element.nativeElement || this.element.nativeElement.contains(elementToCheck);
  }

  ngOnDestroy(): void {
    this.documentClickSubscription?.unsubscribe();
  }
}
