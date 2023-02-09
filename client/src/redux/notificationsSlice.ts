import { createSlice } from '@reduxjs/toolkit';

export interface INotification {
  id: number;
  type: string;
  text: string;
}

interface InitialState {
  notifications: INotification[];
}

const initialState: InitialState = {
  notifications: [],
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    createNotification: (state, action) => {
      const notification: INotification = {
        id: Date.now(),
        type: action.payload.type,
        text: action.payload.text,
      };

      state.notifications = [...state.notifications, notification];
    },
    deleteNotification: (state, action) => {
      const index = state.notifications.findIndex(
        (item) => item.id === action.payload
      );
      const newNotifications = [...state.notifications];
      newNotifications.splice(index, 1);
      state.notifications = newNotifications;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => action.type.endsWith('rejected'),
      (state, action) => {
        console.log(action);
        const signs = action.type.split('/');
        if (signs[1] !== 'getSortedUser' && signs[1] !== 'disconnectChat') {
          const notification: INotification = {
            id: Date.now(),
            type: 'error',
            text: `${action.payload} at ${action.type}`,
          };
          state.notifications = [...state.notifications, notification];
        }
      }
    );
  },
});

export const { createNotification, deleteNotification } =
  notificationsSlice.actions;

export default notificationsSlice.reducer;
