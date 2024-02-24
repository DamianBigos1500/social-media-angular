import {
  ComponentFactoryResolver,
  Inject,
  Injectable,
  Injector,
  TemplateRef,
} from '@angular/core';
import { ModalComponent } from '../components/modal/modal.component';
import { DOCUMENT } from '@angular/common';
import { Subject } from 'rxjs';

@Injectable()
export class ModalService {
  private newElementRef: any;
  private modalNotifier?: Subject<string>;

  constructor(
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    @Inject(DOCUMENT) private document: Document
  ) {}

  open(content: TemplateRef<any>, options?: { size: string; title: string }) {
    const modalComponentFactory =
      this.resolver.resolveComponentFactory(ModalComponent);
    const contentViewRef = content.createEmbeddedView(null);
    const modalComponent = modalComponentFactory.create(this.injector, [
      contentViewRef.rootNodes,
    ]);

    modalComponent.instance.size = options?.size;
    modalComponent.instance.title = options?.title;

    modalComponent.instance.closeEvent.subscribe(() => this.closeModal());
    modalComponent.instance.submitEvent.subscribe(() => this.submitModal());

    modalComponent.hostView.detectChanges();

    this.newElementRef = modalComponent.location.nativeElement
    this.document.body.prepend(this.newElementRef);
    this.modalNotifier = new Subject();
    return this.modalNotifier?.asObservable();
  }

  closeModal() {
    this.modalNotifier?.complete();
    this.newElementRef?.remove()
  }

  submitModal() {
    this.modalNotifier?.next('confirm');
    this.closeModal();
  }
}
