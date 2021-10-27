import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Department, departments, GetUsersResponse, level, Level, User} from '../../../../types/types';
import {UsersService} from '../../services/users.service';
import {BehaviorSubject, combineLatest, Observable, of, Subject, Subscription} from 'rxjs';
import {catchError, debounceTime, switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit, OnDestroy {
  readonly departments: Department[] = [...departments];
  readonly levels: Level[] = [...level];

  departmentChange$ = new BehaviorSubject<Department | undefined>(undefined);
  levelChange$ = new BehaviorSubject<Level | undefined>(undefined);
  reload$ = new BehaviorSubject<void>(undefined);
  pageChange$ = new BehaviorSubject<number>(0);
  sub!: Subscription;

  trackById = (i: number, user: User) => user.id;

  result$ = new BehaviorSubject<{
    error?: Error;
    loading: boolean;
    response?: GetUsersResponse;
  }>({
    loading: false
  });

  constructor(private usersService: UsersService) {
  }

  ngOnInit(): void {
    this.sub = combineLatest([
      this.departmentChange$,
      this.levelChange$,
      this.pageChange$,
      this.reload$,
    ])
      .pipe(
        tap(() => {
          this.result$.next({
            ...this.result$.getValue(),
            error: undefined,
            loading: true,
          });
        }),
        // adding a debouncing: waits until 300ms have passed to continue the operation
        debounceTime(300),
        switchMap(([department, level, page]) => {
          return this.usersService.getUsers({
            page,
            department,
            level,
            delay: {
              min: 500,
              max: 750
            },
            errorRate: 0.1,
          }).pipe(
            tap((response) => {
              this.result$.next({
                loading: false,
                response,
              });
            }),
            catchError(error => {
              this.result$.next({
                loading: false,
                error,
              });
              return of(null);
            })
          );
        }),
        tap((response) => console.log('response', response)),
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  goToPage(pageNumber: number) {
    console.log('go to page', pageNumber);
    this.pageChange$.next(pageNumber);
  }

  onDepartmentChange(value: string) {
    console.log('department', value);
    this.departmentChange$.next(value as Department);
  }

  onLevelChange(value: string) {
    console.log('level', value);
    this.levelChange$.next(value as Level);
  }

  onReload() {
    console.log('on reload');
    this.reload$.next();
  }
}
