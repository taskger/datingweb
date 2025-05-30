'user client'
import React, { useEffect, useState } from 'react'
import { typeData , Settings , Profile, LifestyleKey, CategoryNameHobby, SessionGoogle, HobbyCategory, TranslatedString, GoogleGeocodeResult, Lang } from '@/providers/lib/typeData'
import Filter_form from './ui/filter_form'
import Filter_displayselect from './ui/filter_displayselect'
import Filter_accordion from './ui/filter_accordion'
import { chinese_zodiac, degree, gender ,group_blood,hobbys ,questionLifestyle, status,western_zodiac,worldEthnicities, worldReligions} from './data/FakeData'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { alovaInstance, alovaOutApi } from './data/alova'
import { calculateAge, checkChineseZodiac, checkDegree, checkEthnicitie, checkGender, checkReligion, checkStatus, checkWesternZodiac } from '@/providers/lib/TranslateToThai'
import { toast } from 'react-toastify'
import { initAccordions } from 'flowbite'
import { useRouter } from 'next/router'
interface typeProp{
   data:SessionGoogle
   userData:typeData[]
   defaultLanguage:Settings
   setGetLatLng:(localtion?: Profile['location'],email?:string) => void
   lang:Lang
   setLoading:(value:boolean) => void
}
function CreateProfile(props:typeProp) {
   const [inputLatLng, setInputLatlng] = useState<Profile['location']>()
   const [dataAdventure, setDataAdventure] = useState<Set<string>>(new Set());
   const [dataSong, setDataSong] = useState<Set<string>>(new Set());
   const [dataContent, setDataContent] = useState<Set<string>>(new Set());
   const [dataGame, setDataGame] = useState<Set<string>>(new Set());
   const [dataMovie, setDataMovie] = useState<Set<string>>(new Set());
   const [dataSelfcare, setDataSelfcare] = useState<Set<string>>(new Set());
   const [dataSport, setDataSport] = useState<Set<string>>(new Set());
   const [dataTravel, setDataTravel] = useState<Set<string>>(new Set());
   const [dataLifestyle, setDataLifestyle] = useState<Profile['lifestyle']>();
   const dataClasslistReset = new Set()
   const [inputName, setInputName] = useState('')
   const [inputGender, setInputGender] = useState('')
   const [inputHeight, setInputHeight] = useState(0)
   const [inputStatus, setInputStatus] = useState('')
   const [selectedDate, setSelectedDate] = useState<Date | null>(null);
   const [inputDegree, setInputDegree] = useState('')
   const [inputWesternZodiac, setInputWesternZodiac] = useState('')
   const [inputChineseZodiac, setInputChineseZodiac] = useState('')
   const [inputEthnicity, setInputEthnicity] = useState('')
   const [inputReligion, setInputReligion] = useState('')
   const [inputUniversity, setInputUniversity] = useState('')
   const [inputGroup, setInputGroup] = useState('')
   const [inputLocation,setInputLocation] = useState<string>('')
   const [inputFacebook,setInputFacebook] = useState<string>('')
   const [inputInstagram,setInputInstagram] = useState<string>('')
   const [inputTelephone,setInputTelephone] = useState<string>('')
   const [inputSalary, setInputSalary] = useState<number>(0)
   const [currentLocation, setCurrentLocation] = useState<Profile['location']>()
   const [booleanInputLocation, setBooleanInputLocation] = useState(false)
   const [booleanInputName, setBooleanInputName] = useState(false)
   const [booleanInputGender, setBooleanInputGender] = useState(false)
   const [booleanInputHeight, setBooleanInputHeight] = useState(false)
   const [booleanInputStatus, setBooleanInputStatus] = useState(false)
   const [booleanInputDegree, setBooleanInputDegree] = useState(false)
   const [booleanInputWesternZodiac, setBooleanInputWesternZodiac] = useState(false)
   const [booleanInputChineseZodiac, setBooleanInputChineseZodiac] = useState(false)
   const [booleanInputEthnicity, setBooleanInputEthnicity] = useState(false)
   const [booleanInputReligion, setBooleanInputReligion] = useState(false)
   const [booleanInputUniversity, setBooleanInputUniversity] = useState(false)
   const [booleanInputGroup, setBooleanInputGroup] = useState(false)
   const [booleanToggleUniversitye,setBooleanToggleUniversity] = useState<boolean>(false)
   const [toggleReload,setToggleReload] = useState<boolean>(false)
   const [getUniversity, setGetUniversity] = useState<string[]>([])
   const [searchLocation,setSearchLocation] = useState<GoogleGeocodeResult[]>()
   const {data,lang,setLoading} = props
   const router = useRouter()

   useEffect(() => {
      fetch('/world_universities.json')
         .then((res) => res.json())
         .then((data:string[]) => {
            setGetUniversity(data);
         })
         .catch((error) => {
            console.error("Error fetching universities:", error);
         });
      if (typeof initAccordions === 'function') {
         initAccordions();
      }
      }, []);
      // ข้อมูลตัวเองเข้ามาอัพครั้งเดดี่ยว
   useEffect(() => {
   if(data) {
      setInputName(data.user.name ?? '')
      setInputLatlng({lat:NaN,lng:NaN})
      setInputLocation('')
      setSelectedDate(new Date())
      setDataLifestyle({
         pet: false,
         exercise: false,
         book: false,
         game: false,
         healthy: false,
         alcohol: false,
         smoke: false,
         weed: false
       })
      // Reset boolean flags
      setBooleanInputName(false)
      setBooleanInputGender(false)
      setBooleanInputHeight(false)
      setBooleanInputEthnicity(false)
      setBooleanInputStatus(false)
      setBooleanInputDegree(false)
      setBooleanInputWesternZodiac(false)
      setBooleanInputChineseZodiac(false)
      setBooleanInputReligion(false)
      setBooleanInputUniversity(false)
      setBooleanInputGroup(false)
   }
   },[data])
   
   //ทำปุ่มเลือกสำหรับเพิ่งเข้ามา หรืออัพเดท
   useEffect(() => {
      const datamap = [
         dataAdventure,dataSong,dataContent,dataGame,dataMovie,dataSelfcare
         ,dataSport,dataTravel
      ]

      datamap.forEach(valuehobby => {
         if (valuehobby.size != 0) [...valuehobby].map(value => {
            const element = document.getElementById(`${value}profile-create`)
            element?.classList.add('selected')
            dataClasslistReset.add(value)
         })
      })
   },[dataAdventure,dataSong,dataContent,dataGame,dataMovie,dataSelfcare
      ,dataSport,dataTravel,dataClasslistReset
   ])

   const updateLifestyle = (value: LifestyleKey) => {
      setDataLifestyle((prev) => {
         const defaultdata = prev ?? {
            pet: false,
            exercise: false,
            book: false,
            game: false,
            healthy: false,
            alcohol: false,
            smoke: false,
            weed: false
          };
         return {
           ...defaultdata,
           [value]: !defaultdata[value],
         };
       });
    };
   //เช็ค Degree ว่าเป็นมต้นไหม
   useEffect(() => {
      if(inputDegree == 'middle_school' || inputDegree == 'high_school'){
         setInputUniversity('')
         setBooleanToggleUniversity(false)
      }else{
         setBooleanToggleUniversity(true)
      }
   },[inputDegree])
   const updateDataSet = (name:string,value:string) => {
      const stateMap: { [key: string]: () => void } = {
         name: () => setInputName(value),
         gender: () => setInputGender(value),
         height: () => setInputHeight(parseInt(value)),
         ethnicity: () => setInputEthnicity(value),
         status: () => setInputStatus(value),
         degree: () =>setInputDegree(value),
         western_zodiac: () => setInputWesternZodiac(value),
         chinese_zodiac: () => setInputChineseZodiac(value),
         religion: () => setInputReligion(value),
         university: () => setInputUniversity(value),
         group_blood: () => setInputGroup(value),
       }
       const getterMap: { [key: string]: () => Set<string> } = {
         adventure: () => dataAdventure,
         song: () => dataSong,
         content: () => dataContent,
         game: () => dataGame,
         movie: () => dataMovie,
         selfcare: () => dataSelfcare,
         sport: () => dataSport,
         travel: () => dataTravel,
       };

       const hobbySetMap = {
         adventure:setDataAdventure,
         song:setDataSong,
         content:setDataContent,
         game:setDataGame,
         movie:setDataMovie,
         selfcare:setDataSelfcare,
         sport:setDataSport,
         travel:setDataTravel
      }
     
       if (name in getterMap) {
         const getData = getterMap[name as CategoryNameHobby]();
         const data = new Set(getData);
         if (data.has(value)){
            data.delete(value)
            const element = document.getElementById(`${value}profile-create`)
            element?.classList.remove('selected')
            dataClasslistReset.delete(value)
         }else{
            data.add(value)
         }
         hobbySetMap[name as CategoryNameHobby](new Set(data))
       } else if (name in stateMap) {
         stateMap[name]();
       } else {
         console.warn("Unknown name", name);
       }
 
   }
   const hobbyCategories = [
   { name: 'adventure', data: hobbys.adventure },
   { name: 'song', data: hobbys.song },
   { name: 'content', data: hobbys.content },
   { name: 'game', data: hobbys.game },
   { name: 'movie', data: hobbys.movie },
   { name: 'selfcare', data: hobbys.selfcare },
   { name: 'sport', data: hobbys.sport },
   { name: 'travel', data: hobbys.travel },
   ];
   const setNull = () => {
      setInputName('')
      setInputGender( '')
      setInputHeight(0)
      setInputStatus('')
      setInputEthnicity('')
      setSelectedDate(new Date())
      setInputDegree( '')
      setInputWesternZodiac('')
      setInputChineseZodiac('')
      setInputReligion('')
      setInputUniversity('')
      setInputGroup( '')
      setInputSalary(0)
      setInputFacebook('')
      setInputInstagram('')
      setInputTelephone('')
      setInputLatlng({lat:NaN,lng:NaN})
      setInputLocation('')
      setDataLifestyle({
         pet: false,
         exercise: false,
         book: false,
         game: false,
         healthy: false,
         alcohol: false,
         smoke: false,
         weed: false})
      const hobbymap = {
         adventure:setDataAdventure,
         song:setDataSong,
         content:setDataContent,
         game:setDataGame,
         movie:setDataMovie,
         selfcare:setDataSelfcare,
         sport:setDataSport,
         travel:setDataTravel
      }
         
      Object.entries(hobbymap).forEach(([,value]) => {
         [...dataClasslistReset].map(classlist => {
            const elementclass = document.getElementById(`${classlist}profile-create`);
            elementclass?.classList.remove('selected')
         })
         value(new Set())
      })
   }
   
   const clickSearchLocation = async (address?: string) => {
      setBooleanInputLocation(true)
      setToggleReload(true)
      setSearchLocation([])
      if (address) {
        const addressLocation = `https://geocode.googleapis.com/v4beta/geocode/address/${address}?key=${process.env.NEXT_PUBLIC_GOOGLE_GEOCODE_KEY}`;
        const response: Response = await alovaOutApi.Get(addressLocation);
        const [result] = Object.values(response).map((value) => value);
        setToggleReload(false)
        setSearchLocation(result);
      } else {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          const location : Profile['location'] = {lat:latitude,lng:longitude};
          setCurrentLocation(location)
          const addressLocation = `https://geocode.googleapis.com/v4beta/geocode/location/${latitude},${longitude}?key=${process.env.NEXT_PUBLIC_GOOGLE_GEOCODE_KEY}`;
          try {
            const response: Response = await alovaOutApi.Get(addressLocation);
            const [result] = Object.values(response).map((value) => value);
            setToggleReload(false)
            setSearchLocation(result);
          } catch (err) {
            console.error("Geocode request failed:", err);
          }
        }, (error) => {
          console.error("Geolocation failed:", error);
        });
      }
    };
    const checkTel = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const isNumeric = /^[0-9]*$/.test(value); 
      if (!isNumeric) return;  
      if (value.length <= 10) {
        setInputTelephone(value);
      }
    }
    const calLatLngtoKilo = (location:Profile['location']) => {
      if(!currentLocation?.lat && !currentLocation?.lng){
         navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            const location : Profile['location'] = {lat:latitude,lng:longitude};
            setCurrentLocation(location)
          })
      }
      const distance = window.google.maps.geometry.spherical.computeDistanceBetween(
         new google.maps.LatLng(location),
         new google.maps.LatLng(Number(currentLocation?.lat),Number(currentLocation?.lng))
       );
       return (distance/1000).toFixed(3)
    }
    const addValidation = (name:string) => {
      const element = document.getElementById(`filter_form_${name}`)
      element?.classList.add('border-red-500')
    }
    const removeValidation = (name:string) => {
      const element = document.getElementById(`filter_form_${name}`)
      element?.classList.remove('border-red-500')
    }
   const clickSubmitCreate = async () => {
      setLoading(true)
      try {
         if (isNaN(Number(inputLatLng?.lat)) || isNaN(Number(inputLatLng?.lng))) {
            addValidation('location')
            setLoading(false) 
            return toast.error(`${props.defaultLanguage?.laglngempty[lang as Lang ?? 'en']}`);
         }else{
            removeValidation('location')
         }
         if (!inputLocation  || !inputName || !inputGender || !inputStatus || !selectedDate || inputHeight < 140){
            if (!inputLocation){
               addValidation('location')
            }else{
               removeValidation('location')
            }
            if (!inputName){
               addValidation('name')
            }else{
               removeValidation('name')
            }
            if (!inputGender){
               addValidation('gender')
            }else{
               removeValidation('gender')
            }
            if (!inputStatus){
               addValidation('status')
            }else{
               removeValidation('status')
            }
            if (!selectedDate){
               addValidation('birthday')
            }else{
               removeValidation('birthday')
            }
            if(inputHeight < 140){
               addValidation('height')
            }else{
               removeValidation('height')
            }
            setLoading(false) 
            return toast.error(`${props.defaultLanguage?.empty_form_create[lang as Lang ?? 'en']}`);
         }
         removeValidation('location')
         removeValidation('name')
         removeValidation('gender')
         removeValidation('status')
         removeValidation('height')
         if (Number(calculateAge(selectedDate.toLocaleDateString('fr-CA'))) < 18 || Number(calculateAge(selectedDate.toLocaleDateString('fr-CA'))) > 100){
            setLoading(false) 
            addValidation('birthday')
            return toast.error(`${props.defaultLanguage?.age_more_eighteen[lang as Lang ?? 'en']}`);
         }else{
            removeValidation('birthday')
         }
         if (!inputTelephone && !inputFacebook && !inputInstagram){
            addValidation('telephone')
            addValidation('instragram')
            addValidation('facebook')
            setLoading(false) 
            return toast.error(`${props.defaultLanguage?.contect_empty[lang as Lang ?? 'en']}`);
         }else{
            removeValidation('telephone')
            removeValidation('instragram')
            removeValidation('facebook')
            if(inputTelephone && inputTelephone.length != 10){
               setLoading(false) 
               return toast.error(`${props.defaultLanguage?.telephonemust10[lang as Lang ?? 'en']}`);  
            }
         }
         
         const dateForAge = (selectedDate?.toLocaleDateString('fr-CA'))
         const response : Response = await alovaInstance.Post(`/create`, { 
            "profile": {
               "lifestyle": {
                  "pet":dataLifestyle?.pet,
                  "exercise":dataLifestyle?.exercise,
                  "book":dataLifestyle?.book,
                  "game":dataLifestyle?.game,
                  "healthy":dataLifestyle?.healthy,
                  "alcohol":dataLifestyle?.alcohol,
                  "smoke":dataLifestyle?.smoke,
                  "weed":dataLifestyle?.weed
               },
               "hobbys": {
                  "adventure" : [...dataAdventure],
                  "dataSong" : [...dataSong], 
                  "sport": [...dataSport],
                  "movie": [...dataMovie],
                  "content": [...dataContent],
                  "travel": [...dataTravel],
                  "game": [...dataGame],
                  "selfcare": [...dataSelfcare],
               },
               "contact": {
                 "facebook": inputFacebook,
                 "ig": inputInstagram,
                 "telephone": inputTelephone
               },
               "location": {
                 "lat": inputLatLng?.lat,
                 "lng": inputLatLng?.lng
               },
               "name": inputName,
               "birthday": selectedDate,
               "age": calculateAge(dateForAge ?? ''),
               "salary": inputSalary,
               "status": inputStatus,
               "gender": inputGender,
               "ethnicity": inputEthnicity,
               "height": inputHeight,
               "religion": inputReligion,
               "chinese_zodiac": inputChineseZodiac,
               "western_zodiac": inputWesternZodiac,
               "group": inputGroup,
               "degree": inputDegree,
               "university": inputUniversity,
               "like": []
             },
             "email": data.user.email,
             "image": data.user.image,
             "role": 'user',
             "language": "th"
         });
         if (response.status === 200) {
            toast.success(`${props.defaultLanguage?.success_update[ lang]}`);
            }else if (response.status === 401) {
            toast.error(`${props.defaultLanguage?.permission_create[ lang]}`);
            }else {
            toast.warning(`${props.defaultLanguage?.error[ lang]} ${response.status}`);
            }
            router.push('/')
         } catch (error: unknown) {
            if (error instanceof Error) {
              toast.error(`${props.defaultLanguage?.error[ lang]} ${error.message}`);
            } else {
              toast.error(`${props.defaultLanguage?.error[ lang]} Unknown error`);
            }
          }finally{
            setLoading(false) 
          }
   }
   const checkSalary = (value:number) => {
      if (Number(value) >= 200000 ) {
         setInputSalary(200000)
      } 
      else if(Number(value) <= 0) { 
         setInputSalary(0)
      }else{      
         setInputSalary(Number(value))
      }
    }
  return (
    <>         
         <div className="z-40 w-full h-full  p-2 overflow-y-auto bg-white">
            <div className='flex ml-2 mr-2 mt-2 items-center'>
               <span className='relative w-full mr-2'>
                  {toggleReload ?  
                  <svg  role="status" className="absolute right-0 top-3.5 inline w-5 h-5 me-3 text-blue-500 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                     <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                  </svg>: ''}     
                  <Filter_form boolean={booleanInputLocation} onFocus={setBooleanInputLocation} onBlur={setBooleanInputLocation} value={inputLocation} onChange={setInputLocation} name={props.defaultLanguage?.location[ lang]} id="location"/>
                  <div onMouseDown={(e) => e.preventDefault()} className='w-67 absolute mt-2 max-h-30 z-20 bg-white 
                     overflow-y-auto
                     [&::-webkit-scrollbar]:w-2
                     [&::-webkit-scrollbar-track]:bg-gray-100
                     [&::-webkit-scrollbar-thumb]:rounded-full
                     [&::-webkit-scrollbar-thumb]:bg-gray-300'>
                        
                  {booleanInputLocation ? searchLocation?.map((value: GoogleGeocodeResult) => {
                     const location = {
                        lat: value.location.latitude,
                        lng: value.location.longitude
                     }
                     const caldistance = calLatLngtoKilo(location)
                     return ( <div key={value.placeId} onMouseDown={(e) => e.preventDefault()} className='pb-1'>
                        <button onClick={() => {
                           setInputLatlng(location)
                           setInputLocation(value.formattedAddress)
                           props.setGetLatLng(location)
                           setBooleanInputLocation(false)
                           }
                        } className="text-left rounded-lg border-1  border-gray-300 text-gray-800 w-full py-3 px-4 inline-flex items-center gap-x-2 text-sm font-normal  border-b-1 border-gray-300 bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none " onMouseDown={(e) => e.preventDefault()} >{value?.formattedAddress} ({caldistance} {props.defaultLanguage?.kilometers[ lang]})  </button>
                     </div>)   
                     } 
                  )
                     : ''}
                  </div> 
               </span>
               <span className='mr-2'>
                  <button onClick={() => clickSearchLocation()} type="button" className='cursor-pointer  p-3 z-15 border border-zinc-600 bg-zinc-500 rounded-lg hover:bg-zinc-700 text-white'>
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                     </svg>
                  </button>
               </span>
               <span>
                  <button onClick={() => clickSearchLocation(inputLocation)} type="button" className='cursor-pointer  p-3 z-15 border border-zinc-600 bg-zinc-500 rounded-lg hover:bg-zinc-700 text-white'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                     <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                  </button>
               </span>
            </div>
            <div className='flex ml-2 mr-2 mt-2 items-center'>
               <span className='w-full mr-2'>               
                  <Filter_form onFocus={setBooleanInputName} onBlur={setBooleanInputName} value={inputName} onChange={setInputName} name={props.defaultLanguage?.name[ lang]} id="name"/>
                     {booleanInputName ? '' : ''}
               </span>
               <span className='w-full mr-2'>
                  <Filter_form boolean={booleanInputGender} onFocus={setBooleanInputGender} readonly class='cursor-pointer' onBlur={setBooleanInputGender} value={checkGender(inputGender,lang)} name={props.defaultLanguage?.gender[lang]} id="gender"/>            
                  {booleanInputGender ? <div className='absolute mt-2 pr-4 z-20'>
                     <Filter_displayselect setBoolean={setBooleanInputGender} data={gender} updateDataSet={updateDataSet} name="gender" lang={lang}/>
                  </div> : ''}
               </span>
               <span className='w-50'>
                  <Filter_form boolean={booleanInputHeight} onFocus={setBooleanInputHeight} readonly class='cursor-pointer' onBlur={setBooleanInputHeight} value={inputHeight} name={props.defaultLanguage?.height[lang]} id="height"/>            
                  {booleanInputHeight ? <div className='absolute mt-2 pr-4 z-20'>
                     <Filter_displayselect setBoolean={setBooleanInputHeight} data={[...Array(60)].map((x,i)=>`${i+140}cm`)} updateDataSet={updateDataSet} name="height" lang={''}/>
                  </div> : ''}
               </span>
            </div>
            <div className='flex ml-2 mr-2 mt-2 items-center'>
               <span className='w-full mr-2'>               
                  <Filter_form boolean={booleanInputStatus} readonly class='cursor-pointer' onFocus={setBooleanInputStatus} onBlur={setBooleanInputStatus} value={checkStatus(inputStatus,lang)} onChange={setInputStatus} name={props.defaultLanguage?.status[ lang]} id="status"/>
                  {booleanInputStatus ? <div className='absolute w-40 mt-2 pr-4 z-20'>
                     <Filter_displayselect setBoolean={setBooleanInputStatus} data={status} updateDataSet={updateDataSet} name="status"  lang={lang}/>
                  </div> : ''}
               </span>
               <span className='w-60 mr-2 relative'>
                  <DatePicker
                  autoComplete='off'
                  id='filter_form_birthday'
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  className=" h-12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-2 p-2.5"
                  placeholderText=""
                  />
                  <label htmlFor={`filter_form_birthday`} className={`cursor-pointer absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1`}>{props.defaultLanguage?.birthday[ lang]}</label>
               </span>
               <span className='w-60 mr-2'>
                  <Filter_form boolean={booleanInputEthnicity} onFocus={setBooleanInputEthnicity} readonly class='cursor-pointer' onBlur={setBooleanInputEthnicity} value={checkEthnicitie(inputEthnicity,lang)} name={props.defaultLanguage?.ethnicity[ lang]} id="ethnicity"/>            
                  {booleanInputEthnicity ? <div className='absolute mt-2 pr-4 z-20'>
                     <Filter_displayselect setBoolean={setBooleanInputEthnicity} data={worldEthnicities} updateDataSet={updateDataSet} name="ethnicity" lang={lang}/>
                  </div> : ''}
               </span>

            </div>
            <div className='flex ml-2 mr-2 mt-2 items-center'>
               <span className='w-40 mr-2'>  
                  <Filter_form boolean={booleanInputReligion} onFocus={setBooleanInputReligion} readonly class='cursor-pointer' onBlur={setBooleanInputReligion} value={checkReligion(inputReligion,lang)} name={props.defaultLanguage?.religion[ lang]} id="religion"/>            
                  {booleanInputReligion ? <div className='absolute mt-2 pr-4 z-20'>
                     <Filter_displayselect setBoolean={setBooleanInputReligion} data={worldReligions} updateDataSet={updateDataSet} name="religion" lang={lang}/>
                  </div> : ''}             
               </span>
               <span className='w-60 mr-2'>
                  <Filter_form boolean={booleanInputChineseZodiac} onFocus={setBooleanInputChineseZodiac} readonly class='cursor-pointer' onBlur={setBooleanInputChineseZodiac} value={checkChineseZodiac(inputChineseZodiac,lang)} name={props.defaultLanguage?.chinese_zodiac[ lang]} id="chinese_zodiac"/>            
                  {booleanInputChineseZodiac ? <div className='absolute mt-2 pr-4 z-20'>
                     <Filter_displayselect setBoolean={setBooleanInputChineseZodiac}  data={chinese_zodiac} updateDataSet={updateDataSet} name="chinese_zodiac" lang={lang}/>
                  </div> : ''}
               </span>
               <span className='w-50 mr-2'>
                  <Filter_form boolean={booleanInputWesternZodiac} onFocus={setBooleanInputWesternZodiac} readonly class='cursor-pointer' onBlur={setBooleanInputWesternZodiac} value={checkWesternZodiac(inputWesternZodiac,lang)} name={props.defaultLanguage?.western_zodiac[ lang]} id="western_zodiac"/>            
                  {booleanInputWesternZodiac ? <div className='absolute mt-2 pr-4 z-20'>
                     <Filter_displayselect setBoolean={setBooleanInputWesternZodiac} data={western_zodiac} updateDataSet={updateDataSet} name="western_zodiac" lang={lang}/>
                  </div> : ''}
               </span>
            </div>
            <div className='flex ml-2 mr-2 mt-2 items-center'>
               <span className='w-18 mr-2'>
                  <Filter_form boolean={booleanInputGroup} onFocus={setBooleanInputGroup} readonly class='cursor-pointer' onBlur={setBooleanInputGroup} value={inputGroup} name={props.defaultLanguage?.group_blood[ lang]} id="group_blood"/>            
                  {booleanInputGroup ? <div className='absolute mt-2 pr-4 z-20'>
                     <Filter_displayselect setBoolean={setBooleanInputGroup} data={group_blood} updateDataSet={updateDataSet} name="group_blood" lang={''}/>
                  </div> : ''}
               </span>
               <span className='w-50 mr-2'>
                  <Filter_form boolean={booleanInputDegree} onFocus={setBooleanInputDegree} readonly class='cursor-pointer' onBlur={setBooleanInputDegree} value={checkDegree(inputDegree,lang)} name={props.defaultLanguage?.degree[ lang]} id="degree"/>            
                  {booleanInputDegree ? <div className='absolute mt-2 pr-4 z-20'>
                     <Filter_displayselect setBoolean={setBooleanInputDegree} data={degree} updateDataSet={updateDataSet} name="degree" lang={lang}/>
                  </div> : ''}
               </span>
               <span className='w-50 mr-2'>
                  {booleanToggleUniversitye ? 
                  <Filter_form boolean={booleanInputUniversity} onFocus={setBooleanInputUniversity} onBlur={setBooleanInputUniversity} onChange={setInputUniversity} value={inputUniversity} name={props.defaultLanguage?.university[ lang]} id="university"/>            
                  : ''}
                  {booleanInputUniversity ? <div className='absolute mt-2 pr-4 z-20'>
                     <Filter_displayselect setBoolean={setBooleanInputUniversity} data={getUniversity.filter(value => {if (inputUniversity) return value.toLocaleLowerCase().match(inputUniversity.toLocaleLowerCase())})} updateDataSet={updateDataSet} name="university" lang={''}/>
                  </div> : ''}
               </span>
            </div>
            <div className='flex ml-2 mr-2 mt-2 items-center'>
               <span className='w-50 mr-2'>
                  <div className='relative'>
                        <input autoComplete='off' value={Number(inputSalary)} type="number" id={`filter_form_salary`} onChange={(e) => checkSalary(Number(e.target.value))} className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer`} placeholder="" />
                        <label htmlFor={`filter_form_salary`} className={` absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1`}>{props.defaultLanguage?.salary[ lang]}</label>
                  </div>
               </span>
               <span className='w-full mr-2'>          
                  <div className='relative'>
                        <input autoComplete='off' value={inputFacebook} type="text" id={`filter_form_facebook`} onChange={(e) => setInputFacebook(e.target.value)} className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-blue-600 peer`} placeholder="" />
                        <label htmlFor={`filter_form_facebook`} className={`absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1`}>{props.defaultLanguage?.facebook[ lang]}</label>
                  </div>               
               </span>
            </div>
            <div className='flex ml-2 mr-2 mt-2 items-center'>
               <span className='w-full mr-2'>         
                  <div className='relative'>
                     <input autoComplete='off' value={inputInstagram} type="text" id={`filter_form_instragram`} onChange={(e) => setInputInstagram(e.target.value)} className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-blue-600 peer`} placeholder="" />
                     <label htmlFor={`filter_form_instragram`} className={`absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1`}>{props.defaultLanguage?.instragram[ lang]}</label>
                  </div>   
               </span>
               <span className='w-full mr-2'>       
                  <div className='relative'>
                     <input autoComplete='off' value={inputTelephone}inputMode="numeric" maxLength={10} pattern="[0-9]*" type="tel" id={`filter_form_telephone`} onChange={(e) => checkTel(e)} className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-blue-600 peer`} placeholder="" />
                     <label htmlFor={`filter_form_telephone`} className={`absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1`}>{props.defaultLanguage?.telephone[ lang]}</label>
                  </div>     
               </span>

            </div>
            <ul className="font-normal mt-5">
               <div id="accordion-collapse-hobbys-userprofile-create" data-accordion="collapse" className='font-normal mt-5'>
                  <h2 id="accordion-collapse-heading-hobbys-userprofile-create">
                     <button type="button" className="flex items-center justify-between w-full p-3  font-normal rtl:text-right text-gray-500 border-1 border-gray-300 rounded-lg focus:ring-0 focus:border-blue-600 focus:ring-gray-200    hover:bg-gray-100  gap-3" data-accordion-target="#accordion-collapse-body-hobbys-userprofile-create" aria-expanded="false" aria-controls="accordion-collapse-body-hobbys-userprofile-create">
                        <span>{props.defaultLanguage?.hobby[ lang]}</span>
                        <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
                        </svg>
                     </button>
                  </h2>
                  <div id="accordion-collapse-body-hobbys-userprofile-create" className="hidden" aria-labelledby="accordion-collapse-heading-hobbys-userprofile-create">
                     <div className=" border border-t-0 border-gray-200 ">
                     <div id="accordion-collapse-inside-hobbys-userprofile-create" data-accordion="collapse" className='font-normal'>
                     {hobbyCategories?.map((value) => {
                        return(
                           <span key={value.name} >
                              <Filter_accordion data={value.data as Record<string, TranslatedString>} updateDataSet={updateDataSet} name={value.name as HobbyCategory} parent={'profile-create'} lang={lang}/>
                           </span>
                        )
                     })}
                     </div>
                     
                  </div>
                  </div>
               </div>
            </ul>
            <ul className="font-normal mt-5">
               <div id="accordion-collapse-liftstyle-userprofile-create" data-accordion="collapse" className='font-normal mt-5'>
                  <h2 id="accordion-collapse-heading-liftstyle-userprofile-create">
                     <button type="button" className="flex items-center justify-between w-full p-3  font-normal rtl:text-right text-gray-500 border-1 border-gray-300 rounded-lg focus:ring-0 focus:border-blue-600 focus:ring-gray-200    hover:bg-gray-100  gap-3" data-accordion-target="#accordion-collapse-body-liftstyle-userprofile-create" aria-expanded="false" aria-controls="accordion-collapse-body-liftstyle-userprofile-create">
                        <span>{props.defaultLanguage?.lifestyle[ lang]}</span>
                        <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
                        </svg>
                     </button>
                  </h2>
                  <div id="accordion-collapse-body-liftstyle-userprofile-create" className="hidden" aria-labelledby="accordion-collapse-heading-liftstyle-userprofile-create">
                     <div className=" border border-t-0 border-gray-200 ">
                        {data ? questionLifestyle.map((value) => {
                           return(
                           <div key={value.key} className="flex items-center ml-2 mb-2 mt-2">
                              <input id={`${value.key}profile`} onChange={() => updateLifestyle(value.key as LifestyleKey)} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500   focus:ring-2  "/>
                              <label htmlFor={`${value.key}profile`} className="ms-2 text-sm font-normal text-gray-900 ">{value.question[lang]}</label>
                           </div>
                           )}
                        ): ''}
                     </div>
                  </div>
                  <div className='flex justify-center items-end pt-10'>
                     <button type="button" onClick={()=> clickSubmitCreate()} className="text-white bg-green-500 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-normal rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2   ">{props.defaultLanguage?.submit_button[ lang]}</button>
                     <button type="button" onClick={()=> setNull()} className="text-white bg-red-500 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-normal rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2   ">{props.defaultLanguage?.reset_button[ lang]}</button>            
                  </div>
               </div>
            </ul>
      </div>   
    </>
  )
}

export default CreateProfile


