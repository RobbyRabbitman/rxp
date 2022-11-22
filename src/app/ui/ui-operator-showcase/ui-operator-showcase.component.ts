import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {
  BehaviorSubject,
  combineLatest,
  Observable,
  shareReplay,
  startWith,
  switchMap,
} from 'rxjs';
import { MarbleGraph, reduceGraphs } from 'src/app/model/marble-graph';
import { filterNullish } from 'src/app/util/rxjs';
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
  private _operator$ = new BehaviorSubject<any>(undefined);

  public form = this.fb.group({
    in: this.fb.array<MarbleGraph<unknown>>([]),
  });

  public reduced$?: Observable<any>;

  @Input()
  public set value(graphs: MarbleGraph<unknown>[]) {
    if (graphs != null) {
      this.form.setControl('in', this.fb.array(graphs));
      this.reduced$ = combineLatest([
        this.form.valueChanges.pipe(startWith(this.form.value)),
        this._operator$.pipe(filterNullish),
      ]).pipe(
        switchMap(([form, operator]) => reduceGraphs(form.in as any, operator)),
        shareReplay(1)
      );
    }
  }

  @Input()
  public set operator(operator: any) {
    this._operator$.next(operator);
  }
}
