import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

interface IConfig {
  mobile: number;
  tablet: number;
}

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[onlyForScreen]'
})
export class OnlyForScreenDirective {

  config: IConfig;
  viewportWidth: number;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) {
      this.config = {
        mobile: 600,
        tablet: 1200
      };
      this.viewportWidth = window.screen.width;
    }

  @Input() set onlyForScreen(device: string) {
    if (this.determineDevice() === device) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

  private determineDevice(): string {
    if (this.viewportWidth < this.config.mobile) {
      return 'mobile';
    } else if (this.config.mobile <= this.viewportWidth && this.viewportWidth < this.config.tablet) {
      return 'tablet';
    } else if (this.config.tablet <= this.viewportWidth) {
      return 'desktop';
    }
  }

}

