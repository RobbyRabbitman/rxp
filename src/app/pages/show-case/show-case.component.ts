import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { UiOperatorShowcaseComponent } from 'src/app/components/dumb/ui-operator-showcase/ui-operator-showcase.component';
import { SHOW_CASES } from 'src/app/model/show-case/show-case';

@Component({
  selector: 'app-show-case',
  standalone: true,
  imports: [CommonModule, UiOperatorShowcaseComponent],
  templateUrl: './show-case.component.html',
  styleUrls: ['./show-case.component.scss'],
})
export class ShowCaseComponent {
  public showCase$ = inject(ActivatedRoute).params.pipe(
    map(({ category, id }) => (SHOW_CASES as any)?.[category]?.[id])
  );
}
