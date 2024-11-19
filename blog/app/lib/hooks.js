import { useDispatch, useSelector, useStore } from "react-redux";

// export const useAppDispatch = useDispatch()
// export const useAppSelector = useSelector()
// export const useAppStore = useStore()

// Custom hook to return dispatch function
export const useAppDispatch = () => useDispatch();

// Custom hook to access the selector
export const useAppSelector = (selector) => useSelector(selector);

// Custom hook to access the Redux store
export const useAppStore = () => useStore();