// type for one pill element
export interface Pill {
    id: string
    pillName: string
    perDay: string 
    startMonth: string
    startDay: string
    quantity: string
    duration: string
    description?: string
    selectedPill: boolean
};

export interface ChangePillProp {
  _id: string
  prop: string
};

export interface ChangePillPropB {
  _id: string
  prop: boolean
};

export interface ChangeCoursePropB {
  _id: string
  prop: boolean 
};

export interface ChangeCoursePropS {
  _id: string
  prop: string 
};

export interface ChangeCoursePropSD {
  _id: string
  prop: {name: string, value: string} 
};

export type ChangeCoursePropST = {
  prop: {name: string, value: PillDate[], start: string}
};

export type ChangeFutureProp = {
  prop: {pillName: string, futureName: string, dateNumber: string, value: number | boolean}
};

export interface ChangeCoursePropA {
  _id: string
  prop: Pill[] 
};

// type for pill action argument
export interface ActionPills {
  mode: string
  data: Pill | string | ChangePillProp | ChangePillPropB | Pill[]
  key: string
};

enum CourseStatus {
    'done', 
    'suspended', 
    'not done',
    'not active',
};

// type for course action argument
export interface ActionCourses {
  mode: string
  data: Course | string | ChangeCoursePropB | ChangeCoursePropS | ChangeCoursePropA | ChangeCoursePropSD | Course[]
  key: string
};

// type for adit course action argument
export interface EditActionCourse {
  mode: string
  data: Course 
};

// type for isEdit action argument
export interface IsEditEction {
  data: boolean 
};

// type for startDate action argument
export interface StartDateEction {
  data: string 
};

// type for pressEdit action argument
export interface PressEditEction {
  data: boolean 
};

// type for statistic action argument
export interface StatisticAction {
  mode: string
  data: ChangeCoursePropST | ChangeFutureProp | string
};


// type for one courses item
export interface Course { 
    _id: string
    courseName?: string
    doctorName?: string
    docContacts?: string
    clinicName?: string
    clinicContacts?: string
    visitDate?: string
    status?: CourseStatus
    selected: boolean
    pills: Pill[]
  };
  
  // type for itialState
  export interface PmInitialState {
    courses: Course[]
    tempPills: Pill[]
    editCourse: Course
    statistic: {[key: string]: {start: string, days: PillDate[]}}
    isLoading: boolean
    isEdit: boolean
    pressEdit: boolean
    startDate: string
    error: boolean
  };

  export interface CourseItemProps {
    courses: Course
  };

  export interface PillsModalProps {
    openClose: Function
    selectedDayDrive: Function
    pillNameReset: Function
  };

  export interface Content {
    value: number
    label: string
  };

  export interface PillDate {
    position: string
    dateNumber: string
    month: string
    done: number
    status: boolean
  };
