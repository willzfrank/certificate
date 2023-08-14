import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { CourseType } from 'app/types';

const initialCourseState: CourseType = {
    title: 'Dance With Me My Friend',
    instructor: 'Jeremiah Lena',
    price: 10000
} 

const courseSlice = createSlice({
    name: 'coursesSlice',
    initialState: initialCourseState,
    reducers: {
        updateCourse: (state, action: PayloadAction<CourseType>) => {

        }
    }
})

export default courseSlice;