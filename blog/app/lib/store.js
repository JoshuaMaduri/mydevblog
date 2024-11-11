import { configureStore } from '@reduxjs/toolkit';

// const rootReducer = {
//   menuToggle: menuReducer,
// };

export const makeStore = () => {
  return configureStore({
    reducer: {
    }
  });
};