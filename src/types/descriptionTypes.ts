export type Desc = {
    _id: string
    descriptionName: string
    description: string
    selected: boolean
};

export interface addDescriptionArgs {
    data: Desc
    token: string
};

export interface allDescriptionArgs {
  
    token: string
};

export interface addDescriptionInitialState {
    isLoading: boolean
    isLoad: boolean
    message: string
    selected: boolean
}

export interface getDescriptionInitialState {

    description: Desc[]
    isLoading: boolean
    isLoad: boolean
    message: string
}

export interface deleteDescriptionInitialState {

    isLoading: boolean
    isDelete: boolean
    message: string
}

export interface putDescriptionInitialState {

    isLoading: boolean
    message: string
}

export interface ChangeDescriptionPropB {

    _id: string
    prop: boolean 

}

export interface ChangeDescriptionPropS {

    _id: string
    prop: string 

}


export interface ActionDescription {
    mode: string
    data: Desc | string | ChangeDescriptionPropB | ChangeDescriptionPropS
    key: string
}

export interface deleteDescriptionArgs {
    id: string
    token: string
};

export interface putDescriptionArgs {

    id: string
    token: string
    data: Desc

};