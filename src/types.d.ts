export interface IForm {
  description: string,
  category: string,
  calories: number,
}

export interface IMeal extends IForm {
  id: string,
}

export interface IMealApi {
  [key: string]: IMeal;
}