import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Department, departments, GetUsersResponse, level, Level} from '../../../../types/types';
import {UsersService} from '../../services/users.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit {
  readonly departments: Department[] = [...departments];
  readonly levels: Level[] = [...level];

  exampleResponse$!: Observable<GetUsersResponse>;

  constructor(private usersService: UsersService) {
  }

  ngOnInit(): void {
    this.exampleResponse$ = this.usersService.getUsers({
      page: 0,
      limit: 20,
      department: 'Development'
    });
  }

  goToPage(pageNumber: number) {
    console.log('go to page', pageNumber);

  }
}
