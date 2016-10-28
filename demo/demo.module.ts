import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Demo } from './demo.component';
import { StormpathModule } from '../src/stormpath.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [Demo, AppComponent],
  imports: [BrowserModule, StormpathModule],
  bootstrap: [Demo, AppComponent],
  providers: []
})
export class DemoModule {
}
