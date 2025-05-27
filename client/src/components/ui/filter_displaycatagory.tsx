import React from 'react'
import { checkAdventureString, checkChineseZodiac, checkContentString, checkDegree,checkEthnicitie,checkGameString,checkGender,checkGroup, checkMovieString, checkReligion, checkSelfcaretring, checkSongString, checkSportString, checkStatus, checkTravelString, checkWesternZodiac } from '@/providers/lib/TranslateToThai'
import { Lang } from '@/providers/lib/typeData';
interface FilterDisplayCategoryProps {
  name: 'degree' | 'group' | 'gender' | 'status' | 'ethnicity' |'religion' | 
  'western_zodiac' | 'chinese_zodiac' |'degree' |'group' | 'university' | 'lifestyle' |
  'adventure'| 'song' |'content'|'game'|'movie'|'selfcare'|'sport'|'travel'; 
  data: string[];
  updateDataSet: (name: string, value: string) => void;
  lang:Lang
}
export default function filter_displaycatagory(props:FilterDisplayCategoryProps) {
  const translators = {
    gender: checkGender,
    status: checkStatus,
    ethnicity: checkEthnicitie,
    religion: checkReligion,
    western_zodiac: checkWesternZodiac,
    chinese_zodiac: checkChineseZodiac,
    degree: checkDegree,
    group: checkGroup,
    university: checkDegree,
    lifestyle: checkGroup,
    adventure: checkAdventureString,
    song: checkSongString,
    content: checkContentString,
    game: checkGameString,
    movie: checkMovieString,
    selfcare: checkSelfcaretring,
    sport: checkSportString,
    travel: checkTravelString,
  }

  const translate = translators[props.name]
  
  
  return (
    <>
      {props.data && props.data.map((value,index) =>   
        <span key={index}>
          <span className='border border-zinc-300 inline-flex items-center bg-white ml-2 mr-2 mt-2 rounded-lg '>
              <span className=' pl-2 pt-2 pb-2'>
              {translate ? translate(value,props.lang) : value}
              </span>
              <button onClick={() => {props.updateDataSet(props.name,value)}} className="ml-2 h-10 w-6 flex items-center justify-center rounded-r-lg bg-red-600 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow-lg focus:bg-red-700 focus:shadow-none active:bg-red-700 hover:bg-red-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
          </span>
        </span>
      )}
    </>
  )
}
