import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { UserPageComponent } from './user-page.component';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { of } from 'rxjs';
import { getAllUsers } from '../shared/users-block/store/selector';
import { User } from '../login-and-authorization/store/state';
import {Store} from "@ngrx/store";

describe('UserPageComponent', () => {
  let component: UserPageComponent;
  let fixture: ComponentFixture<UserPageComponent>;
  let mockStore: any;
  let mockLocation: any;
  let mockActivatedRoute: any;

  const mockUsers: User[] = [
    { id: 1,  userName: 'User1' },
    { id: 2,  userName: 'User2' },
  ];

  beforeEach(async () => {
    mockStore = jasmine.createSpyObj('Store', ['select']);
    mockLocation = jasmine.createSpyObj('Location', ['back']);
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy('get').and.returnValue('User1'),
        },
      },
    };

    await TestBed.configureTestingModule({
      imports: [UserPageComponent],
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Location, useValue: mockLocation },
        provideMockStore({
          selectors: [
            { selector: getAllUsers, value: mockUsers },
          ],
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserPageComponent);
    component = fixture.componentInstance;

    mockStore.select.and.returnValue(of(mockUsers));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with the correct userName from route', () => {
    expect(component.userName).toEqual('User1');
  });

  it('should find and set the correct user from store', () => {
    expect(component.user).toEqual({ id: 1, userName: 'User1' });
  });

  it('should go back when goBack is called', () => {
    component.goBack();
    expect(mockLocation.back).toHaveBeenCalled();
  });
});
