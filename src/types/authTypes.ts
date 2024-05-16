// type for itialState
export interface singUpInitialState {

    isLoading: boolean
    error: string
    email: string
    userName: string
   
};

// type for itialState
export interface singInInitialState {

  isLoading: boolean
  error: string
  token: string

};

export interface logoutInitialState {

  isLoading: boolean,
  error: string,
  message: string,

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

export interface SignInArgs {
  email: string
  password: string
};

export interface SignInRes {
  data: {
    token: string
  }
};

export interface LogoutArgs {
 
  token: string
 
};