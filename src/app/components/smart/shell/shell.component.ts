import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  BreakpointObserver,
  Breakpoints,
  LayoutModule,
} from '@angular/cdk/layout';
import { FlatTreeControl } from '@angular/cdk/tree';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
  MatTreeModule,
} from '@angular/material/tree';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter, map, shareReplay } from 'rxjs';
import { SHOW_CASES } from 'src/app/model/show-case/show-case';

interface NavItem {
  label: string;
  path: string;
  children?: NavItem[];
}

interface NavItemNode extends Omit<NavItem, 'children'> {
  expandable: boolean;
  level: number;
}

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatTreeModule,
    LayoutModule,
  ],
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  animations: [
    trigger('fade', [
      state(
        '*',
        style({
          height: 0,
        })
      ),
      state(
        'show',
        style({
          height: '*',
        })
      ),
      transition('* => *', [animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)')]),
    ]),
  ],
})
export class ShellComponent implements OnInit {
  public route$ = inject(Router).events.pipe(
    filter((event) => event instanceof NavigationEnd) as any,
    map<NavigationEnd, string>((route) => route.urlAfterRedirects),
    shareReplay(1)
  );

  public handset$ = inject(BreakpointObserver)
    .observe([Breakpoints.Handset])
    .pipe(map((state) => state.matches));

  treeControl = new FlatTreeControl<NavItemNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    ({ children, ...rest }: NavItem, level: number) => ({
      ...rest,
      expandable: !!children && children.length > 0,
      level: level,
    }),
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  hasChild = (_: number, node: NavItemNode) => node.expandable;

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  public ngOnInit(): void {
    this.dataSource.data = Object.entries(SHOW_CASES).map(
      ([category, showCases]) => ({
        label: category.replace('_', ' '),
        path: category,
        children: Object.keys(showCases).map((showCase) => ({
          label: showCase,
          path: `${category}/${showCase}`,
        })),
      })
    );

    this.route$
      .pipe(
        map((url) => url.substring(1)),
        map((url) =>
          this.treeControl.dataNodes.filter((node) => url.startsWith(node.path))
        )
      )
      .subscribe({
        next: (nodes) =>
          nodes.forEach((active: NavItemNode) =>
            this.treeControl.expand(active)
          ),
      });
  }
}
