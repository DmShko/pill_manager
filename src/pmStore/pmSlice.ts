import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// custom types
import {
  PmInitialState,
  ActionCourses,
  Course,
  ActionPills,
  Pill,
  ChangePillProp,
  ChangeCoursePropB,
  ChangeCoursePropS,
  ChangeCoursePropA,
  ChangeCoursePropST,
  EditActionCourse,
  IsEditEction,
  PressEditEction,
  ChangePillPropB,
  ChangeCoursePropSD,
  StatisticAction,

} from "../types/types";

const pmInitialState: PmInitialState = {
  courses: [],
  tempPills: [],
  editCourse: {
    id: '',
    selected: false,
    pills: []},
  statistic: {},
  isLoading: false,
  isEdit: false,
  pressEdit: false,
  error: false,
};

const pmSlice = createSlice({
  name: "pmStorage",
  initialState: pmInitialState,
  reducers: {
    changeCourses(state, action: PayloadAction<ActionCourses>) {
      switch (action.payload.mode) {
        case "clearCourses":
          state.courses = [];
          break;
        case "changeCourse":
          const tempCourse = state.courses.find(
            (element) =>
              element.id === (action.payload.data as ChangeCoursePropB).id
          );

          if (
            tempCourse !== undefined 
          ) {
            // for string boolean
            if (
              typeof (action.payload.data as ChangeCoursePropB).prop ===
              "boolean"
            ) {
              tempCourse[action.payload.key as keyof Pick<Course, "selected">] =
                (action.payload.data as ChangeCoursePropB).prop;
            } 

            // for string futures
            if (
              typeof (action.payload.data as ChangeCoursePropS).prop ===
              "string"
            ) {
              tempCourse[action.payload.key as keyof Omit<Course, "selected" | "pills" | "status">] =
              (action.payload.data as ChangeCoursePropS).prop;
            };

            // for all string object ("pills")
            if (
              typeof (action.payload.data as ChangeCoursePropA).prop ===
              "object"
            ) {
              tempCourse[action.payload.key as keyof Pick<Course, "pills">] =
              (action.payload.data as ChangeCoursePropA).prop;
            };

          }
          break;
        case "changeStartDay":
          const temp = state.courses.find(
            (element) =>
              element.id === (action.payload.data as ChangeCoursePropSD).id
          );
          
          // for part of string object ("pills")
          if (
            typeof (action.payload.data as ChangeCoursePropSD).prop ===
            "object"
          ) {
            if (
              temp !== undefined 
            ) {
              let startElement = temp[action.payload.key as keyof Pick<Course, "pills">].find(element => element.pillName === (action.payload.data as ChangeCoursePropSD).prop.name);
   
              if(startElement !== undefined) {

                startElement.startDay = (action.payload.data as ChangeCoursePropSD).prop.value;
                
              };
            }
            
          };
          break;
        case "changeStartMounth":
            const tempCours = state.courses.find(
              (element) =>
                element.id === (action.payload.data as ChangeCoursePropSD).id
            );
            
            // for part of string object ("pills")
            if (
              typeof (action.payload.data as ChangeCoursePropSD).prop ===
              "object"
            ) {
              if (
                tempCours !== undefined 
              ) {
                let startElement = tempCours[action.payload.key as keyof Pick<Course, "pills">].find(element => element.pillName === (action.payload.data as ChangeCoursePropSD).prop.name);
               
                if(startElement !== undefined) {
                  
                  startElement.startMonth = (action.payload.data as ChangeCoursePropSD).prop.value;
                  
                };
              }
              
            };
            break;
        case "addCourse":
          state.courses = [...state.courses, action.payload.data as Course];
          break;
        case "deleteCourse":
          state.courses = state.courses.filter(
            (element) => element.id !== action.payload.data
          );
          break;
        default:
          break;
      }
    },

    changeTempPills(state, action: PayloadAction<ActionPills>) {
      switch (action.payload.mode) {
        case "clearPills":
          state.tempPills = [];
          break;
        case "freshTempPills":
          state.tempPills = action.payload.data as Pill[];
          break;
        case "addPill":
          state.tempPills = [...state.tempPills, action.payload.data as Pill];
          break;
        case "changePill":
          const temp = state.tempPills.find(
            (element) =>
              element.id === (action.payload.data as ChangePillProp).id
          );

          if (
            temp !== undefined &&
            Object.keys(temp).includes(action.payload.key)
          ) {
            // for string futures
            if (
              typeof (action.payload.data as ChangePillProp).prop ===
              "string"
            ){
              temp[action.payload.key as keyof Omit<Pill, "selectedPill">] = (
                action.payload.data as ChangePillProp
              ).prop;
            }

            // for boolean ("selectedPill") future
            if (
              typeof (action.payload.data as ChangePillPropB).prop ===
              "boolean"
            ){
              temp[action.payload.key as keyof Pick<Pill, "selectedPill">] = (
                action.payload.data as ChangePillPropB
              ).prop;
            }
          }
          break;
        case "deletePill":
          state.tempPills = state.tempPills.filter(
            (element) => element.id !== action.payload.data
          );
          break;
        default:
          break;
      }
    },

    changeEditCourse(state, action: PayloadAction<EditActionCourse>) {
      switch (action.payload.mode) {
        case "clearEditCourse":
          state.editCourse = {
            id: '',
            selected: false,
            pills: []};
          break;
        case "addEditCourse":
          state.editCourse = action.payload.data;
          break;
        default:
          break;
      }
    },

    changeStatistic(state, action: PayloadAction<StatisticAction>) {
      switch (action.payload.mode) {
        case "changePillsDay":
          state.statistic = {...state.statistic, [(action.payload.data as ChangeCoursePropST).prop.name ]: {start: (action.payload.data as ChangeCoursePropST).prop.start, days: (action.payload.data as ChangeCoursePropST).prop.value},} 
          break;
        case "deletePillsDay":
          const newStatistic: typeof state.statistic = {};
 
          const deleteKey = state.courses.find(element => element.id === state.editCourse.id)?.pills.
          find(element => element.id === action.payload.data)?.pillName;

          for(const n of Object.keys(state.statistic).filter(value => value !== deleteKey)) {

            newStatistic[n] = state.statistic[n];
          }  
          
          state.statistic = newStatistic;

          break;
        default:
          break;
      }
    },

    changeIsEdit(state, action: PayloadAction<IsEditEction>) {
      
      state.isEdit = action.payload.data;

    },

    changePressEdit(state, action: PayloadAction<PressEditEction>) {
      
      state.pressEdit = action.payload.data;

    },
  },
});

export const { changeCourses, changeTempPills, changeEditCourse, changeIsEdit, changePressEdit, changeStatistic } =
  pmSlice.actions;
export default pmSlice.reducer;
