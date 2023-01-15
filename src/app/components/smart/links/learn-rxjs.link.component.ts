import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  InjectionToken,
  Input,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export const LEARN_RXJS_LINK_BASE = new InjectionToken<string | undefined>('');

@Component({
  selector: 'app-learn-rxjs-link',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  template: `<a mat-button color="primary" [href]="href" target="_blank"
    ><mat-icon class="mr-4">school</mat-icon>{{ href }}</a
  >`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LearnRxjsLinkComponent {
  public _domain = 'https://www.learnrxjs.io';

  @Input()
  public base = inject(LEARN_RXJS_LINK_BASE, { optional: true });

  @Input()
  public path?: string;

  public get href() {
    let href = this._domain;

    if (this.base != null) href += `/${this.base}`;
    if (this.path != null) href += `/${this.path}`;
    return href;
  }
}
