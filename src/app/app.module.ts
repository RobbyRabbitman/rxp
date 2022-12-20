import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, inject, NgModule } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiOperatorShowcaseComponent } from './components/dumb/ui-operator-showcase/ui-operator-showcase.component';
import { ShellComponent } from './components/smart/shell/shell.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    UiOperatorShowcaseComponent,
    ShellComponent,
  ],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        languages: {
          javascript: () => import('highlight.js/lib/languages/javascript'),
        },
      },
    },
    {
      provide: APP_INITIALIZER,
      useFactory: () => {
        const registry = inject(MatIconRegistry);
        const sanitizer = inject(DomSanitizer);

        return () =>
          registry.addSvgIcon(
            'github',
            sanitizer.bypassSecurityTrustResourceUrl('assets/icons/github.svg')
          );
      },
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
