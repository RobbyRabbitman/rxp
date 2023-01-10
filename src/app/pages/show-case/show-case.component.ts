import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, map } from 'rxjs';
import { UiOperatorShowcaseComponent } from 'src/app/components/dumb/ui-operator-showcase/ui-operator-showcase.component';
import {
  RxjsSrcLinkComponent,
  RXJS_SRC_LINK_BASE,
} from 'src/app/components/smart/rxjs-src-link/rxjs-src-link.component';
import { SHOW_CASES } from 'src/app/model/show-case/show-case';

@Component({
  selector: 'app-show-case',
  standalone: true,
  imports: [
    CommonModule,
    UiOperatorShowcaseComponent,
    MatDividerModule,
    RxjsSrcLinkComponent,
    MatTooltipModule,
  ],
  templateUrl: './show-case.component.html',
  styleUrls: ['./show-case.component.scss'],
  providers: [
    { provide: RXJS_SRC_LINK_BASE, useValue: 'blob/master/src/internal' },
  ],
})
export class ShowCaseComponent {
  public _categoryToPath: any = {
    combination: 'operators',
    conditional: 'operators',
    creation: 'observable',
    errorHandling: 'operators',
    filtering: 'operators',
    transformation: 'operators',
    utility: 'operators',
  };

  public vm$ = combineLatest({
    showCases: inject(ActivatedRoute).params.pipe(
      map(({ category, id }) =>
        (SHOW_CASES as any)?.[category]?.[id] instanceof Array
          ? (SHOW_CASES as any)?.[category]?.[id]
          : [(SHOW_CASES as any)?.[category]?.[id]]
      )
    ),
    path: inject(ActivatedRoute).params.pipe(
      map(({ category, id }) => `${this._categoryToPath[category]}/${id}.ts`)
    ),
    operator: inject(ActivatedRoute).params.pipe(map(({ id }) => id)),
    tooltip: inject(ActivatedRoute).params.pipe(
      map(({ id }) => `Source of '${id}'`)
    ),
  });
}
