import { Directive, OnChanges, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[routerInit]',
})
export class RouterInitDirective implements OnChanges {
  constructor(private router: Router) {}

  @Input() routerInit!: string;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.routerInit && changes.routerInit.currentValue) {
      this.router.navigateByUrl(changes.routerInit.currentValue);
    }
  }
}
