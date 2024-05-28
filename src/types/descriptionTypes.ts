export type Desc = {
    _id: string
    descriptionPillName: string
    descriptionName: string
    descriptionPer: string
    descriptionQuan: string
    descriptionDur: string
    description: string
    selected: boolean
};

export interface ActionPutDescription {

    operation: string
    data: string | boolean
  
};

export interface ActionAddDescription {

    operation: string
    data: string | boolean
  
};

export interface ActionDeleteDescription {

    operation: string
    data: string | boolean
  
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

    isChange: boolean
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