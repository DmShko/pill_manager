// type for itialState
export interface singUpInitialState {

    isLoading: boolean
    error: string
    email: string
    userName: string
   
};

/**Async */
export interface SignUpArgs {
  name: string
  email: string
  password: string
};

export interface SignUpRes {
  data: {
    user: {
        email: string,
    }
  }
};