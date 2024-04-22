// type for one pill element
export interface Pill {
    id: string
    pillName: string
    perDay?: string 
    quantity?: string
    duration?: string
    description?: string
};

export interface ChangeProp {
  id: string
  prop: string
};

// type for pill action argument
export interface ActionPills {
  mode: string
  data: Pill | string | ChangeProp
  key: string
};

enum CourseStatus {
    'done', 
    'suspended', 
    'not done',
    'not active',
  };

// type for course action argument
export interface ActionCourse {
  mode: string
  data: Courses | string | ChangeProp
  key: string
};

// type for one courses item
export interface Courses { 
    id: string
    courseName?: string
    doctorName?: string
    docContacts?: string
    clinicName?: string,
    clinicContacts?: string,
    visitDate?: string,
    status?: CourseStatus
    pills: Pill[]
  };
  
  // type for itialState
  export interface PmInitialState {
    courses: Courses[]
    tempPills: Pill[],
    isLoading: boolean
    error: boolean
  };

  export interface CourseItemProps {
    courses: Courses
  };
