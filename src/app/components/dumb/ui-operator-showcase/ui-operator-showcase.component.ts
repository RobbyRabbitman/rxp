import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Observable, shareReplay, startWith, switchMap } from 'rxjs';
import { MarbleGraph, reduceGraphs } from 'src/app/model/marble-graph';
import { ShowCase } from 'src/app/model/show-case/show-case';
import { UiMarbleGraphComponent } from '../ui-marble-graph/ui-marble-graph.component';

@Component({
  selector: 'app-ui-operator-showcase',
  standalone: true,
  imports: [CommonModule, UiMarbleGraphComponent, ReactiveFormsModule],
  templateUrl: './ui-operator-showcase.component.html',
  styleUrls: ['./ui-operator-showcase.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiOperatorShowcaseComponent {
  private fb = inject(FormBuilder).nonNullable;

  public _reduced$?: Observable<any>;
  public _showCase?: ShowCase<unknown[], unknown>;

  public form = this.fb.group({
    in: this.fb.array<MarbleGraph<unknown>>([]),
  });

  @Input()
  public set value(showCase: ShowCase<unknown[], unknown>) {
    this._showCase = showCase;
    if (showCase != null) {
      this.form.setControl('in', this.fb.array(showCase.graphs) as any);
      this._reduced$ = this.form.valueChanges
        .pipe(startWith(this.form.value))
        .pipe(
          switchMap((form) => reduceGraphs(form.in as any, showCase.operator)),
          shareReplay(1)
        );
    }
  }
}
