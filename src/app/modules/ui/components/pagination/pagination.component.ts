import {ChangeDetectionStrategy, Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Pagination} from '../../../../types/types';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent {
  @Input() pagination: Pagination | undefined;
  @Output() goTo = new EventEmitter<number>();

  get pages(): number[] {
    let pages = 0;

    if (this.pagination) {
      pages = Math.ceil(this.pagination.total / this.pagination.limit);
    }

    return Array.from(Array(pages).keys());
  }
}
