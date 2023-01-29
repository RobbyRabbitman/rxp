import { Directive, inject, Input } from '@angular/core';
import { MatLegacySlider } from '@angular/material/legacy-slider';
import { Marble } from 'src/app/model/marble';
import { MarbleGraph } from 'src/app/model/marble-graph';

@Directive({
  selector: '[appUiMarbleGraphStack]',
  standalone: true,
})
export class UiMarbleGraphStackDirective {
  public _slider: HTMLElement =
    inject(MatLegacySlider)._elementRef.nativeElement;

  @Input()
  public set appUiMarbleGraphStack([marble, graph]: [
    Marble<unknown>,
    MarbleGraph<unknown>
  ]) {
    const stack = graph.marbles
      .filter((x) => x.time === marble.time)
      .findIndex((x) => x === marble);
    if (stack > 0) {
      const marbleElement = this._slider.querySelector(
        '.mat-slider-thumb'
      ) as HTMLElement;
      marbleElement.style.position = 'absolute';
      marbleElement.style.top = `-${stack * 35 + 28}px`;
    }
  }
}
