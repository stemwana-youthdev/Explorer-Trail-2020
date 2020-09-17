import { AfterViewInit, Directive, ElementRef, OnDestroy, Output } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Directive({
  selector: '[appVisible]',
})
export class VisibleDirective implements AfterViewInit, OnDestroy {
  @Output() elementVisible = new ReplaySubject<boolean>();

  private observer: IntersectionObserver;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.observer?.disconnect();

    // If the browser does not support IntersectionObserver
    if (!IntersectionObserver) {
      this.elementVisible.next(true);
      return;
    }

    this.observer = new IntersectionObserver((entries) => {
      const isIntersecting = entries[0].isIntersecting;
      this.elementVisible.next(isIntersecting);
    });
    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
