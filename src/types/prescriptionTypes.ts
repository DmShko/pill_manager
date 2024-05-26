import { Course, Pill, } from './types';

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

export type DayStatistic = {
    
    _id: string
    pillName: string
    dateNumber: string
    month: string
    done: number
    reschedule: boolean
    status: boolean
    
};

export interface addStatisticArgs {

    token: string
    data: DayStatistic

};

export interface allStatisticInitialState {
 
    statistics: DayStatistic[]
    isLoad: boolean
    isLoading: boolean
    error: string
};

export interface addStatisticInitialState {
 
    isLoad: boolean;
    isLoading: boolean
    error: string
};

export interface patchStatisticArgs {

    token: string
    data: {id: string, prop: { key: string, value: number}}

};

export interface patchStatisticInitialState {

    isLoad: boolean
    isLoading: boolean
    error: string
};