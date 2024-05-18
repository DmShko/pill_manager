import { Course, Pill, PillDate } from './types';

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

export interface patchCoursesArgs {
    id: string
    token: string
    prop: string | boolean | Pill[]
    key: string
};

export interface delCoursesInitialState {
 
    isLoading: boolean
    error: string
};

export interface patchCoursesInitialState {
 
    isLoading: boolean
    error: string
};

export interface putStatisticArgs {

    id: string
    token: string
    data: Pill[]

};

export interface allStatisticArgs {
    
    token: string

};

export interface addStatisticArgs {

    token: string
    data: {pillName: string, day: PillDate, }

};


export interface allStatisticInitialState {
 
    statistics: Pill[]
    isLoading: boolean
    error: string
};