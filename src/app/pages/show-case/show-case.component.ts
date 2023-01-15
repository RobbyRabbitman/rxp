import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, map } from 'rxjs';
import { UiOperatorShowcaseComponent } from 'src/app/components/dumb/ui-operator-showcase/ui-operator-showcase.component';
import {
  LearnRxjsLinkComponent,
  LEARN_RXJS_LINK_BASE,
} from 'src/app/components/smart/links/learn-rxjs.link.component';
import {
  RxjsSrcLinkComponent,
  RXJS_SRC_LINK_BASE,
} from 'src/app/components/smart/links/rxjs-src-link.component';
import { SHOW_CASES } from 'src/app/model/show-case/show-case';

@Component({
  selector: 'app-show-case',
  standalone: true,
  imports: [
    CommonModule,
    UiOperatorShowcaseComponent,
    MatDividerModule,
    RxjsSrcLinkComponent,
    LearnRxjsLinkComponent,
    MatTooltipModule,
  ],
  templateUrl: './show-case.component.html',
  styleUrls: ['./show-case.component.scss'],
  providers: [
    { provide: RXJS_SRC_LINK_BASE, useValue: 'blob/master/src/internal' },
    { provide: LEARN_RXJS_LINK_BASE, useValue: 'learn-rxjs' },
  ],
})
export class ShowCaseComponent {
  public _categoryToRxjsSrcPathPrefix: any = {
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
    rxjsSrc: inject(ActivatedRoute).params.pipe(
      map(
        ({ category, id }) =>
          `${this._categoryToRxjsSrcPathPrefix[category]}/${id}.ts`
      )
    ),
    rxjsSrcTooltip: inject(ActivatedRoute).params.pipe(
      map(({ id }) => `Source of '${id}'`)
    ),
    learnRxjsPath: inject(ActivatedRoute).params.pipe(
      map(({ category, id }) => `operators/${category}/${id}`.toLowerCase())
    ),
    learnRxjsPathTooltip: inject(ActivatedRoute).params.pipe(
      map(({ id }) => `Code examples of '${id}'`)
    ),
    operator: inject(ActivatedRoute).params.pipe(map(({ id }) => id)),
  });
}
