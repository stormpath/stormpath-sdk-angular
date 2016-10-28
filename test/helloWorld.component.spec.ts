import {
  inject,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import {expect} from 'chai';
import {HelloWorld} from './../src/helloWorld.component';
import {Stormpath} from '../src';
import { StormpathModule } from '../src/stormpath.module';

describe('hello-world component', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [StormpathModule]});
  });

  it('should say hello world', () => {
    const fixture: ComponentFixture<HelloWorld> = TestBed.createComponent(HelloWorld);
    fixture.detectChanges();
    expect(fixture.nativeElement.innerHTML.trim()).to.equal('Hello world from the Stormpath Angular SDK module!');
  });

});
