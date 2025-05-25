import React from 'react'
import { checkStatus } from '@/providers/lib/TranslateToThai'
import { typeData ,Profile,Settings,TranslatedString} from '@/providers/lib/typeData';
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
      <button onClick={() => handleClick(value)} key={index} id={`${index}`} type="button" className={`flex ${genderClass(value.profile?.gender ?? '')} justify-start text-white w-full h-20 mt-2 focus:outline-none  font-medium rounded-full text-sm  text-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}>
      <div className=' w-20 h-20 rounded-full ring-3 ring-white'>
      </div>
      <span className='relative w-70 text-start pl-2 pt-3 font-black'>
          <div>
            <span>
                {props.defaultLanguage.name[props.language]} {value.profile?.name}
            </span>
            <span className='pl-5'>
                {props.defaultLanguage.gender[props.language]} {value.profile?.gender}
            </span>
          </div>
          <div className='pt-3'>
            <span>
                {props.defaultLanguage.gender[props.language]} {value.profile?.age}
            </span>
            {value.profile ? 

            <span className='pl-5'>
                {props.defaultLanguage.status[props.language]} {checkStatus(value.profile.status ?? '')}
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
