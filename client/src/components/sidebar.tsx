import React, { useEffect, useMemo, useState } from 'react'
import Filter_form from './ui/filter_form'
import Filter_displayselect from './ui/filter_displayselect'
import Filter_accordion from './ui/filter_accordion'
import Filter_displaycatagory from './ui/filter_displaycatagory'
import Filter_buttonuser from './ui/filter_buttonuser'
import { degree,hobbys,questionLifestyle,gender,worldReligions,
   group_blood,chinese_zodiac,western_zodiac,status,worldEthnicities } from './data/FakeData'
import { checkDegree } from '@/providers/lib/TranslateToThai'
import { toast } from 'react-toastify';
import { typeData,Profile,Settings,TranslatedString,CategoryNameHobby,LifestyleKey,CategoryProfile, HobbyCategory } from '@/providers/lib/typeData'

// import Modalsetting from '@/components/report/Modalsetting';

 interface typeProps {
   userData?:typeData[]
   userFilter: (filtered: typeData[]) => void;
   setGetLatLng:(localtion?: Profile['location'],email?:string) => void
   defaultLanguage:Settings
   language:keyof TranslatedString
   data:typeData
 }
 type CategoryName = 'adventure' | 'song' | 'content' | 'game' | 'movie'
  | 'selfcare' | 'sport' | 'travel'
  | 'gender' | 'status' | 'ethnicity' | 'religion'
  | 'western_zodiac' | 'chinese_zodiac' | 'group'
  | 'degree' | 'university' | 'lifestyle';
 interface typeCollectionFilter{
   user_data: CategoryProfile;
   data_select: Set<string>;
 }

 interface typeCollectionHobbyFilter{
   user_data: CategoryNameHobby;
   data_select: Set<string>;
 }



function Sidebar(props:typeProps) {
   const [countSelect,setCountSelect] = useState<number>(2)
   const [minAge, setMinAge] = useState<number>(18)
   const [maxAge, setMaxAge] = useState<number>(100)
   const [minSalary, setMinSalary] = useState<number>(0)
   const [maxSalary, setMaxSalary] = useState<number>(200000)
   const [getUniversity,setGetUniversity] = useState<string[]>()
   const [toggleOpenUniversity,setToggleOpenUniversity] = useState<boolean>(false)
   const [inputUniversity ,setInputUniversity] = useState<string>("")
   const [toggleOpenDegree,setToggleOpenDegree] = useState<boolean>(false)
   const [dataGender, setDataGender] = useState<Set<string>>(new Set());
   const [dataHeight, setDataHeight] = useState<number>(0);
   const [dataStatus, setDataStatus] = useState<Set<string>>(new Set());
   const [dataEthnicity, setDataEthnicity] = useState<Set<string>>(new Set());
   const [dataReligion, setDataReligion] = useState<Set<string>>(new Set());
   const [dataWesternZodiac, setDataWesternZodiac] = useState<Set<string>>(new Set());
   const [dataChineseZodiac, setDataChineseZodiac] = useState<Set<string>>(new Set());
   const [dataGroupฺBlood, setDataGroupฺBlood] = useState<Set<string>>(new Set());
   const [dataDegree, setDataDegree] = useState<Set<string>>(new Set());
   const [dataUniversity, setDataUniversity] = useState<Set<string>>(new Set());
   const [dataLifestyle, setDataLifestyle] = useState<Set<string>>(new Set());
   const [dataFilter, setDataFilter] = useState<Set<typeData>>(new Set());
   const [dataAdventure, setDataAdventure] = useState<Set<string>>(new Set());
   const [dataSong, setDataSong] = useState<Set<string>>(new Set());
   const [dataContent, setDataContent] = useState<Set<string>>(new Set());
   const [dataGame, setDataGame] = useState<Set<string>>(new Set());
   const [dataMovie, setDataMovie] = useState<Set<string>>(new Set());
   const [dataSelfcare, setDataSelfcare] = useState<Set<string>>(new Set());
   const [dataSport, setDataSport] = useState<Set<string>>(new Set());
   const [dataTravel, setDataTravel] = useState<Set<string>>(new Set());
   const [dataClasslistReset,setDataClasslistReset] = useState<Set<string>>(new Set());
   
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
    const allCategories:{name:CategoryName ; data:Set<string>}[] = [
      { name: 'gender', data: dataGender },
      { name: 'status', data: dataStatus },
      { name: 'ethnicity', data: dataEthnicity },
      { name: 'religion', data: dataReligion },
      { name: 'western_zodiac', data: dataWesternZodiac },
      { name: 'chinese_zodiac', data: dataChineseZodiac },
      { name: 'group', data: dataGroupฺBlood },
      { name: 'degree', data: dataDegree },
      { name: 'university', data: dataUniversity },
      { name: 'lifestyle', data: dataLifestyle },
      { name: 'adventure', data: dataAdventure },
      { name: 'song', data: dataSong },
      { name: 'content', data: dataContent },
      { name: 'game', data: dataGame },
      { name: 'movie', data: dataMovie },
      { name: 'selfcare', data: dataSelfcare },
      { name: 'sport', data: dataSport },
      { name: 'travel', data: dataTravel },
    ];
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

    const deleteAlert = (value:string) => {
      toast.error(`ลบตัวกรอง ${value} เรียบร้อย`, {
        position: 'bottom-right',
      });
    };
    const addAlert = (value:string) => {
      toast.success(`เพิ่มตัวกรอง ${value} เรียบร้อย`, {
        position: 'bottom-right',
      });
    };
  
   //เช็คแถบเลื่อนอายุไม่ให้เลื่อนไปเกิน
   const getAge = (e:React.ChangeEvent<HTMLInputElement>,check: 'min' | 'max') => {
      if (check == 'min'){
         if (parseInt(e.target.value) >= maxAge){
            setMinAge(maxAge)
         }else{
            setMinAge(Math.max(Number(e.target.value)))
         }
      }else if(check == 'max'){
         if (parseInt(e.target.value) <= minAge){
            setMaxAge(minAge)
         }else{
            setMaxAge(Math.max(Number(e.target.value)))
         }
      }
   }
  //เช็คเหมือนอายุ
   const getSalary = (e:React.ChangeEvent<HTMLInputElement>,check: 'min' | 'max') => {
      if (check == 'min'){
         if (parseInt(e.target.value) >= maxSalary){
            setMinSalary(maxSalary)
         }else{
            setMinSalary(Math.max(Number(e.target.value)))
         }
      }else if(check == 'max'){
         if (parseInt(e.target.value) <= minSalary){
            setMaxSalary(minSalary)
         }else{
            setMaxSalary(Math.max(Number(e.target.value)))
         }
      }
   }
   //usememo เป็น memorizetion มาดัก
   const filteredUniversity = useMemo(() => {
      if (!inputUniversity) return getUniversity;
      return getUniversity?.filter((value) =>
         value.toLowerCase().includes(inputUniversity.toLowerCase())
      );
      }, [inputUniversity, getUniversity]);

   const updateDataSet = (name: string, value: string) => {
      let added = false;
      
      const handleSetToggle = (
         setter: React.Dispatch<React.SetStateAction<Set<string>>>
      ) => {
         setter((prev) => {
            const updated = new Set(prev);
            if (updated.has(value)) {
            updated.delete(value);
            } else {
            updated.add(value);
            added = true;
            
            }
            return updated;
         });
      };
      
      const handleAlert = (alertValue: string ,name? :string ) => {
         setTimeout(() => {
         if (added) {
            addAlert(alertValue)
            if(name != 'height' || (name == "height" && dataHeight == 0)){
               setCountSelect(prev => prev+1)
            }
         }else{
            deleteAlert(alertValue)
            setCountSelect(prev => prev-1)
         } 
         }, 0);
      };
      
      // 🔄 Map ของชื่อ filter ที่ใช้ Set
      const toggleableFilters: Record<string, {
         setter: React.Dispatch<React.SetStateAction<Set<string>>>,
         translateTH?: (val: string) => string
      }> = {
         gender: { setter: setDataGender },
         status: { setter: setDataStatus },
         ethnicity: { setter: setDataEthnicity },
         religion: { setter: setDataReligion },
         western_zodiac: { setter: setDataWesternZodiac },
         chinese_zodiac: { setter: setDataChineseZodiac },
         group: { setter: setDataGroupฺBlood },
         degree: { setter: setDataDegree},
         university: { setter: setDataUniversity },
         lifestyle: { setter: setDataLifestyle },
         adventure: { setter: setDataAdventure},
         song: { setter: setDataSong},
         content: { setter: setDataContent},
         game: { setter:  setDataGame},
         movie: { setter: setDataMovie},
         selfcare: { setter: setDataSelfcare},
         sport: { setter: setDataSport},
         travel: { setter:  setDataTravel}
      };

      if(name != 'height') {
         const element = document.getElementById(`${value}`)
         const checkClass = element?.classList.contains('selected')
         if(name == 'reset'){
            [...dataClasslistReset].forEach((value) => {
               const resetElement = document.getElementById(`${value}`)
               resetElement?.classList.remove('selected')
            })
            setDataClasslistReset(new Set)
         }else if(checkClass){
            setDataClasslistReset((prev) => {
               const update = new Set(prev);
               update.delete(value);
               return update;
             });
         
            element?.classList.remove('selected')
         }else{
            setDataClasslistReset((prev) => {
               const update = new Set(prev);
               update.add(value);
               return update;
             });
            element?.classList.add('selected')
         }
      }
       
      if (name === 'reset') {
         setMinAge(18);
         setMaxAge(100);
         setMinSalary(0);
         setMaxSalary(200000);
         setDataHeight(0);
         setDataGender(new Set());
         setDataStatus(new Set());
         setDataEthnicity(new Set());
         setDataReligion(new Set());
         setDataWesternZodiac(new Set());
         setDataChineseZodiac(new Set());
         setDataGroupฺBlood(new Set());
         setDataDegree(new Set());
         setDataUniversity(new Set());
         setDataLifestyle(new Set());
         setDataAdventure(new Set())
         setDataSong(new Set())
         setDataContent(new Set())
         setDataGame(new Set())
         setDataMovie(new Set())
         setDataSelfcare(new Set())
         setDataSport(new Set())
         setDataTravel(new Set())
         setCountSelect(2)
         // เพิ่ม filter อื่น ๆ ถ้ามี
         setTimeout(() => {
            toast.error(`ล้างตัวกรองทั้งหมดเรียบร้อย`, {
            position: 'bottom-right',
            });
         }, 0);
      }else if (name === 'height') {
         setDataHeight(parseInt(value));
         added = true;
         handleAlert(`ความสูง ${value} ขึ้นไป`,name);
      }else if (toggleableFilters[name]) {
         const { setter, translateTH } = toggleableFilters[name];
         handleSetToggle(setter);
         handleAlert(translateTH ? translateTH(value) : value);
      }
      };

      const { userFilter, userData } = props;
      useEffect(() => {

         let filtered = userData
         const collectionFilter: typeCollectionFilter[]  = [
            {user_data:'gender',data_select:dataGender},
            {user_data:'status',data_select:dataStatus},
            {user_data:'ethnicity',data_select:dataEthnicity},
            {user_data:'religion',data_select:dataReligion},
            {user_data:'western_zodiac',data_select:dataWesternZodiac},
            {user_data:'chinese_zodiac',data_select:dataChineseZodiac},
            {user_data:'group',data_select:dataGroupฺBlood},
            {user_data:'degree',data_select:dataDegree},
            {user_data:'university',data_select:dataUniversity}
         ]
         const collectionHobbyFilter: typeCollectionHobbyFilter[]  = [
            { user_data: 'adventure', data_select: dataAdventure },
            { user_data: 'song', data_select: dataSong },
            { user_data: 'content', data_select: dataContent },
            { user_data: 'game', data_select: dataGame },
            { user_data: 'movie', data_select: dataMovie },
            { user_data: 'selfcare', data_select: dataSelfcare },
            { user_data: 'sport', data_select: dataSport },
            { user_data: 'travel', data_select: dataTravel },
         ]
         
         filtered = filtered?.filter((user) => user.profile?.age != null && (user.profile?.age >= minAge && user.profile?.age <= maxAge))        
         filtered = filtered?.filter((user) => user.profile?.salary != null && (user.profile?.salary >= minSalary && user.profile?.salary <= maxSalary))
         console.log(filtered)
         if(dataHeight) filtered = filtered?.filter((user) => {
               return user.profile?.height &&  user.profile?.height >= dataHeight
            })
         collectionFilter.forEach((value) => {
            if (value.data_select.size !== 0 && value.user_data) {
               filtered = filtered?.filter((user) =>
                  value.data_select.has(user.profile?.[value.user_data] ?? '')
               );
            }
            });
         collectionHobbyFilter.forEach((value) => {
            if (value.data_select.size !== 0 && value.user_data) {
               filtered = filtered?.filter((user) =>
                  user.profile?.hobbys?.[value.user_data]?.some((v) => value.data_select.has(v))
               );
            }
         });
         if(dataLifestyle.size != 0){
            filtered = filtered?.filter((user) =>{
               return [...dataLifestyle].every(value => user.profile?.lifestyle?.[value as LifestyleKey] == true)
            }
            );
         }
         setDataFilter(new Set(filtered?.sort((a,b) => 
            (b.profile?.like?.length ?? 0) - (a.profile?.like?.length ?? 0) 
      )));
         userFilter(filtered ?? [])
       },[dataGender,minAge,maxAge,minSalary,maxSalary,dataHeight,dataStatus
         ,dataEthnicity,dataReligion,dataWesternZodiac,dataChineseZodiac,dataGroupฺBlood,
         dataDegree,dataAdventure,dataSong,dataContent,dataGame,dataMovie,dataSelfcare,
         dataSport,dataTravel,dataLifestyle,dataUniversity,userFilter,userData]);

  return (
    <div>
      <div className="btnthreeline fixed z-5 left-0 top-15 text-center absolute">
         <button className="threeline inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200   " type="button" data-drawer-target="sidebar" data-drawer-show="sidebar" aria-controls="sidebar">
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
         </svg>
         </button>
      </div>
      <div>
         
      </div>
      <div id="sidebar" className="fixed top-0 left-0 z-40 w-100 h-full p-2 overflow-y-auto transition-transform -translate-x-full bg-white " tabIndex={-1} aria-hidden="true" aria-labelledby="sidebar-label">
         <button type="button" data-drawer-hide="sidebar" aria-controls="sidebar" 
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center  " >
            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            <span className="sr-only">Close menu</span>
         </button>
         
         <div className='flex ml-2 mr-10 justify-between items-center'>
               <span>
                  {countSelect} {props.defaultLanguage.select[props.language]}
               </span>
               <button className=" text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-normal rounded-full text-sm px-5 py-2.5 me-2 mb-2  " type="button" data-drawer-target="sidebar-filter" data-drawer-show="sidebar-filter" aria-controls="sidebar-filter">
                  {props.defaultLanguage.filter[props.language]}
               </button>
         </div>
         <div className="pt-2">
            <ul className="font-normal">
               <ul className="relative insetshadow font-normal border border-gray-300 rounded-xl overflow-y-auto h-40 pb-3">
                  <div>
                     <span className='border border-zinc-300 inline-flex items-center bg-white ml-2 mr-2 mt-2 p-2 rounded-lg hover:bg-gray-200'>
                     {props.defaultLanguage?.age[props.language]} {minAge} - {maxAge}
                     </span>
                     <span className='border border-zinc-300 inline-flex items-center bg-white ml-2 mr-2 mt-2 p-2 rounded-lg hover:bg-gray-200'>
                        {props.defaultLanguage?.salary[props.language]} {minSalary} - {maxSalary}
                     </span>
                     {dataHeight != 0 &&
                        <span className='border border-zinc-300 inline-flex items-center bg-white ml-2 mr-2 mt-2 p-2 rounded-lg hover:bg-gray-200'>
                           {dataHeight}cm+
                        </span>
                     }
                     {allCategories?.map((value) => {
                     return(
                        <span key={value.name}>
                           <Filter_displaycatagory data={[...value.data]} updateDataSet={updateDataSet} name={value.name} lang={props.language}/>
                        </span>
                        )
                     })}
                     
                  </div>
               </ul>
               <div className='flex justify-between mt-3 mb-3 ml-2 mr-2'>
                  <button></button>
                  <span>{props.defaultLanguage?.found_filter_people[props.language]} {[...dataFilter].length}</span>
               </div>
               <ul className="relative bg-gray-100 insetshadow font-normal border border-gray-300 rounded-xl overflow-y-auto h-80 max-h-full pb-3 pl-2 pr-2">
                  <div data-drawer-hide="sidebar" aria-controls="sidebar" role="button" >
                        <Filter_buttonuser data={[...dataFilter]} defaultLanguage={props.defaultLanguage} language={props.language} setGetLatLng={props.setGetLatLng} />
                  </div>   
               </ul>
            </ul>
         </div>
      </div> 

      <div id="sidebar-filter" className="fixed top-0 left-0 z-40 w-100 h-screen p-2 overflow-y-auto transition-transform -translate-x-full bg-white " tabIndex={-1} aria-hidden="true" aria-labelledby="sidebar-label-filter">
         <div className='flex justify-end items-end'>
         <button onClick={() => updateDataSet('reset','')}type="button" data-drawer-hide="sidebar-filter" aria-controls="sidebar-filter" className='absolute left-2 top-2 p-2 z-15 border border-gray-300 rounded-lg hover:bg-gray-300'>
         {props.defaultLanguage?.reset_filter[props.language]}         
         </button>
         <button type="button" data-drawer-hide="sidebar-filter" aria-controls="sidebar-filter" className='p-2 z-15 rounded-lg hover:bg-gray-300'>
            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
               <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"></path>
            </svg>            
         </button>
         </div>
         <div className="pt-5  overflow-y-auto">
            <ul className="font-normal">
               <div className='flex justify-between items-center'>
                     <span>
                        {props.defaultLanguage?.age[props.language]}
                     </span>
                     {minAge} - {maxAge}
               </div>
               <div className="flex gap-3 items-center mt-3">
               <div className="flex-1">
                  <input
                     type="range"
                     min={18}
                     max={100}
                     value={minAge}
                     onChange={(e) =>getAge(e,'min')}
                     className="w-full h-5 bg-gray-200  rounded-lg appearance-none cursor-pointer "
                  />
               </div>
               <div className="flex-1">
                  <input
                     type="range"
                     min={18}
                     max={100}
                     value={maxAge}
                     onChange={(e) => getAge(e,'max')}
                     className="w-full h-5 bg-gray-200 rounded-lg appearance-none cursor-pointer "
                  />
               </div>
               </div>
            </ul>
            <ul className="font-normal mt-5">
               <div className='flex justify-between items-center'>
                     <span>
                        {props.defaultLanguage?.salary[props.language]}
                     </span>
                     {minSalary} - {maxSalary}
               </div>
               <div className="flex gap-3 items-center mt-3">
               <div className="flex-1">
                  <input
                     type="range"
                     min={0}
                     max={200000}
                     step={1000}
                     value={minSalary}
                     onChange={(e) =>getSalary(e,'min')}
                     className="w-full h-5 bg-gray-200  rounded-lg appearance-none cursor-pointer "
                  />
               </div>
               <div className="flex-1">
                  <input
                     type="range"
                     min={0}
                     max={200000}
                     step={1000}
                     value={maxSalary}
                     onChange={(e) => getSalary(e,'max')}
                     className="w-full h-5 bg-gray-200 rounded-lg appearance-none cursor-pointer "
                  />
               </div>
               </div>
            </ul>
            <ul className="font-normal mt-5">
               <div className="grid grid-cols-4 gap-2 z-0">
                  <div className='relative'>
                     <Filter_form readonly value={[...dataGender].map(value => value)} class="cursor-pointer" name={props.defaultLanguage?.gender[props.language]} id="gender"/>
                     <Filter_displayselect  data={gender} updateDataSet={updateDataSet} name="gender" lang={props.language}/>
                  </div>
                  <div className='relative'>
                     <Filter_form readonly value={`${dataHeight}cm+`} class="cursor-pointer" name={props.defaultLanguage?.height[props.language]} id="height"/>
                     <Filter_displayselect data={[...Array(60)].map((x,i)=>`${i+140}cm`)} updateDataSet={updateDataSet} name="height" lang={''}/>
                  </div>
                  <div className='relative'>
                     <Filter_form readonly value={[...dataStatus].map(value => value)} class="cursor-pointer" name={props.defaultLanguage?.status[props.language]} id="status"/>
                     <Filter_displayselect data={status} updateDataSet={updateDataSet} name="status" lang={props.language}/>
                  </div> 
                  <div className='relative'>
                     <Filter_form readonly value={[...dataEthnicity].map(value => value)} class="cursor-pointer" name={props.defaultLanguage?.ethnicity[props.language]} id="ethnicity"/>
                     <Filter_displayselect data={worldEthnicities} updateDataSet={updateDataSet} name="ethnicity" lang={props.language}/>
                  </div>
               </div>
               <div className="grid grid-cols-4 gap-2 z-0 mt-2 ">
                  <div className='relative'>
                     <Filter_form readonly value={[...dataReligion].map(value => value)} class="cursor-pointer" name={props.defaultLanguage?.religion[props.language]} id="religion"/>
                     <Filter_displayselect data={worldReligions} updateDataSet={updateDataSet} name="religion" lang={props.language}/>
                  </div>
                  <div className='relative'>
                     <Filter_form readonly value={[...dataWesternZodiac].map(value => value)} class="cursor-pointer" name={props.defaultLanguage?.western_zodiac[props.language]} id="western_zodiac"/>
                     <Filter_displayselect data={western_zodiac} updateDataSet={updateDataSet} name="western_zodiac" lang={props.language}/>
                  </div>
                  <div className='relative'>
                     <Filter_form readonly value={[...dataChineseZodiac].map(value => value)} class="cursor-pointer" name={props.defaultLanguage?.chinese_zodiac[props.language]} id="chinese_zodiac"/>
                     <Filter_displayselect data={chinese_zodiac} updateDataSet={updateDataSet} name="chinese_zodiac" lang={props.language}/>
                  </div>
                  <div className='relative'>
                     <Filter_form readonly value={[...dataGroupฺBlood].map(value => value)} class="cursor-pointer" name={props.defaultLanguage?.group_blood[props.language]} id="group"/>
                     <Filter_displayselect data={group_blood} updateDataSet={updateDataSet} name="group" lang={''}/>
                  </div>
               </div>
            </ul>
            <ul className="font-normal mt-5">
               <div className="z-0">
                     <Filter_form  class="cursor-pointer" readonly name={props.defaultLanguage?.degree[props.language]} id="degree" value={[...dataDegree].map(value => checkDegree(value,props.language))} onFocus = {setToggleOpenDegree} onBlur = {setToggleOpenDegree}/>
                  {toggleOpenDegree ? 
                     <Filter_displayselect data={degree} updateDataSet = {updateDataSet} name="degree" lang={props.language}/>
                  :''}
               </div>
            </ul>
            {(dataDegree.has('vocational') || dataDegree.has('high_vocational') || dataDegree.has('diploma') 
                  || dataDegree.has('bachelors') || dataDegree.has('masters') || dataDegree.has('doctorate')) ?
               <ul className="font-normal mt-5">
               <div className=" z-0">
                     <Filter_form name={props.defaultLanguage?.university[props.language]} id="university" value={inputUniversity} onFocus = {setToggleOpenUniversity} onBlur = {setToggleOpenUniversity} onChange = {setInputUniversity}/>
                     {toggleOpenUniversity ? 
                        <Filter_displayselect data={filteredUniversity} setInput = {setInputUniversity} updateDataSet = {updateDataSet} name="university" lang={''}/>
                     :''}
               </div>
            </ul>: ''}

            <ul className="font-normal mt-5">
               <div id="accordion-collapse-hobbys" data-accordion="collapse" className='font-normal mt-5'>
                  <h2 id="accordion-collapse-heading-hobbys">
                     <button type="button" className="flex items-center justify-between w-full p-3  font-normal rtl:text-right text-gray-500 border-1 border-gray-300 rounded-lg focus:ring-0 focus:border-blue-600 focus:ring-gray-200    hover:bg-gray-100  gap-3" data-accordion-target="#accordion-collapse-body-hobbys" aria-expanded="false" aria-controls="accordion-collapse-body-hobbys">
                        <span>{props.defaultLanguage?.hobby[props.language]}</span>
                        <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
                        </svg>
                     </button>
                  </h2>
                  <div id="accordion-collapse-body-hobbys" className="hidden" aria-labelledby="accordion-collapse-heading-hobbys">
                     <div className=" border border-t-0 border-gray-200 ">
                     <div id="accordion-collapse-inside-hobbys" data-accordion="collapse" className='font-normal'>
                     {hobbyCategories?.map((value) => {
                        return(
                           <span key={value.name}>
                              <Filter_accordion data={value.data} updateDataSet={updateDataSet} name={value.name as HobbyCategory} parent={''} lang={props.language}/>
                           </span>
                        )
                     })}
                     </div>

                     </div>
                  </div>
               </div>
            </ul>

            <ul className="font-normal mt-5">
               <div id="accordion-collapse-liftstyle" data-accordion="collapse" className='font-normal mt-5'>
                  <h2 id="accordion-collapse-heading-liftstyle">
                     <button type="button" className="flex items-center justify-between w-full p-3  font-normal rtl:text-right text-gray-500 border-1 border-gray-300 rounded-lg focus:ring-0 focus:border-blue-600 focus:ring-gray-200    hover:bg-gray-100  gap-3" data-accordion-target="#accordion-collapse-body-liftstyle" aria-expanded="false" aria-controls="accordion-collapse-body-liftstyle">
                        <span>{props.defaultLanguage?.lifestyle[props.language]}</span>
                        <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
                        </svg>
                     </button>
                  </h2>
                  <div id="accordion-collapse-body-liftstyle" className="hidden" aria-labelledby="accordion-collapse-heading-liftstyle">
                     <div className=" border border-t-0 border-gray-200 ">
                        {questionLifestyle.map((value) => 
                           <div key={value.key} className="flex items-center ml-2 mb-2 mt-2">
                              <input id={`${value.key}sidebar`} onChange={() => updateDataSet('lifestyle',value.key)} type="checkbox" checked={dataLifestyle.has(value.key)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500   focus:ring-2  "/>
                              <label htmlFor={`${value.key}sidebar`} className="ms-2 text-sm font-normal text-gray-900 ">{value.question}</label>
                           </div>
                        )}
                     </div>
                  </div>
               </div>
            </ul>

            <ul className="relative insetshadow font-normal mt-5 border border-gray-300 rounded-xl overflow-y-auto max-h-60 pb-3">
               <div>
                  <div className="sticky top-0 right-0 left-0 max-w-full h-8 text-lg text-center bg-gray-100 rounded-t-xl">{props.defaultLanguage?.filter_use[props.language]}</div>
                     <span className='border border-zinc-300 inline-flex items-center bg-white ml-2 mr-2 mt-2 p-2 rounded-lg hover:bg-gray-200'>
                     {props.defaultLanguage?.age[props.language]} {minAge} - {maxAge}
                     </span>
                  <span className='border border-zinc-300 inline-flex items-center bg-white ml-2 mr-2 mt-2 p-2 rounded-lg hover:bg-gray-200'>
                     {props.defaultLanguage?.salary[props.language]} {minSalary} - {maxSalary}
                  </span>
                  {dataHeight != 0 &&
                     <span className='border border-zinc-300 inline-flex items-center bg-white ml-2 mr-2 mt-2 p-2 rounded-lg hover:bg-gray-200'>
                        {dataHeight}cm+
                     </span>
                  }
                  {allCategories?.map((value) => {
                     return(
                        <span key={value.name}>
                           <Filter_displaycatagory data={[...value.data]} updateDataSet={updateDataSet} name={value.name} lang={props.language}/>
                        </span>
                     )
                  })}
                  
               </div>
            </ul>

         </div>
      </div>
      
    </div>
  )
}

export default Sidebar