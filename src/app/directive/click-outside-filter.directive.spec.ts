import { ElementRef } from '@angular/core';
import { ClickOutsideFilterDirective } from './click-outside-filter.directive';

describe('ClickOutsideFilterDirective', () => {
  it('should create an instance', () => {
    const elementRefMock = { nativeElement: document.createElement('div') };
    const documentMock = document;
    const directive = new ClickOutsideFilterDirective(elementRefMock as ElementRef, documentMock as Document);
    expect(directive).toBeTruthy();
  });
});
