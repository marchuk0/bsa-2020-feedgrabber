import { createRoutine } from 'redux-saga-routines';

export const toggleMenuRoutine = createRoutine('APP:TOGGLE_MENU');

export const setFloatingMenuPos = createRoutine('APP:SET_FLOATING-MENU_POS');

export const setExpandLanguageRoutine = createRoutine('APP:SET_EXPAND_LANGUAGE_MENU');
