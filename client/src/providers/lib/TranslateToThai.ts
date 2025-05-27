import {Lang, typeData} from "@/providers/lib/typeData"
import { hobbys , degree ,gender ,chinese_zodiac,western_zodiac ,status,worldReligions, worldEthnicities} from "@/components/data/FakeData"

export const TranslateToThai = (data : typeData,lang:string) => {

  if (data.profile){
    const display = structuredClone(data.profile)
    if (data.profile.status) display.status = checkStatus(data.profile.status,lang) 
    if (data.profile.gender)  display.gender = checkGender(data.profile.gender,lang) 
    if (data.profile.religion)  display.religion = checkReligion(data.profile.religion,lang) 
      if (data.profile.ethnicity)  display.ethnicity = checkEthnicitie(data.profile.ethnicity,lang) 
    if (data.profile.birthday)  display.birthday = data.profile.birthday
    if (data.profile.age)  display.age = data.profile.age
    if (data.profile.chinese_zodiac)  display.chinese_zodiac = checkChineseZodiac(data.profile.chinese_zodiac,lang) 
    if (data.profile.western_zodiac)  display.western_zodiac = checkWesternZodiac(data.profile.western_zodiac,lang) 
    if (data.profile.group)  display.group = (data.profile.group)?.toUpperCase() || '' 
    if (data.profile.degree)  display.degree = checkDegree(data.profile.degree,lang)
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
    display.hobbys.song = checkSong(data.profile.hobbys?.song  ?? [],lang)
    display.hobbys.adventure = checkAdventure(data.profile.hobbys?.adventure ?? [],lang)
    display.hobbys.sport = checkSport(data.profile.hobbys?.sport  ?? [],lang)
    display.hobbys.movie = checkMovie(data.profile.hobbys?.movie ?? [],lang)
    display.hobbys.content = checkContent(data.profile.hobbys?.content  ?? [],lang)
    display.hobbys.travel = checkTravel(data.profile.hobbys?.travel ?? [],lang)
    display.hobbys.game = checkGame(data.profile.hobbys?.game  ?? [],lang)
    display.hobbys.selfcare = checkSelfcare(data.profile.hobbys?.selfcare ?? [],lang)
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

export const checkStatus = (data : string , lang : string)  => {
  
  return status[data as keyof typeof status]?.[lang as Lang] || data;
}
export const checkGender = (data : string , lang : string)  => {
  return gender?.[data as keyof typeof gender]?.[lang as Lang] || data;
}
export const checkEthnicitie= (data : string , lang : string)  => {
  return worldEthnicities?.[data as keyof typeof worldEthnicities]?.[lang as Lang] || data;
}
export const checkReligion = (data : string , lang : string)  => {
  return worldReligions?.[data as keyof typeof worldReligions]?.[lang as Lang] || data;
}

export const checkChineseZodiac = (data : string , lang : string)  => {
  return chinese_zodiac[data as keyof typeof chinese_zodiac]?.[lang as Lang] || data;
}
export const checkWesternZodiac = (data : string , lang : string)  => {
  return western_zodiac[data as keyof typeof western_zodiac]?.[lang as Lang] || data;
}

export const checkGroup = (data: string) => {
  return (data)?.toUpperCase() || '' 
}
export const checkDegree = (data: string, lang : string)  => {
  return degree[data as keyof typeof degree]?.[lang as Lang] || data;
}
export const checkAdventure = (data : string[] , lang : string) => {
    return data?.map((value:string) => (hobbys.adventure[value as keyof typeof hobbys.adventure]?.[lang as Lang]))
}
export const checkAdventureString = (data : string, lang : string) => {
    return hobbys.adventure[data as keyof typeof hobbys.adventure]?.[lang as Lang]
}
export const checkSong = (data : string[], lang : string) => {
  return data?.map((value:string) => (hobbys.song[value as keyof typeof hobbys.song]?.[lang as Lang]))
}
export const checkSongString = (data : string, lang : string) => {
  return hobbys.song[data as keyof typeof hobbys.song]?.[lang as Lang]
}
export const checkContent = (data : string[], lang : string) => {
  return data?.map((value:string) => (hobbys.content[value as keyof typeof hobbys.content]?.[lang as Lang]))
}
export const checkContentString = (data : string, lang : string) => {
  return hobbys.content[data as keyof typeof hobbys.content]?.[lang as Lang]
}
export const checkGame = (data : string[], lang : string) => {
  return data?.map((value:string) => (hobbys.game[value as keyof typeof hobbys.game]?.[lang as Lang]))
}
export const checkGameString = (data : string, lang : string) => {
  return hobbys.game[data as keyof typeof hobbys.game]?.[lang as Lang]
}
export const checkMovie = (data : string[], lang : string) => {
  return data?.map((value:string) => (hobbys.movie[value as keyof typeof hobbys.movie]?.[lang as Lang]))
}
export const checkMovieString = (data : string, lang : string) => {
  return hobbys.movie[data as keyof typeof hobbys.movie]?.[lang as Lang]
}
export const checkSelfcare = (data : string[], lang : string) => {
  return data?.map((value:string) => (hobbys.selfcare[value as keyof typeof hobbys.selfcare]?.[lang as Lang]))
}
export const checkSelfcaretring = (data : string, lang : string) => {
  return hobbys.selfcare[data as keyof typeof hobbys.selfcare]?.[lang as Lang]
}
export const checkSport = (data : string[], lang : string) => {
  return data?.map((value:string) => (hobbys.sport[value as keyof typeof hobbys.sport]?.[lang as Lang]))
}
export const checkSportString = (data : string, lang : string) => {
  return hobbys.sport[data as keyof typeof hobbys.sport]?.[lang as Lang]
}
export const checkTravel = (data : string[], lang : string) => {
  return data?.map((value:string) => (hobbys.travel[value as keyof typeof hobbys.travel]?.[lang as Lang]))
}
export const checkTravelString = (data : string, lang : string) => {
  return hobbys.travel[data as keyof typeof hobbys.travel]?.[lang as Lang]
}