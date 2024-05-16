import { Course } from './types';

export interface addCourseArgs {
    data: Course
    token: string
};

export interface deleteArgs {
    id: string
    token: string
};

export interface addCourseInitialState {
    isLoading: boolean
    error: string
    token: string
};

export interface getCoursesInitialState {

    freshCourses: Course[]
    isLoading: boolean
    error: string
};

export interface getCoursesArgs {
 
    token: string
};

export interface delCoursesInitialState {
 
    isLoading: boolean
    error: string
};