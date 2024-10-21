import { ActionReducer, MetaReducer } from '@ngrx/store';
import { AppState } from './app.state';

export function debugMetaReducer(
  reducer: ActionReducer<AppState>
): ActionReducer<AppState> {
  return function (state, action) {
    const nextState = reducer(state, action);
    return nextState;
  };
}

export const metaReducers: MetaReducer<AppState>[] = [debugMetaReducer];
