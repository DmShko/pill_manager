// type for one pill element
export interface Pill {
    id: string
    pillName: string
    perDay?: string 
    quantity?: string
    duration?: string
    description?: string
};

export interface ChangePillProp {
  id: string
  prop: string
};

export interface ChangeCourseProp {
  id: string
  prop: boolean
};

// type for pill action argument
export interface ActionPills {
  mode: string
  data: Pill | string | ChangePillProp
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
  data: Course | string | ChangeCourseProp
  key: string
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
    tempPills: Pill[],
    isLoading: boolean
    error: boolean
  };

  export interface CourseItemProps {
    courses: Course
  };
