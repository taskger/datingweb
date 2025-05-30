import React from 'react'
import { checkStatus, checkEthnicitie, checkReligion, checkDegree, checkWesternZodiac, checkChineseZodiac } from '@/providers/lib/TranslateToThai'
import { typeData ,Profile,Settings,TranslatedString} from '@/providers/lib/typeData';
import Image from 'next/image';
interface Props {
  data: typeData[];
  setGetLatLng:(localtion?: Profile['location'],email?:string) => void
  defaultLanguage : Settings
  language : keyof TranslatedString
  setToggleBackdrop :  (value:boolean) => void

}
export default function Filter_buttonuser(props:Props) {

    const genderClass = (gender: string) => {
      if (gender === 'female') return 'filterbannerfemale';
      if (gender === 'male') return 'filterbannermale';
      return 'filterbannerother';
    };
    const handleClick = (value: typeData) => {
      if (value.profile) {
        props.setGetLatLng(value.profile.location, value.email);
      }
    };
  return (
    <>
    {props.data.map((value,index) => {
      return (
      <button onClick={() =>{ handleClick(value);props.setToggleBackdrop(false)}} key={index} id={`${index}`} type="button" className={`flex ${genderClass(value.profile?.gender ?? '')} justify-start relative w-full text-white h-20 mt-2 focus:outline-none  font-normal rounded-full text-sm  text-center `}>
      <div className=' absolute w-20 h-20'>
        <Image src={value.image && value.image !== '' ? value.image : '/user.png'} width={96} height={96} alt={`userimage`} fill className='shadow-2xl w-full h-full object-cover rounded-full ring-3 ring-white'/>
        <span className='absolute top-[-12px] left-[-12px] p-1 inline-flex items-center text-center justify-center rounded-lg'>
              <span className='flex justify-center items-center'>
                <Image src={'/white-heart-icon.png'} width={40} height={40} alt={`heart icon`} className='p-1'/>
              </span>
              <span className={`absolute ${value.profile?.gender == 'female' ? 'text-red-400' : 'text-blue-400' }` } >{CalculateLike(value.profile?.like?.length ?? 0) }</span>
          </span>
      </div>
      <span className='relative top-0 left-18 items-center justify-center w-70 text-start text-md pl-3  pb-2 font-normal'>
      <div className='pt-1'>
            <p>
                {props.defaultLanguage.name[props.language]} {value.profile?.name}
            </p>
            
            <p className='pt-1 pl-2'>
              <span>
                {props.defaultLanguage.age[props.language]} {value.profile?.age}
              </span>
              {value.profile?.ethnicity ? 
              <span className='pl-4'>
                {props.defaultLanguage.ethnicity[props.language]} {checkEthnicitie(value.profile?.ethnicity ?? '',props.language)}
              </span> 
              : value.profile?.degree ? 
              <span className='pl-4'>
                {props.defaultLanguage.degree[props.language]} {checkDegree(value.profile?.degree ?? '',props.language)}
              </span> 
               :''}
            </p>
            <p className='pt-1'>
              <span>
                {props.defaultLanguage.status[props.language]} {checkStatus(value.profile?.status ?? '',props.language)}
              </span>
              {value.profile?.religion ? 
              <span className='pl-4'>
                {props.defaultLanguage.religion[props.language]} {checkReligion(value.profile?.religion ?? '',props.language)}
              </span>
              : value.profile?.western_zodiac ? 
              <span className='pl-4'>
                {props.defaultLanguage.western_zodiac[props.language]} {checkWesternZodiac(value.profile?.western_zodiac ?? '',props.language)}
              </span>
              : value.profile?.chinese_zodiac ?
              <span className='pl-4'>
                {props.defaultLanguage.chinese_zodiac[props.language]} {checkChineseZodiac(value.profile?.chinese_zodiac ?? '',props.language)}
              </span>
              : ''}
            </p>
          </div>
          
          <div>
          </div>
      </span>
    </button>)
    })}
    </>
  )
}


export  function CalculateLike(value:number) {
  let data = value
  if(value >= 1000){
    data = data/1000
    return `${data.toFixed(2)}K`
  }else{
    return data
  }
  
}
