import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  InjectionToken,
  Input,
} from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';

export const RXJS_SRC_LINK_BASE = new InjectionToken<string | undefined>('');

@Component({
  selector: 'app-rxjs-src-link',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  template: `<a mat-button color="primary" [href]="href" target="_blank"
    ><mat-icon class="mr-4">folder_open</mat-icon>{{ href }}</a
  >`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RxjsSrcLinkComponent {
  public _repo = 'https://github.com/ReactiveX/rxjs';

  @Input()
  public base = inject(RXJS_SRC_LINK_BASE, { optional: true });

  @Input()
  public path?: string;

  public get href() {
    let href = this._repo;

    if (this.base != null) href += `/${this.base}`;
    if (this.path != null) href += `/${this.path}`;
    return href;
  }
}
