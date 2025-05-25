import {typeData} from "@/providers/lib/typeData"
import { hobbys , degree ,gender ,chinese_zodiac,western_zodiac ,status} from "@/components/data/FakeData"
export const TranslateToThai = (data : typeData) => {
  if (data.profile){
    const display = structuredClone(data.profile)
    if (data.profile.status) display.status = checkStatus(data.profile.status) 
    if (data.profile.gender)  display.gender = checkGender(data.profile.gender) 
    if (data.profile.birthday)  display.birthday = data.profile.birthday
    if (data.profile.age)  display.age = data.profile.age
    if (data.profile.chinese_zodiac)  display.chinese_zodiac = checkChineseZodiac(data.profile.chinese_zodiac) 
    if (data.profile.western_zodiac)  display.western_zodiac = checkWesternZodiac(data.profile.western_zodiac) 
    if (data.profile.group)  display.group = (data.profile.group)?.toUpperCase() || '' 
    if (data.profile.degree)  display.degree = checkDegree(data.profile.degree)
    if (!display.hobbys) {
      display.hobbys = {
        adventure:[],
        song:[],
        sport:[],
        movie:[],
        content:[],
        travel:[],
        game:[],
        selfcare:[]
      };
    }
    if (!display.lifestyle) {
      display.lifestyle = {
        pet:false,
        exercise:false,
        book:false,
        game:false,
        healthy:false,
        alcohol:false,
        smoke:false,
        weed:false
      };
    }
    display.hobbys.song = checkSong(data.profile.hobbys?.song  ?? [])
    display.hobbys.adventure = checkAdventure(data.profile.hobbys?.adventure ?? [])
    return display
  }
}
export const calculateAge = (data : string) => {
  const birthDate = new Date(data);
  const now = new Date();
  const diffTime = now.getTime() - birthDate.getTime();
  const age = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365.2425)); 
  return age;
};

export const checkStatus = (data : string) => {
  return status[data as keyof typeof status] || data;
}
export const checkGender = (data : string) => {
  return gender[data as keyof typeof gender] || data;
}
export const checkChineseZodiac = (data : string) => {
  return chinese_zodiac[data as keyof typeof chinese_zodiac] || data;
}
export const checkWesternZodiac = (data : string) => {
  return western_zodiac[data as keyof typeof western_zodiac] || data;
}

export const checkGroup = (data: string) => {
  return (data)?.toUpperCase() || '' 
}
export const checkDegree = (data: string) => {
  return degree[data as keyof typeof degree] || data;
};
export const checkAdventure = (data : string[]) => {
  return data?.map((value:string) => (hobbys.adventure[value as keyof typeof hobbys.adventure]))
}
export const checkSong = (data : string[]) => {
  return data?.map((value:string) => (hobbys.song[value as keyof typeof hobbys.song]))
}

