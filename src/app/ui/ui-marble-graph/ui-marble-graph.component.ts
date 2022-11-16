import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MarbleGraph } from 'src/app/model/marble-graph';
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
  ],
  templateUrl: './ui-marble-graph.component.html',
  styleUrls: ['./ui-marble-graph.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class UiMarbleGraphComponent {
  @Input()
  public graph?: MarbleGraph<unknown> = {
    end: 70,
    marbles: [
      { time: 0, value: 1 },
      { time: 5, value: 2 },
      { time: 60, value: 3 },
      { time: 100, value: 4 },
    ],
  };

  @Input()
  public min = 0;

  @Input()
  public max = 100;
}
