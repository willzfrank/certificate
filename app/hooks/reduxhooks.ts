import { AppDispatch, RootState } from "app/types";
import { TypedUseSelectorHook } from "react-redux";

import { useSelector, useDispatch } from "react-redux";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;