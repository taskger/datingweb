export interface typeData {
  _id:string
  email:string,
  role:string,
  language?:string,
  profile?: Profile
}

export interface Profile {
  name?:string,
  birthday?:string,
  age?:number,
  salary?:number,
  status?:string,
  gender?:string,
  ethnicity?:string,
  height?:number,
  religion?:string,
  chinese_zodiac?:string,
  western_zodiac?:string,
  group?:string,
  degree?:string,
  university?:string,
  lifestyle?:{
    pet:boolean,
    exercise:boolean,
    book:boolean,
    game:boolean,
    healthy:boolean,
    alcohol:boolean,
    smoke:boolean,
    weed:boolean
  },
  hobbys?:{
    adventure?:string[],
    song?:string[],
    sport?:string[],
    movie?:string[],
    content?:string[],
    travel?:string[],
    game?:string[],
    selfcare?:string[]
  },
  contact?:{
    facebook:string,
    ig:string,
    telephone:string
  },
  like?:string[],
  location: {
    lat: number,
    lng: number
  }
}
export type Lang = 'en' | 'th';

export type TranslatedString = Record<Lang, string>;

export type SettingsKey =
  | 'name'
  | 'gender'
  | 'age'
  | 'status'
  | 'salary'
  | 'select'
  | 'found_filter_people'
  | 'height'
  | 'ethnicity'
  | 'religion'
  | 'western_zodiac'
  | 'chinese_zodiac'
  | 'group_blood'
  | 'degree'
  | 'university'
  | 'hobby'
  | 'adventure'
  | 'song'
  | 'content'
  | 'game'
  | 'movie'
  | 'selfcare'
  | 'sport'
  | 'travel'
  | 'lifestyle'
  | 'filter_use'
  | 'filter'
  | 'reset_filter'
  | 'language'
  | 'birthday'
  | 'select_user'
  | 'role'
  | 'submit_button'
  | 'reset_button'
  | 'permisson_update'
  | 'success_update'
  | 'update_fail'
  | 'error'
  | 'success_but'
  | 'empty_form'
  | 'edit'
  | 'create'
  | 'delete'
  | 'success_delete'
  | 'permission_delete'
  | 'text_confirm_delete'
  | 'submit_delete'
  | 'cancel'
  | 'admin_cant_delete_self';

export type Settings = Record<SettingsKey, TranslatedString>;
export type CategoryNameHobby = | 'adventure' | 'song' | 'content' | 'game' | 'movie'
  | 'selfcare' | 'sport' | 'travel'
export type LifestyleKey = 'pet' | 'exercise' | 'book' | 'game' | 'healthy' | 'alcohol' | 'smoke' | 'weed';
export type CategoryProfile = 'gender' | 'status' | 'ethnicity' | 'religion'
| 'western_zodiac' | 'chinese_zodiac' | 'group'
| 'degree' | 'university'