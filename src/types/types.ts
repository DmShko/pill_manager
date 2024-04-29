// type for one pill element
export interface Pill {
    id: string
    pillName: string
    perDay?: string 
    quantity?: string
    duration?: string
    description?: string
    selectedPill: boolean
};

export interface ChangePillProp {
  id: string
  prop: string
};

export interface ChangePillPropB {
  id: string
  prop: boolean
};

export interface ChangeCoursePropB {
  id: string
  prop: boolean 
};

export interface ChangeCoursePropS {
  id: string
  prop: string 
};

export interface ChangeCoursePropA {
  id: string
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
  data: Course | string | ChangeCoursePropB | ChangeCoursePropS | ChangeCoursePropA
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

// type for pressEdit action argument
export interface PressEditEction {
  data: boolean 
};


// type for one courses item
export interface Course { 
    id: string
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
    isLoading: boolean
    isEdit: boolean
    pressEdit: boolean
    error: boolean
  };

  export interface CourseItemProps {
    courses: Course
  };