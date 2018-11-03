import { Component, ViewChild, AfterViewInit, ElementRef, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// @Component({
//   selector: 'modal-content',
//   templateUrl: './description.component.html',
//   styleUrls: ['./description.component.scss']
// })
// export class DescriptionModalContent {

//   constructor(public activeModal: NgbActiveModal) {}
// }


@Component({
  selector: 'app-description',
  template: '',
})

export class DescriptionComponent {
  @ViewChild('basicModal') content;

  constructor (private modalService: NgbModal) {}

  product;
  
 public open(product) {
  this.product = product;
  
  
  this.content.nativeElement.show();

    // const modalRef = this.modalService.open(DescriptionComponent);
    // modalRef.componentInstance.product = product;
  }
}
