import {
  Directive,
  ViewContainerRef,
  ComponentFactoryResolver,
  Input,
} from '@angular/core';
import { AircodeComponents } from 'src/app/aircode.components';

@Directive({
  selector: '[inject]',
})
export class InjectDirective {
  @Input('inject') components: any;

  constructor(
    public container: ViewContainerRef,
    private resolver: ComponentFactoryResolver
  ) {
    setTimeout(() => {
      container.clear();
      if (this.components instanceof Array) {
        this.components.map(this.injectComponent.bind(this));
      } else {
        this.injectComponent(this.components);
      }
    });
  }

  private injectComponent(component: any) {
    // RESOLVE COMPONENT
    const angularComponent = AircodeComponents[component.componentId];

    // LOAD COMPONENT
    const componentRef = this.container.createComponent(
      this.resolver.resolveComponentFactory<any>(angularComponent)
    );

    // INIT PROPS
    componentRef.instance.ctrl = component;
  }
}
