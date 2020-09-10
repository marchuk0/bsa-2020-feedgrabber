import {createRoutine} from "redux-saga-routines";

export const saveCommentRoutine = createRoutine("COMMENTS:SAVE");
export const updateCommentRoutine = createRoutine("COMMENTS:UPDATE");
export const deleteCommentRoutine = createRoutine("COMMENTS:DELETE");
