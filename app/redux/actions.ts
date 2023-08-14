import * as AppSlices from './slices';

export const { 
    updateUser, 
    updateUserProfessions, 
    updateUserToken, 
    logoutUser 
} = AppSlices.userSlice.actions;
export const { updateCourse } = AppSlices.courseSlice.actions;
