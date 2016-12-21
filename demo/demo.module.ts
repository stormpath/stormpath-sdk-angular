import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StormpathModule } from '../src/stormpath.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, StormpathModule],
  bootstrap: [AppComponent],
  providers: []
})
export class DemoModule {
}
