import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { ChatBlockComponent } from './chat-block.component';
import { initialLoginAndAuthorizationState } from '../../login-and-authorization/store/state';
import { initialChannelsState } from '../channels-block/store/state';
import { allMessage } from './store/selector';
import { getCurrentUser } from '../../login-and-authorization/store/selector';
import { getCurrentChannels } from '../channels-block/store/selector';

describe('ChatBlockComponent', () => {
  let component: ChatBlockComponent;
  let fixture: ComponentFixture<ChatBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatBlockComponent],
      providers: [
        provideMockStore({
          initialState: {
            loginAndAuthorization: initialLoginAndAuthorizationState,
            channels: initialChannelsState,
            messages: { messages: [] },
          },
          selectors: [
            { selector: getCurrentUser, value: initialLoginAndAuthorizationState.user },
            { selector: getCurrentChannels, value: initialChannelsState.currentChannels },
            { selector: allMessage, value: [] },
          ],
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
