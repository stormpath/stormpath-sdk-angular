import { Directive, ElementRef, Renderer, OnInit } from '@angular/core';
import { Stormpath } from '../stormpath/index';

@Directive({
  selector: '[ifUser]'
})
export class IfUserDirective implements OnInit {

  constructor(protected stormpath: Stormpath, protected el: ElementRef, protected renderer: Renderer) {
  }

  ngOnInit(): void {
    this.stormpath.user$.subscribe(response => this.setVisibility(response));
  }

  protected setVisible(): void {
    this.renderer.setElementClass(this.el.nativeElement, 'hidden', false);
  }

  protected setHidden(): void {
    this.renderer.setElementClass(this.el.nativeElement, 'hidden', true);
  }

  protected setVisibility(result: any): void {
    if (result) {
      this.setVisible();
    } else {
      this.setHidden();
    }
  }
}
