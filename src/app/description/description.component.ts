import { Component, ViewChild, AfterViewInit, ElementRef, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'modal-content',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionModalContent {

  constructor(public activeModal: NgbActiveModal) {}
}


@Component({
  selector: 'app-description',
  template: '',
})
export class DescriptionComponent {

  constructor(private modalService: NgbModal) { }
  @ViewChild('content') content: ElementRef;
  product;
  
 public open(product) {
    const modalRef = this.modalService.open(DescriptionModalContent);
    modalRef.componentInstance.product = product;
  }
}
