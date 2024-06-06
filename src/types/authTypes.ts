// type for itialState
export interface SingUpInitialState {

    isLoading: boolean
    isSignUp: boolean
    message: string
    email: string
    userName: string
   
};

// type for itialState
export interface SingInInitialState {

  isLoading: boolean
  isLogIn: boolean
  message: string
  token: string

};

export interface LogoutInitialState {
  
  isLogout: boolean
  isLoading: boolean
  message: string

};

export interface ActionSignIn {

  operation: string
  data: string | boolean

};

export interface ActionSignUp {

  operation: string
  data: string

};

export interface ActionLogout {

  operation: string
  data: boolean | string

};

export interface ActionReVerify {

  operation: string
  data: string

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
        email: string
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

export interface ReVerifyArgs {
 
  email: string
 
};

export interface ReVerifyInitialState {
 
  isLoading: boolean
  message: string
 
};