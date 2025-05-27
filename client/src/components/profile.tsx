'user client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { typeData , Settings , Lang, Profile, LifestyleKey, CategoryNameHobby, HobbyCategory, TranslatedString } from '@/providers/lib/typeData'
import Filter_form from './ui/filter_form'
import Filter_displayselect from './ui/filter_displayselect'
import Filter_accordion from './ui/filter_accordion'
import { chinese_zodiac, degree, gender ,group_blood,hobbys ,questionLifestyle, role, status,western_zodiac,worldEthnicities, worldReligions} from './data/FakeData'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { alovaInstance, alovaOutApi } from './data/alova'
import { calculateAge } from '@/providers/lib/TranslateToThai'
import { toast } from 'react-toastify'
interface typeProp{
   data:typeData
   userData:typeData[]
   defaultLanguage:Settings
   setGetLatLng:(localtion?: Profile['location'],email?:string) => void
}
function SideProfile(props:typeProp) {
   const [inputLatLng, setInputLatlng] = useState<Profile['location']>()
   const [dataAdventure, setDataAdventure] = useState<Set<string>>(new Set());
   const [dataSong, setDataSong] = useState<Set<string>>(new Set());
   const [dataContent, setDataContent] = useState<Set<string>>(new Set());
   const [dataGame, setDataGame] = useState<Set<string>>(new Set());
   const [dataMovie, setDataMovie] = useState<Set<string>>(new Set());
   const [dataSelfcare, setDataSelfcare] = useState<Set<string>>(new Set());
   const [dataSport, setDataSport] = useState<Set<string>>(new Set());
   const [dataTravel, setDataTravel] = useState<Set<string>>(new Set());
   const [lifestyleSet, setLifestyleSet] = useState<Set<string>>(new Set());
   const [dataLifestyle, setDataLifestyle] = useState<Profile['lifestyle']>();
   const dataClasslistReset = new Set()
   const [id, setId] = useState('')
   const [inputEmail, setInputEmail] = useState('')
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
   const [inputUser,setInputUser] = useState<string>('')
   const [inputRole,setInputRole] = useState<string>('')
   const [inputLocation,setInputLocation] = useState<string>('')
   const [inputFacebook,setInputFacebook] = useState<string>('')
   const [inputInstagram,setInputInstagram] = useState<string>('')
   const [inputTelephone,setInputTelephone] = useState<string>('')
   const [inputSalary, setInputSalary] = useState<number>(0)
   const [currentLocation, setCurrentLocation] = useState<Profile['location']>()
   const [inputLike, setInputLike] = useState<string[]>([])
   const [Datalike, setDatalike] = useState<typeData[]>([])
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
   const [booleanInputUser,setBooleanInputUser] = useState<boolean>(false)
   const [booleanInputRole,setBooleanInputRole] = useState<boolean>(false)
   const [booleanToggleLike,setBooleanToggleLike] = useState<boolean>(false)
   const [booleanToggleUniversitye,setBooleanToggleUniversity] = useState<boolean>(false)
   const [toggleCreate,setToggleCreate] = useState<boolean>(false)
   const [toggleReload,setToggleReload] = useState<boolean>(false)
   const [getUniversity, setGetUniversity] = useState<string[]>([])
   const [defaultUserSelect ,setDefaultUserSelect] = useState<typeData>()
   const [userDataSelect,setUserDataSelect] = useState<typeData[]>()
   const [searchLocation,setSearchLocation] = useState<any>()
   const [loading,setLoading] = useState<boolean>()
   const [toggleDelete,setToggleDelete] = useState<boolean>()
   const data = props.data as typeData
   const userData = props.userData as typeData[]
   useEffect(() => {
      setUserDataSelect(userData)

   },[userData])
   useEffect(() => {
      fetch('/world_universities.json')
         .then((res) => res.json())
         .then((data:string[]) => {
            setGetUniversity(data);
         })
         .catch((error) => {
            console.error("Error fetching universities:", error);
         });
      
      }, []);
      // ข้อมูลตัวเองเข้ามาอัพครั้งเดดี่ยว
   useEffect(() => {
   if(data) {
      setDefaultUserSelect(data ?? [])
      setDataAdventure((new Set(data.profile?.hobbys?.adventure)) ?? new Set())
      setDataSong((new Set(data.profile?.hobbys?.song)) ?? new Set())
      setDataContent((new Set(data.profile?.hobbys?.content)) ?? new Set())
      setDataGame((new Set(data.profile?.hobbys?.game)) ?? new Set())
      setDataMovie((new Set(data.profile?.hobbys?.movie)) ?? new Set())
      setDataSelfcare((new Set(data.profile?.hobbys?.selfcare)) ?? new Set())
      setDataSport((new Set(data.profile?.hobbys?.sport)) ?? new Set())
      setDataTravel((new Set(data.profile?.hobbys?.travel)) ?? new Set())
      setDataLifestyle(data.profile?.lifestyle)
      setId(data?._id ?? '')
      setInputName(data.profile?.name ?? '')
      setInputGender(data.profile?.gender ?? '')
      setInputHeight(data.profile?.height ?? 0)
      setInputStatus(data.profile?.status ?? '')
      setInputEthnicity(data.profile?.ethnicity ?? '')
      setSelectedDate(new Date(`${data.profile?.birthday}`) ?? new Date())
      setInputDegree(data.profile?.degree ?? '')
      setInputWesternZodiac(data.profile?.western_zodiac ?? '')
      setInputChineseZodiac(data.profile?.chinese_zodiac ?? '')
      setInputReligion(data.profile?.religion ?? '')
      setInputUniversity(data.profile?.university ?? '')
      setInputGroup(data.profile?.group ?? '')
      setInputSalary(data.profile?.salary ?? 0)
      setInputRole(data.role ?? '')
      setInputLike(data.profile?.like ?? [])
      setInputFacebook(data.profile?.contact?.facebook ?? '')
      setInputInstagram(data.profile?.contact?.ig ?? '')
      setInputTelephone(data.profile?.contact?.telephone ?? '')

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
      setBooleanInputRole(false)
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
            const element = document.getElementById(`${value}profile`)
            element?.classList.add('selected')
            dataClasslistReset.add(value)
         })
      })
   },[dataAdventure,dataSong,dataContent,dataGame,dataMovie,dataSelfcare
      ,dataSport,dataTravel,dataClasslistReset
   ])
   useEffect(() => {
      const updateLifestyle = Object.entries(dataLifestyle ?? {})
      .filter(([, isChecked]) => isChecked)
      const updateSet = updateLifestyle.map(([key]) => key)
      setLifestyleSet(new Set (updateSet))
   },[dataLifestyle])
   const updateLifestyle = (value: LifestyleKey) => {
      const newSet = new Set(lifestyleSet);
    
      if (newSet.has(value)) {
        newSet.delete(value);
      } else {
        newSet.add(value);
      }
    
      setLifestyleSet(newSet);   
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
         role:() => setInputRole(value),
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
            const element = document.getElementById(`${value}profile`)
            element?.classList.remove('selected')
            dataClasslistReset.delete(value)
         }else{
            data.add(value)
         }
         hobbySetMap[name as CategoryNameHobby](new Set(data))
       } else if (name in stateMap) {
         stateMap[name]();
         console.log("SET STATE:", name, value);
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
      setId('')
      setInputRole('')
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
      setDataLifestyle({
         pet: false,
         exercise: false,
         book: false,
         game: false,
         healthy: false,
         alcohol: false,
         smoke: false,
         weed: false})
      setInputLike([])
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
            const elementclass = document.getElementById(`${classlist}profile`);
            elementclass?.classList.remove('selected')
         })
         value(new Set())
      })
   }
   const setSelectUser = (user:typeData) => {
      setDefaultUserSelect(user)
      setId(user?._id ?? '')
      setInputRole(user?.role)
      setInputName(user?.profile?.name ?? '')
      setInputGender(user?.profile?.gender ?? '')
      setInputHeight(user?.profile?.height ?? 0)
      setInputStatus(user?.profile?.status ?? '')
      setInputEthnicity(user?.profile?.ethnicity ?? '')
      setSelectedDate(new Date(`${user?.profile?.birthday}`) ?? new Date())
      setInputDegree(user?.profile?.degree ?? '')
      setInputWesternZodiac(user?.profile?.western_zodiac ?? '')
      setInputChineseZodiac(user?.profile?.chinese_zodiac ?? '')
      setInputReligion(user?.profile?.religion ?? '')
      setInputUniversity(user?.profile?.university ?? '')
      setInputGroup(user?.profile?.group ?? '')
      setInputSalary(user?.profile?.salary ?? 0)
      setDataLifestyle(user?.profile?.lifestyle)
      setInputLike(user?.profile?.like ?? [])
      setInputFacebook(user?.profile?.contact?.facebook ?? '')
      setInputInstagram(user?.profile?.contact?.ig ?? '')
      setInputTelephone(user?.profile?.contact?.telephone ?? '')
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
         
      Object.entries(hobbymap).forEach(([key,value]) => {
         const hobby = user?.profile?.hobbys?.[key as CategoryNameHobby];
         [...dataClasslistReset].map(classlist => {
            const elementclass = document.getElementById(`${classlist}profile`);
            elementclass?.classList.remove('selected')
         })
         if(!hobby) return
         
         if(hobby.length > 0) {
            value(new Set(hobby))
         }else{
            value(new Set())
         }
      })
   }
   const like = (dataLike:Profile['like']) => {
      const getDataLike:typeData[] = []
      dataLike?.forEach(value => 
         {const test= userData.find(filter => filter._id.match(value))
         if(test){
            getDataLike.push(test)}
         }
      )
      setDatalike(getDataLike)
   }
   
   const clickSearchLocation = async (address?: string) => {
      setBooleanInputLocation(true)
      setToggleReload(true)
      setSearchLocation([])
      if (address) {
        const addressLocation = `https://geocode.googleapis.com/v4beta/geocode/address/${address}?key=${process.env.NEXT_PUBLIC_GOOGLE_GEOCODE_KEY}`;
        const response: Response = await alovaOutApi.Get(addressLocation);
        const [result] = Object.values(response).map((value) => value);
        console.log(result);
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
   const clickSubmitEdit = async () => {
      setLoading(true)
      try {
         if (!inputName || !selectedDate){
            setLoading(false)  
            return toast.error(`${props.defaultLanguage?.empty_form_edit[props.data?.language as Lang ?? 'th']}`);
         }
         if (Number(calculateAge(selectedDate.toLocaleDateString('fr-CA'))) < 18){
            setLoading(false) 
            return toast.error(`${props.defaultLanguage?.age_more_eighteen[props.data?.language as Lang ?? 'th']}`);
         }
         const dateForAge = (selectedDate?.toLocaleDateString('fr-CA'))
         const response : Response = await alovaInstance.Put(`/update/${data._id}`, { 
            _id:id,
            "profile.name":inputName,
            "profile.gender":inputGender,
            "profile.height":inputHeight,
            "profile.status":inputStatus,
            "profile.birthday":selectedDate,
            "profile.age":calculateAge(dateForAge ?? ''),
            "profile.ethnicity":inputEthnicity,
            "profile.religion":inputReligion,
            "profile.western_zodiac":inputWesternZodiac,
            "profile.chinese_zodiac":inputChineseZodiac,
            "profile.group":inputGroup,
            "profile.degree":inputDegree,
            "profile.university":inputUniversity,
            "profile.salary":inputSalary,
            "profile.hobbys":{
               "adventure" : [...dataAdventure],
               "song" : [...dataSong], 
               "sport": [...dataSport],
               "movie": [...dataMovie],
               "content": [...dataContent],
               "travel": [...dataTravel],
               "game": [...dataGame],
               "selfcare": [...dataSelfcare],
            },
            "profile.lifestyle":{   
               "pet":dataLifestyle?.pet,
               "exercise":dataLifestyle?.exercise,
               "book":dataLifestyle?.book,
               "game":dataLifestyle?.game,
               "healthy":dataLifestyle?.healthy,
               "alcohol":dataLifestyle?.alcohol,
               "smoke":dataLifestyle?.smoke,
               "weed":dataLifestyle?.weed
            },
            "profile.contact": {
               "facebook": inputFacebook,
               "ig": inputInstagram,
               "telephone": inputTelephone
            },
         });
         console.log(response.status)
         if (response.status === 200) {
            toast.success(`${props.defaultLanguage?.success_update[props.data?.language as Lang ?? 'th']}`);
            
          }else if (response.status === 401) {
            toast.error(`${props.defaultLanguage?.permisson_update[props.data?.language as Lang ?? 'th']}`);
            
          }else {
            toast.warning(`${props.defaultLanguage?.error[props.data?.language as Lang ?? 'th']} ${response.status}`);
          }
        } catch (error: unknown) {
         if (error instanceof Error) {
           toast.error(`${props.defaultLanguage?.error[props.data?.language as Lang ?? 'th']} ${error.message}`);
         } else {
           toast.error(`${props.defaultLanguage?.error[props.data?.language as Lang ?? 'th']} Unknown error`);
         }
       }finally{
         setLoading(false) 
       }
   }
   const clickSubmitCreate = async () => {
      setLoading(true)
      try {
         if(inputRole != 'admin') {
            if (!inputStatus || !inputEmail || !inputRole || !inputLocation || !inputName  || !selectedDate || !inputGender){
               setLoading(false) 
               return toast.error(`${props.defaultLanguage?.empty_form_create[props.data?.language as Lang ?? 'th']}`);
            }
            if (!inputLatLng) {
               setLoading(false) 
               return toast.error(`${props.defaultLanguage?.laglngempty[props.data?.language as Lang ?? 'th']}`);
            }
            if (Number(calculateAge(selectedDate.toLocaleDateString('fr-CA'))) < 18){
               setLoading(false) 
               return toast.error(`${props.defaultLanguage?.age_more_eighteen[props.data?.language as Lang ?? 'th']}`);
            }
         }
         
         const dateForAge = (selectedDate?.toLocaleDateString('fr-CA'))
         const response : Response = await alovaInstance.Post(`/create/${data._id}`, { 
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
             "email": inputEmail,
             "role": inputRole,
             "language": "th"
         });
         console.log(response.status)
         if (response.status === 200) {
            toast.success(`${props.defaultLanguage?.success_create[props.data?.language as Lang ?? 'th']}`);
            }else if (response.status === 401) {
            toast.error(`${props.defaultLanguage?.permission_create[props.data?.language as Lang ?? 'th']}`);
            }else if (response.status === 400){
            toast.error(`${props.defaultLanguage?.create_email_have[props.data?.language as Lang ?? 'th']}`);
            }else {
            toast.warning(`${props.defaultLanguage?.error[props.data?.language as Lang ?? 'th']} ${response.status}`);
            }
         } catch (error: unknown) {
            if (error instanceof Error) {
              toast.error(`${props.defaultLanguage?.error[props.data?.language as Lang ?? 'th']} ${error.message}`);
            } else {
              toast.error(`${props.defaultLanguage?.error[props.data?.language as Lang ?? 'th']} Unknown error`);
            }
          }finally{
            setLoading(false) 
          }
          
   }
   
 const deleteUser = async() => {
   setLoading(true)
       try {
         const response : Response = await alovaInstance.Delete(`/delete/${data._id}`, { 
            _id:id,
         });
         if (response.status === 200) {
            toast.success(`${props.defaultLanguage?.success_delete[props.data?.language as Lang ?? 'th']}`);
            setUserDataSelect(prev => prev?.filter(user => user._id !== id));
            setDefaultUserSelect(data)
            setNull()
          }else if (response.status === 401) {
            toast.error(`${props.defaultLanguage?.permission_delete[props.data?.language as Lang ?? 'th']}`);
            
          }else if (response.status === 403){
            toast.error(`${props.defaultLanguage?.admin_cant_delete_self[props.data?.language as Lang ?? 'th']}`);
          }else {
            toast.warning(`${props.defaultLanguage?.error[props.data?.language as Lang ?? 'th']} ${response.status}`);
          }
        } catch (error: unknown) {
         if (error instanceof Error) {
           toast.error(`${props.defaultLanguage?.error[props.data?.language as Lang ?? 'th']} ${error.message}`);
         } else {
           toast.error(`${props.defaultLanguage?.error[props.data?.language as Lang ?? 'th']} Unknown error`);
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
    <div >
      {loading ?
       <div role="status" className='absolute flex justify-center h-full w-full z-50 backdrop-blur-xs'>
          <svg aria-hidden="true" className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-10 h-10 text-gray-200 animate-spin  fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
          <span className="sr-only">Loading...</span>
      </div> : '' }
      {toggleDelete ?  
         <div role="status" className='absolute flex justify-center items-center h-full w-full z-50 backdrop-blur-xs'>
            <Modal_Confirm_Delete data={data} defaultLanguage={props.defaultLanguage} deleteUser={deleteUser} close={setToggleDelete}/>
         </div> 
      : ''}
      <div className="btnthreeline fixed z-5 left-0 top-0 text-center absolute">
         <button className="threeline inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200   " type="button" data-drawer-target="sidebar-profile" data-drawer-show="sidebar-profile" data-drawer-placement="left" aria-controls="sidebar-profile">
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
         </svg>
         </button>
      </div>
      
            <div id="sidebar-profile" className="fixed top-0 left-0 z-40 w-100 h-full p-2 overflow-y-auto transition-transform -translate-x-full bg-white" tabIndex={-1} aria-hidden="true" aria-labelledby="sidebar-profile-label">
               {data?.role == 'admin' ?
                  <>
                  {toggleCreate ? 
                  <div>

                     <button onClick={() => {setNull();setToggleCreate(false);setSelectUser(defaultUserSelect as typeData)}} type="button" data-drawer-hide="sidebar-filter" aria-controls="sidebar-filter" className='ml-2 p-2 z-15 border border-blue-600 bg-blue-500 rounded-lg hover:bg-blue-700 text-white'>
                     {props.defaultLanguage?.edit[props.data?.language as Lang ?? 'th']}      
                     </button>
                  </div>
                  :
                  <div>

                     <button onClick={() => {setNull();setToggleCreate(true)}} type="button" data-drawer-hide="sidebar-filter" aria-controls="sidebar-filter" className='ml-2 p-2 z-15 border border-blue-600 bg-blue-500 rounded-lg hover:bg-blue-700 text-white'>
                     {props.defaultLanguage?.create[props.data?.language as Lang ?? 'th']}      
                     </button>
                     
                     <button onClick={() => {setToggleDelete(true)}} type="button" className='ml-2 p-2 z-15 border border-red-600 bg-red-500 rounded-lg hover:bg-red-700 text-white'>
                        {props.defaultLanguage?.delete[props.data?.language as Lang ?? 'th']}      
                     </button>


                  </div>
                  } 
               </>
             :  ''}
            <button type="button" data-drawer-hide="sidebar-profile" aria-controls="sidebar-profile" 
               className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center  " >
               <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
               <span className="sr-only">Close menu</span>
            </button>
            {data && data?.role == 'admin' ? 
            <div className='flex ml-2 mr-2 mt-4 items-center'>
               {toggleCreate ?  
               <>
                  <span className='w-full mr-2'>          
                     <Filter_form onFocus={setBooleanInputUser} onBlur={setBooleanInputUser} value={inputEmail} onChange={setInputEmail} name={props.defaultLanguage?.email[props.data?.language as Lang ?? 'th']} id="email"/>
                  </span>
               </>
               : 
               <span className='w-full mr-2'>               
                  <Filter_form onFocus={setBooleanInputUser} onBlur={setBooleanInputUser} value={inputUser} onChange={setInputUser} name={props.defaultLanguage?.select_user[props.data?.language as Lang ?? 'th']} id="user"/>
                  <div onMouseDown={(e) => e.preventDefault()} className='w-67 absolute mt-2 max-h-30 z-20 bg-white 
                     overflow-y-auto
                     [&::-webkit-scrollbar]:w-2
                     [&::-webkit-scrollbar-track]:bg-gray-100
                     [&::-webkit-scrollbar-thumb]:rounded-full
                     [&::-webkit-scrollbar-thumb]:bg-gray-300'>
                  {userData && booleanInputUser ? userDataSelect?.filter((value) => value.profile?.name?.toLowerCase().match(inputUser.toLowerCase()) || value.email.toLowerCase().match(inputUser.toLowerCase())).map(value => 
                     <div key={value.email} onMouseDown={(e) => e.preventDefault()} className='pb-1'>
                        <button onClick={() => {setSelectUser(value);props.setGetLatLng(value.profile?.location,value.email);setBooleanInputUser(false)}} className="text-left rounded-lg border-1  border-gray-300 text-gray-800 w-full py-3 px-4 inline-flex items-center gap-x-2 text-sm font-normal  border-b-1 border-gray-300 bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none " onMouseDown={(e) => e.preventDefault()} >{value.profile?.name} ({value.email}) </button>
                     </div>    
                  )
                     : ''}
                  </div> 
               </span>
               }
               <span className='w-30 mr-2'>
                  <Filter_form onFocus={setBooleanInputRole} readonly class='cursor-pointer' onBlur={setBooleanInputRole} value={inputRole} name={props.defaultLanguage?.role[props.data?.language as Lang ?? 'th']} id="role"/>            
                  {booleanInputRole ? <div className='absolute mt-2 pr-4 z-20'>
                     <Filter_displayselect  data={role} updateDataSet={updateDataSet} name="role" lang={props.data?.language ?? ''}/>
                  </div> : ''}
               </span>
            </div>:""}
            {toggleCreate ? 
            <div className='flex ml-2 mr-2 mt-2 items-center'>
               <span className='relative w-full mr-2'>
                  {toggleReload ?  
                  <svg aria-hidden="true" role="status" className="absolute right-0 top-3.5 inline w-5 h-5 me-3 text-blue-500 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                     <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                  </svg>: ''}     
                  <Filter_form onFocus={setBooleanInputLocation} onBlur={setBooleanInputLocation} value={inputLocation} onChange={setInputLocation} name={props.defaultLanguage?.location[props.data?.language as Lang ?? 'th']} id="location"/>
                  <div onMouseDown={(e) => e.preventDefault()} className='w-67 absolute mt-2 max-h-30 z-20 bg-white 
                     overflow-y-auto
                     [&::-webkit-scrollbar]:w-2
                     [&::-webkit-scrollbar-track]:bg-gray-100
                     [&::-webkit-scrollbar-thumb]:rounded-full
                     [&::-webkit-scrollbar-thumb]:bg-gray-300'>
                  {userData && booleanInputLocation ? searchLocation?.map((value : any) => {
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
                        } className="text-left rounded-lg border-1  border-gray-300 text-gray-800 w-full py-3 px-4 inline-flex items-center gap-x-2 text-sm font-normal  border-b-1 border-gray-300 bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none " onMouseDown={(e) => e.preventDefault()} >{value?.formattedAddress} ({caldistance} {props.defaultLanguage?.kilometers[props.data?.language as Lang ?? 'th']})  </button>
                     </div>)   
                     } 
                  )
                     : ''}
                  </div> 
               </span>
               <span className='mr-2'>
                  <button onClick={() => clickSearchLocation()} type="button" data-drawer-hide="sidebar-filter" aria-controls="sidebar-filter" className='p-3 z-15 border border-zinc-600 bg-zinc-500 rounded-lg hover:bg-zinc-700 text-white'>
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                     </svg>
                  </button>
               </span>
               <span>
                  <button onClick={() => clickSearchLocation(inputLocation)} type="button" data-drawer-hide="sidebar-filter" aria-controls="sidebar-filter" className='p-3 z-15 border border-zinc-600 bg-zinc-500 rounded-lg hover:bg-zinc-700 text-white'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                     <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                  </button>
               </span>
            </div> : '' }
            <div className={`flex ml-2 mr-2 ${data?.role == 'admin' ? 'mt-2' : 'mt-12'} items-center`}>
               <span className='w-full mr-2'>               
                  <Filter_form onFocus={setBooleanInputName} onBlur={setBooleanInputName} value={inputName} onChange={setInputName} name={props.defaultLanguage?.name[props.data?.language as Lang ?? 'th']} id="name"/>
                     {booleanInputName ? '' : ''}
               </span>
               <span className='w-full mr-2'>
                  <Filter_form onFocus={setBooleanInputGender} readonly class='cursor-pointer' onBlur={setBooleanInputGender} value={inputGender} name={props.defaultLanguage?.gender[props.data?.language as Lang ?? 'th']} id="gender"/>            
                  {booleanInputGender ? <div className='absolute mt-2 pr-4 z-20'>
                     <Filter_displayselect  data={gender} updateDataSet={updateDataSet} name="gender" lang={props.data?.language ?? ''}/>
                  </div> : ''}
               </span>
               <span className='w-50'>
                  <Filter_form onFocus={setBooleanInputHeight} readonly class='cursor-pointer' onBlur={setBooleanInputHeight} value={inputHeight} name={props.defaultLanguage?.height[props.data?.language as Lang ?? 'th']} id="height"/>            
                  {booleanInputHeight ? <div className='absolute mt-2 pr-4 z-20'>
                     <Filter_displayselect  data={[...Array(60)].map((x,i)=>`${i+140}cm`)} updateDataSet={updateDataSet} name="height" lang={''}/>
                  </div> : ''}
               </span>
            </div>
            <div className='flex ml-2 mr-2 mt-2 items-center'>
               <span className='w-full mr-2'>               
                  <Filter_form readonly class='cursor-pointer' onFocus={setBooleanInputStatus} onBlur={setBooleanInputStatus} value={inputStatus} onChange={setInputStatus} name={props.defaultLanguage?.status[props.data?.language as Lang ?? 'th']} id="status"/>
                  {booleanInputStatus ? <div className='absolute w-40 mt-2 pr-4 z-20'>
                     <Filter_displayselect  data={status} updateDataSet={updateDataSet} name="status"  lang={props.data?.language ?? ''}/>
                  </div> : ''}
               </span>
               <span className='w-60 mr-2 relative'>
                  <DatePicker
                  autoComplete='off'
                  id='filter_form_birthday'
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  className=" h-12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-2 p-2.5    "
                  placeholderText=""
                  />
                  <label htmlFor={`filter_form_birthday`} className={`cursor-pointer absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1`}>{props.defaultLanguage?.birthday[props.data?.language as Lang ?? 'th']}</label>
               </span>
               <span className='w-60 mr-2'>
                  <Filter_form onFocus={setBooleanInputEthnicity} readonly class='cursor-pointer' onBlur={setBooleanInputEthnicity} value={inputEthnicity} name={props.defaultLanguage?.ethnicity[props.data?.language as Lang ?? 'th']} id="ethnicity"/>            
                  {booleanInputEthnicity ? <div className='absolute mt-2 pr-4 z-20'>
                     <Filter_displayselect  data={worldEthnicities} updateDataSet={updateDataSet} name="ethnicity" lang={props.data?.language ?? ''}/>
                  </div> : ''}
               </span>

            </div>
            <div className='flex ml-2 mr-2 mt-2 items-center'>
               <span className='w-40 mr-2'>  
                  <Filter_form onFocus={setBooleanInputReligion} readonly class='cursor-pointer' onBlur={setBooleanInputReligion} value={inputReligion} name={props.defaultLanguage?.religion[props.data?.language as Lang ?? 'th']} id="religion"/>            
                  {booleanInputReligion ? <div className='absolute mt-2 pr-4 z-20'>
                     <Filter_displayselect  data={worldReligions} updateDataSet={updateDataSet} name="religion" lang={props.data?.language ?? ''}/>
                  </div> : ''}             
               </span>
               <span className='w-60 mr-2'>
                  <Filter_form onFocus={setBooleanInputChineseZodiac} readonly class='cursor-pointer' onBlur={setBooleanInputChineseZodiac} value={inputChineseZodiac} name={props.defaultLanguage?.chinese_zodiac[props.data?.language as Lang ?? 'th']} id="chinese_zodiac"/>            
                  {booleanInputChineseZodiac ? <div className='absolute mt-2 pr-4 z-20'>
                     <Filter_displayselect  data={chinese_zodiac} updateDataSet={updateDataSet} name="chinese_zodiac" lang={props.data?.language ?? ''}/>
                  </div> : ''}
               </span>
               <span className='w-50 mr-2'>
                  <Filter_form onFocus={setBooleanInputWesternZodiac} readonly class='cursor-pointer' onBlur={setBooleanInputWesternZodiac} value={inputWesternZodiac} name={props.defaultLanguage?.western_zodiac[props.data?.language as Lang ?? 'th']} id="western_zodiac"/>            
                  {booleanInputWesternZodiac ? <div className='absolute mt-2 pr-4 z-20'>
                     <Filter_displayselect  data={western_zodiac} updateDataSet={updateDataSet} name="western_zodiac" lang={props.data?.language ?? ''}/>
                  </div> : ''}
               </span>
            </div>
            <div className='flex ml-2 mr-2 mt-2 items-center'>
               <span className='w-18 mr-2'>
                  <Filter_form onFocus={setBooleanInputGroup} readonly class='cursor-pointer' onBlur={setBooleanInputGroup} value={inputGroup} name={props.defaultLanguage?.group_blood[props.data?.language as Lang ?? 'th']} id="group_blood"/>            
                  {booleanInputGroup ? <div className='absolute mt-2 pr-4 z-20'>
                     <Filter_displayselect  data={group_blood} updateDataSet={updateDataSet} name="group_blood" lang={''}/>
                  </div> : ''}
               </span>
               <span className='w-50 mr-2'>
                  <Filter_form onFocus={setBooleanInputDegree} readonly class='cursor-pointer' onBlur={setBooleanInputDegree} value={inputDegree} name={props.defaultLanguage?.degree[props.data?.language as Lang ?? 'th']} id="degree"/>            
                  {booleanInputDegree ? <div className='absolute mt-2 pr-4 z-20'>
                     <Filter_displayselect  data={degree} updateDataSet={updateDataSet} name="degree" lang={props.data?.language ?? ''}/>
                  </div> : ''}
               </span>
               <span className='w-50 mr-2'>
                  {booleanToggleUniversitye ? 
                  <Filter_form onFocus={setBooleanInputUniversity} onBlur={setBooleanInputUniversity} onChange={setInputUniversity} value={inputUniversity} name={props.defaultLanguage?.university[props.data?.language as Lang ?? 'th']} id="university"/>            
                  : ''}
                  {booleanInputUniversity ? <div className='absolute mt-2 pr-4 z-20'>
                     <Filter_displayselect  data={getUniversity.filter(value => value.match(inputUniversity))} updateDataSet={updateDataSet} name="university" lang={''}/>
                  </div> : ''}
               </span>
            </div>
            <div className='flex ml-2 mr-2 mt-2 items-center'>
               <span className='w-50 mr-2'>
                  <div className='relative'>
                        <input autoComplete='off' value={Number(inputSalary)} type="number" id={`filter_form_salary`} onChange={(e) => checkSalary(Number(e.target.value))} className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-blue-600 peer`} placeholder="" />
                        <label htmlFor={`filter_form_salary`} className={` absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1`}>{props.defaultLanguage?.salary[props.data?.language as Lang ?? 'th']}</label>
                  </div>
               </span>
               <span className='w-full mr-2'>          
                  <div className='relative'>
                        <input autoComplete='off' value={inputFacebook} type="text" id={`filter_form_facebook`} onChange={(e) => setInputFacebook(e.target.value)} className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-blue-600 peer`} placeholder="" />
                        <label htmlFor={`filter_form_facebook`} className={`absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1`}>{props.defaultLanguage?.facebook[props.data?.language as Lang ?? 'th']}</label>
                  </div>               
               </span>
            </div>
            <div className='flex ml-2 mr-2 mt-2 items-center'>
               <span className='w-full mr-2'>         
                  <div className='relative'>
                     <input autoComplete='off' value={inputInstagram} type="text" id={`filter_form_instragram`} onChange={(e) => setInputInstagram(e.target.value)} className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-blue-600 peer`} placeholder="" />
                     <label htmlFor={`filter_form_instragram`} className={`absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1`}>{props.defaultLanguage?.instragram[props.data?.language as Lang ?? 'th']}</label>
                  </div>   
               </span>
               <span className='w-full mr-2'>       
                  <div className='relative'>
                     <input autoComplete='off' value={inputTelephone}inputMode="numeric" maxLength={10} pattern="[0-9]*" type="tel" id={`filter_form_telephone`} onChange={(e) => checkTel(e)} className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-blue-600 peer`} placeholder="" />
                     <label htmlFor={`filter_form_telephone`} className={`absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1`}>{props.defaultLanguage?.telephone[props.data?.language as Lang ?? 'th']}</label>
                  </div>     
               </span>
               {toggleCreate ? '' : 
               <span className='mr-2'>
                  <button onBlur={() => setBooleanToggleLike(false)} onClick={() => {setBooleanToggleLike(true);like(inputLike)}} className='bg-red-500 p-2 inline-flex items-center text-center justify-center rounded-lg'>
                     <span>
                        <Image src={'/white-heart-icon.png'} width={155} height={155} alt={`${id ?? ''} heart icon`} className='p-1'/>
                     </span>
                     <span className='ml-2 mr-2 text-white'>{inputLike.length ?? 0}</span>
                  </button> 
                  {booleanToggleLike ?
                     <div className='absolute mt-2 pr-4 right-0 w-60 z-20'>
                        <div onMouseDown={(e) => e.preventDefault()} className='max-h-30 overflow-hidden rounded-lg border-1 border-gray-300
                           overflow-y-auto
                           [&::-webkit-scrollbar]:w-2
                           [&::-webkit-scrollbar-track]:bg-gray-100
                           [&::-webkit-scrollbar-thumb]:rounded-full
                           [&::-webkit-scrollbar-thumb]:bg-gray-300

                        '>
                           {Datalike.map((value) => 
                           <button onClick={() => props.setGetLatLng(value.profile?.location,value.email)} className={`${value.profile?.gender == 'female' ? 'filterbannerfemale' : 'filterbannermale'} text-left text-white w-full py-3 px-4 inline-flex items-center gap-x-2 text-sm font-normal  border-b-1 border-gray-300 bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none `}key={value._id}>{value.profile?.name}</button>)}
                        </div>
                     </div> : ''}
               </span>} 
            </div>
            <ul className="font-normal mt-5">
               <div id="accordion-collapse-hobbys-userprofile" data-accordion="collapse" className='font-normal mt-5'>
                  <h2 id="accordion-collapse-heading-hobbys-userprofile">
                     <button type="button" className="flex items-center justify-between w-full p-3  font-normal rtl:text-right text-gray-500 border-1 border-gray-300 rounded-lg focus:ring-0 focus:border-blue-600 focus:ring-gray-200    hover:bg-gray-100  gap-3" data-accordion-target="#accordion-collapse-body-hobbys-userprofile" aria-expanded="false" aria-controls="accordion-collapse-body-hobbys-userprofile">
                        <span>{props.defaultLanguage?.hobby[props.data?.language as Lang ?? 'th']}</span>
                        <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
                        </svg>
                     </button>
                  </h2>
                  <div id="accordion-collapse-body-hobbys-userprofile" className="hidden" aria-labelledby="accordion-collapse-heading-hobbys-userprofile">
                     <div className=" border border-t-0 border-gray-200 ">
                     <div id="accordion-collapse-inside-hobbys-userprofile" data-accordion="collapse" className='font-normal'>
                     {hobbyCategories?.map((value) => {
                        return(
                           <span key={value.name} >
                              <Filter_accordion data={value.data as Record<string, TranslatedString>} updateDataSet={updateDataSet} name={value.name as HobbyCategory} parent={'profile'} lang={props.data?.language  as Lang ?? ''}/>
                           </span>
                        )
                     })}
                     </div>
                     
                  </div>
                  </div>
               </div>
            </ul>

            <ul className="font-normal mt-5">
               <div id="accordion-collapse-liftstyle-userprofile" data-accordion="collapse" className='font-normal mt-5'>
                  <h2 id="accordion-collapse-heading-liftstyle-userprofile">
                     <button type="button" className="flex items-center justify-between w-full p-3  font-normal rtl:text-right text-gray-500 border-1 border-gray-300 rounded-lg focus:ring-0 focus:border-blue-600 focus:ring-gray-200    hover:bg-gray-100  gap-3" data-accordion-target="#accordion-collapse-body-liftstyle-userprofile" aria-expanded="false" aria-controls="accordion-collapse-body-liftstyle-userprofile">
                        <span>{props.defaultLanguage?.lifestyle[props.data?.language as Lang ?? 'th']}</span>
                        <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
                        </svg>
                     </button>
                  </h2>
                  <div id="accordion-collapse-body-liftstyle-userprofile" className="hidden" aria-labelledby="accordion-collapse-heading-liftstyle-userprofile">
                     <div className=" border border-t-0 border-gray-200 ">
                        {data ? questionLifestyle.map((value) => {
                           const isChecked = lifestyleSet.has(value.key); 
                           return(
                           <div key={value.key} className="flex items-center ml-2 mb-2 mt-2">
                              <input id={`${value.key}profile`} onChange={() => updateLifestyle(value.key as LifestyleKey)} type="checkbox" checked={isChecked} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500   focus:ring-2  "/>
                              <label htmlFor={`${value.key}profile`} className="ms-2 text-sm font-normal text-gray-900 ">{value.question}</label>
                           </div>
                           )}
                        ) : ''}
                     </div>
                  </div>
                  {toggleCreate ? 
                  <div className='flex justify-center items-end pt-10'>
                     <button type="button" onClick={()=> clickSubmitCreate()} className="text-white bg-green-500 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-bold rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2   ">{props.defaultLanguage?.submit_button[props.data?.language as Lang ?? 'th']}</button>
                     <button type="button" onClick={()=> setNull()} className="text-white bg-red-500 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-bold rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2   ">{props.defaultLanguage?.reset_button[props.data?.language as Lang ?? 'th']}</button>            
                  </div>
                  : 
                  <div className='flex justify-center items-end pt-10'>
                     <button type="button" onClick={()=> clickSubmitEdit()} className="text-white bg-green-500 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-bold rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2   ">{props.defaultLanguage?.submit_button[props.data?.language as Lang ?? 'th']}</button>
                     <button type="button" onClick={()=> setSelectUser(defaultUserSelect as typeData)} className="text-white bg-red-500 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-bold rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2   ">{props.defaultLanguage?.reset_button[props.data?.language as Lang ?? 'th']}</button>            
                  </div>
                  }
               </div>
            </ul>
            
      </div>   
    </div>
  )
}

export default SideProfile

export function Button_Setting_User() {
  return (
    <div>
      
    </div>
  )
}
interface typePropModal_Confirm{
   data:typeData
   defaultLanguage:Settings
   deleteUser:() => void
   close:(value:boolean) => void
}
export function Modal_Confirm_Delete(props:typePropModal_Confirm) {
   return (
     <div>
      <div id="popup-modal" className="z-50 justify-center items-center w-100 max-h-full">
         <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow-sm ">
                  <button type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center  " data-modal-hide="popup-modal">
                     <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                     </svg>
                     <span className="sr-only">Close modal</span>
                  </button>
                  <div className="p-4 md:p-5 text-center">
                     <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                     </svg>
                     <h3 className="mb-5 text-lg font-normal text-gray-500 ">{props.defaultLanguage?.text_confirm_delete[props.data?.language as Lang ?? 'th']}</h3>
                     <button  onClick={() => {props.deleteUser();props.close(false)}} type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300  font-normal rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                        {props.defaultLanguage?.submit_delete[props.data?.language as Lang ?? 'th']}
                     </button>
                     <button onClick={() => {props.close(false)}} type="button" className="py-2.5 px-5 ms-3 text-sm font-normal text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100      ">{props.defaultLanguage?.cancel[props.data?.language as Lang ?? 'th']}</button>
                  </div>
            </div>
         </div>
      </div>
     </div>
   )
 }
 

 