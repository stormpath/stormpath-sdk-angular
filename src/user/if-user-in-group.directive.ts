import { Directive, ElementRef, Input, Renderer, OnInit } from '@angular/core';
import { Stormpath } from '../stormpath/index';
import { IfUserDirective } from './if-user.directive';

@Directive({
  selector: '[ifUserInGroup]'
})
export class IfUserInGroupDirective extends IfUserDirective {
  @Input() ifUserInGroup: string;
  private authority: string[];

  ngOnInit(): void {
    this.authority = this.ifUserInGroup.replace(/\s+/g, '').split(',');
    this.stormpath.user$.subscribe(response => this.setVisibility(response));
  }

  protected setVisibility(account: any): void {
    if (account === false) {
      this.setHidden();
      // use == instead of === here because triple doesn't detect undefined
    } else if (account && account['groups'] == null) {
      // handle the fact that /login doesn't result groups
      this.stormpath.getAccount().subscribe(response => {
        return this.setVisibility(response);
      });
    } else {
      let result = this.stormpath.isInGroup(this.authority, account['groups'].items);
      super.setVisibility(result);
    }
  }
}
