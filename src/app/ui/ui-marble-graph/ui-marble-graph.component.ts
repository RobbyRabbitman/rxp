import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { map, merge } from 'rxjs';
import { Marble } from 'src/app/model/marble';
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

  @Output('endChange')
  public readonly endChange = new EventEmitter<{
    source: MarbleGraph<unknown>;
    value: number;
  }>();

  @Output('marbleChange')
  public readonly marbleChange = new EventEmitter<{
    source: MarbleGraph<unknown>;
    value: Marble<unknown>;
  }>();

  @Output('value')
  public readonly valueChange = merge(this.endChange, this.marbleChange).pipe(
    map((event) => event.source)
  );

  public _endChange(event: number) {
    if (this.graph != null) {
      this.graph = {
        ...this.graph,
        end: event,
        marbles: this.graph.marbles.map((marble) => ({
          ...marble,
          time: Math.min(event, marble.time),
        })),
      };
      this.endChange.next({ source: this.graph, value: event });
    }
  }

  public _marbleChange(marble: Marble<unknown>, event: number) {
    if (this.graph) {
      marble.time = event;

      const end = Math.max(
        this.graph.marbles.sort((a, b) => b.time - a.time).at(0)?.time ??
          this.max,
        this.graph.end ?? this.max
      );
      this.graph.end = end;

      this.marbleChange.next({ source: this.graph, value: marble });
    }
  }
}
