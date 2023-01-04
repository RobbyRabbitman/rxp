import { Directive, ElementRef, inject, Input } from '@angular/core';
import {
  isMarbleWithError,
  isMarbleWithValue,
  Marble,
} from 'src/app/model/marble';

@Directive({
  selector: '[appUiMarble]',
  standalone: true,
})
export class UiMarbleDirective {
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);

  @Input()
  public set appUiMarble(marble: Marble<unknown>) {
    const thumb = this.element.nativeElement.querySelector('.mat-slider-thumb');
    if (thumb != null) {
      thumb.innerHTML = String(
        isMarbleWithValue(marble) ? marble.value ?? '' : '!'
      );
      if (isMarbleWithError(marble)) thumb.classList.add('marble-error');
      else thumb.classList.remove('marble-error');
    }
  }
}
