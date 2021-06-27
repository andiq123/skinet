import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss'],
})
export class PagerComponent implements OnInit {
  @Input() totalCount: number;
  @Input() pageSize: number;
  @Output() pageChanged = new EventEmitter<number>();
  constructor() {}

  ngOnInit(): void {}

  onPageChanged($event: { page: number; itemsPerPage: number }) {
    this.pageChanged.emit($event.page);
  }
}
