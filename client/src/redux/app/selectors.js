import { createSelector } from 'reselect';

const app = state => state.App.app;
const socket = state => state.App.socket;

export const selectApp = createSelector(
  [app],
  app => app,
);

export const selectSocket = createSelector(
  [socket],
  socket => socket,
);
