'use client'
import React,{ useEffect, useState} from 'react'
import MapGoogle from '@/providers/MapGoogle'
import Sidebar from '@/components/sidebar'
import { ToastContainer } from 'react-toastify'
import { Profile,Lang, typeData } from '@/providers/lib/typeData'
import ProfileUser, { Button_Setting_User } from '@/components/profile'
// import Adminsidebar from '@/components/adminsidebar'
import { settings  } from '@/components/data/FakeData'
import { useRequest } from 'alova/client'
import { alovaInstance } from '@/components/data/alova'

interface typeLatlng{
  location?: Profile['location']
  email?: string
} 

const Page = () => {
    const [getLatLng, setGetLatLngState] = useState<typeLatlng>()
    const [dataMyself, setDataMyself] = useState<typeData>()
    const [dataFilter,setDataFilter] = useState<typeData[]>()
    const [rawData,setRawData] = useState<typeData[]>()
    const setGetLatLng = (location?: Profile['location'], email?: string) => {
      setGetLatLngState({ location, email });
    };
    
    const { data:userData, loading, error } = useRequest(() => alovaInstance.Get('/user'));
    
    const email = 'chayanon.poolwas@gmail.com'
    const { data:getDataMyself ,error:dataMyselfError} = useRequest(() => alovaInstance.Get(`/user/${email}`));
    const myself = getDataMyself as typeData;

    useEffect(() => {
      if (userData) {
        setRawData(userData as typeData[])
      }
      if (error) {
        console.error(error);
      }
    }, [userData, error]);
    
    useEffect(() => {
      if (myself) {
        setDataMyself(myself)
      }else{
        // console.error('บังคับไปกรอก user');
      }
      if (dataMyselfError) {
        console.error(dataMyselfError);
      }
    }, [myself, dataMyselfError]);

    const ClickSetLanguage = async  (_id: string, lang: string) => {
      const updatedLang = lang === 'en' ? 'th' : 'en'
      setDataMyself((prev) => {
        if (!prev) return prev; // เผื่อ null/undefined
        return {
          ...prev,
          language: updatedLang,
        };
      });
      try {
        await alovaInstance.Put(`/setting/${_id}`, { language: updatedLang });
      } catch (error) {
        console.error("Update language failed:", error);
      }
    };

  return (
    <div>
      {loading && 
      <div role="status" className='flex justify-center h-full w-full'>
          <svg aria-hidden="true" className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
          <span className="sr-only">Loading...</span>
      </div>}
 
      <button onClick={() => ClickSetLanguage(dataMyself?._id  ?? '',dataMyself?.language ?? '')} id="dropdownDefaultButton" className="absolute right-20  bottom-6 z-10 border-1 border-gray-300 text-gray-500 font-bold bg-white hover:bg-gray-200 hover:text-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
        {settings.language?.[dataMyself?.language as Lang]}
      </button>
      <Button_Setting_User/>
      <ProfileUser setGetLatLng={setGetLatLng} data={dataMyself as typeData} userData={rawData ?? []} defaultLanguage={settings}/>
      <Sidebar userData={rawData} userFilter={setDataFilter} setGetLatLng={setGetLatLng} defaultLanguage={settings} language={dataMyself?.language as Lang}/>
      <MapGoogle userData={dataFilter} userMove={getLatLng} getDataMyself={dataMyself as typeData}/>
      <ToastContainer autoClose={3000}/>
    </div>
  )
}

export default Page