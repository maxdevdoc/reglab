import { provideAnimations } from '@angular/platform-browser/animations';
import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
  importProvidersFrom,
} from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withPreloading,
} from '@angular/router';
import { provideStore } from '@ngrx/store';
import { routes } from './app.routes';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { ChannelsEffects } from './shared/channels-block/store/effect';
import { metaReducers } from './shared/store/meta.reducer';
import { UsersEffects } from './shared/users-block/store/effect';
import { UserEffects } from './shared/user-block/store/effect';
import { ChatEffects } from './shared/chat-block/store/effect';
import { LoginAndAuthorizationEffects } from './login-and-authorization/store/effect';
import { reducers } from './shared/store';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore(reducers, { metaReducers }),
    provideEffects(),
    provideEffects(
      ChannelsEffects,
      UsersEffects,
      UserEffects,
      ChatEffects,
      LoginAndAuthorizationEffects
    ),
    provideHttpClient(),
    provideAnimations(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
      connectInZone: true,
    }),
  ],
};
