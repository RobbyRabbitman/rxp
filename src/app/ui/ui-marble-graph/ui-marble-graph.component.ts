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
    end: 75,
    marbles: [
      { time: 0, value: 1, id: 1 },
      { time: 5, value: 2, id: 2 },
      { time: 60, value: 3, id: 3 },
      { time: 70, value: 4, id: 4 },
    ],
  };

  @Input()
  public min = 0;

  @Input()
  public max = 100;

  public _endChange(end: number) {
    if (this.graph != null)
      this.graph = {
        ...this.graph,
        end: end,
        marbles: this.graph.marbles.map((marble) => ({
          ...marble,
          time: Math.min(end, marble.time),
        })),
      };
  }

  public _calcEndAfterMarbleChange(graph: MarbleGraph<unknown>) {
    const end = Math.max(
      graph.marbles.sort((a, b) => b.time - a.time).at(0)?.time ?? this.max,
      graph.end ?? this.max
    );
    graph.end = end;
    return end;
  }
}
