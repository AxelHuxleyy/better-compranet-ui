import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TypedDispatch<T> = ThunkDispatch<T, any, AnyAction>;

export const useAppDispatch = () => useDispatch<TypedDispatch<RootState>>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
