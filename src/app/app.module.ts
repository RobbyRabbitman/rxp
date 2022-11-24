import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiOperatorShowcaseComponent } from './components/dumb/ui-operator-showcase/ui-operator-showcase.component';
import { ShellComponent } from './components/smart/shell/shell.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    UiOperatorShowcaseComponent,
    ShellComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
