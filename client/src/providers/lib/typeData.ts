export interface typeData {
  _id:string
  email:string,
  role:string,
  language?:string,
  image?:string,
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

export type GeneralKey =
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
  | 'empty_form_edit'
  | 'empty_form_create'
  | 'edit'
  | 'create'
  | 'delete'
  | 'success_delete'
  | 'permission_delete'
  | 'text_confirm_delete'
  | 'submit_delete'
  | 'cancel'
  | 'email'
  | 'admin_cant_delete_self'
  | 'location'
  | 'facebook'
  | 'instragram'
  | 'telephone'
  | 'age_more_eighteen'
  | 'kilometers'
  | 'permission_create'
  | 'create_email_have'
  | 'laglngempty'
  | 'location_current'
  | 'location_in_system'
  | 'success_create'
  ;


export type GenderKey = 'male' | 'female';
export type RoleKey ='admin' | 'user' ;
export type DegreeKey = 'middle_school' | 'high_school' |
"vocational" | "high_vocational" | "diploma" | "bachelors" | "masters" | "doctorate";
export type ChineseZodiacKey =
  | 'rat' | 'ox' | 'tiger' | 'rabbit' | 'dragon' | 'snake'
  | 'horse' | 'goat' | 'monkey' | 'rooster' | 'dog' | 'pig';

export type WesternZodiacKey =
  | 'aries' | 'taurus' | 'gemini' | 'cancer' | 'leo' | 'virgo'
  | 'libra' | 'scorpio' | 'sagittarius' | 'capricorn' | 'aquarius' | 'pisces';

export type StatusKey =
  | 'single' | 'separated' | 'divorced' | 'widowed'
  | 'open_relationship' | 'prefer_not_to_say';

export type WorldEthnicityKey =
  | 'asian' | 'east_asian' | 'southeast_asian' | 'south_asian'
  | 'central_asian' | 'middle_eastern' | 'european'
  | 'african' | 'americas' | 'latino';

export type WorldReligionKey =
  | 'buddhism' | 'christianity' | 'islam' | 'hinduism' | 'sikhism'
  | 'judaism' | 'taoism' | 'confucianism' | 'jainism' | 'non_religious';

  export type HobbyCategory =
  | 'adventure'
  | 'song'
  | 'sport'
  | 'movie'
  | 'content'
  | 'travel'
  | 'game'
  | 'selfcare';

export type Settings = Record<GeneralKey, TranslatedString>;
export type SettingGender = Record<GenderKey, TranslatedString>;
export type SettingRole = Record<RoleKey, TranslatedString>;
export type SettingDegree = Record<DegreeKey, TranslatedString>;
export type SettingChineseZodiac = Record<ChineseZodiacKey, TranslatedString>;
export type SettingWesternZodiac = Record<WesternZodiacKey, TranslatedString>;
export type SettingStatus = Record<StatusKey, TranslatedString>;
export type SettingWorldEthnicities = Record<WorldEthnicityKey, TranslatedString>;
export type SettingWorldReligions = Record<WorldReligionKey, TranslatedString>;
export type SettingHobbyCategory = Record<HobbyCategory, TranslatedString>;
export type SettingOther =
  | SettingGender
  | SettingRole
  | SettingDegree
  | SettingChineseZodiac
  | SettingWesternZodiac
  | SettingStatus
  | SettingWorldEthnicities
  | SettingWorldReligions;
export type CategoryNameHobby = | 'adventure' | 'song' | 'content' | 'game' | 'movie'
  | 'selfcare' | 'sport' | 'travel'
export type LifestyleKey = 'pet' | 'exercise' | 'book' | 'game' | 'healthy' | 'alcohol' | 'smoke' | 'weed';
export type CategoryProfile = 'gender' | 'status' | 'ethnicity' | 'religion'
| 'western_zodiac' | 'chinese_zodiac' | 'group'
| 'degree' | 'university'

export type SessionGoogle = {
  user: {
    name: string
    email: string
    image: string
  }
  expires: string // หรือใช้ Date ถ้าคุณจะทำการแปลงเป็น Date object
}