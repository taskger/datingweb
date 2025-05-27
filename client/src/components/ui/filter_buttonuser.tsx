import React from 'react'
import { checkStatus,checkGender } from '@/providers/lib/TranslateToThai'
import { typeData ,Profile,Settings,TranslatedString} from '@/providers/lib/typeData';
import Image from 'next/image';
interface Props {
  data: typeData[];
  setGetLatLng:(localtion?: Profile['location'],email?:string) => void
  defaultLanguage : Settings
  language : keyof TranslatedString

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
      <button onClick={() => handleClick(value)} key={index} id={`${index}`} type="button" className={`flex ${genderClass(value.profile?.gender ?? '')} justify-start text-white w-full h-20 mt-2 focus:outline-none  font-normal rounded-full text-sm  text-center `}>
      <div className='relative w-22 h-20 rounded-full ring-3 ring-white'>
        <Image src={value.image && value.image !== '' ? value.image : '/user.png'} width={50} height={50} alt={`heart icon`} className='shadow-2xl w-full h-full rounded-full'/>
        <span className='absolute top-[-12px] left-[-12px] p-1 inline-flex items-center text-center justify-center rounded-lg'>
              <span className='flex justify-center items-center'>
                <Image src={'/white-heart-icon.png'} width={40} height={40} alt={`heart icon`} className='p-1'/>
              </span>
              <span className={`absolute ${value.profile?.gender == 'female' ? 'text-red-400' : 'text-blue-400' }` } >{CalculateLike(value.profile?.like?.length ?? 0) }</span>
          </span>
      </div>
      <span className='relative top-2 items-center justify-center w-70 text-start text-md pl-2 pt-2 pb-2 font-normal'>
          
          <div>
            <span>
                {props.defaultLanguage.name[props.language]} {value.profile?.name}
            </span>
            <span className='pl-5'>
                {props.defaultLanguage.gender[props.language]} {checkGender(value.profile?.gender ?? '',props.language)}
            </span>
          </div>
          <div className='pt-3'>
            <span>
                {props.defaultLanguage.age[props.language]} {value.profile?.age}
            </span>
            {value.profile ? 

            <span className='pl-5'>
                {props.defaultLanguage.status[props.language]} {checkStatus(value.profile.status ?? '',props.language)}
            </span>
              :'' }
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
