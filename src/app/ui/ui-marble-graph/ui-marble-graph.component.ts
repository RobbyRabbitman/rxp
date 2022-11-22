import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { Subject, takeUntil } from 'rxjs';
import { Marble } from 'src/app/model/marble';
import { MarbleGraph } from 'src/app/model/marble-graph';
import { filterNullish } from 'src/app/util/rxjs';
import { UiMarbleDirective } from './ui-marble.directive';

@Component({
  selector: 'app-ui-marble-graph',
  standalone: true,
  imports: [
    CommonModule,
    MatSliderModule,
    MatDividerModule,
    MatIconModule,
    UiMarbleDirective,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UiMarbleGraphComponent),
      multi: true,
    },
  ],
  templateUrl: './ui-marble-graph.component.html',
  styleUrls: ['./ui-marble-graph.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class UiMarbleGraphComponent
  implements OnInit, OnDestroy, ControlValueAccessor
{
  private destroy$ = new Subject<void>();
  private fb = inject(FormBuilder);

  public form = this.fb.group({
    end: null as number | null,
    marbles: this.fb.nonNullable.array<Marble<unknown>>([]),
  });

  @Input()
  public set value(value: MarbleGraph<unknown> | undefined) {
    if (value != null) {
      this.form.controls.end.setValue(value.end ?? null, {
        emitEvent: false,
      });
      this.form.setControl(
        'marbles',
        this.fb.nonNullable.array(value.marbles),
        { emitEvent: false }
      );

      // hm setting controls overrides valuechanges or smth.. -> not in oninit
      this.form.controls.marbles.valueChanges
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (marbles) => {
            this.form.patchValue(
              {
                end: Math.max(
                  marbles.sort((a, b) => b.time - a.time).at(0)?.time ??
                    this.max,
                  this.form.controls.end.value ?? this.max
                ),
              },
              { emitEvent: false }
            );
          },
        });
    }
  }

  @Input()
  public min = 0;

  @Input()
  public max = 100;

  @Input()
  public disabled = false;

  @Output('value')
  public readonly valueChange = this.form.valueChanges;

  public ngOnInit(): void {
    this.form.controls.end.valueChanges
      .pipe(filterNullish, takeUntil(this.destroy$))
      .subscribe({
        next: (end) =>
          this.form.patchValue(
            {
              marbles: this.form.value.marbles?.map((marble) => ({
                ...marble,
                time: Math.min(end, marble.time),
              })),
            },
            { emitEvent: false }
          ),
      });

    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe({
      next: (value) => this.onChangeFn?.(value),
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.complete();
  }

  // Control Value Accessor
  private onChangeFn: any;
  private onTouchedFn: any;

  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
