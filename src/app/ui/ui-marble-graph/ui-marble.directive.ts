import { Directive, ElementRef, inject, Input } from '@angular/core';
import { Marble } from 'src/app/model/marble';

@Directive({
  selector: '[appUiMarble]',
  standalone: true,
})
export class UiMarbleDirective {
  private readonly element = inject(ElementRef<HTMLElement>);

  @Input()
  public set appUiMarble(marble: Marble<unknown>) {
    const thumb = this.element.nativeElement.querySelector('.mat-slider-thumb');
    if (thumb != null) thumb.innerHTML = String(marble.value);
  }
}
