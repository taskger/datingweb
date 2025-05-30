'use client'
import React,{ useEffect, useRef, useState} from 'react'
import MapGoogle from '@/providers/MapGoogle'
import Sidebar from '@/components/sidebar'
import { toast, ToastContainer } from 'react-toastify'
import { Profile,Lang, typeData, SessionGoogle } from '@/providers/lib/typeData'
import ProfileUser from '@/components/profile'
// import Adminsidebar from '@/components/adminsidebar'
import { settings  } from '@/components/data/FakeData'
import { alovaInstance } from '@/components/data/alova'
import { useSession, signIn, signOut } from "next-auth/react";
import Image from 'next/image'
import CreateProfile from '@/components/createprofile'

interface typeLatlng{
  location?: Profile['location']
  email?: string
} 

const Page = () => {
    const [getLatLng, setGetLatLngState] = useState<typeLatlng>()
    const [dataMyself, setDataMyself] = useState<typeData>()
    const [dataFilter,setDataFilter] = useState<typeData[]>()
    const [userData,setUserData] = useState<typeData[]>()
    const [toggleLoginGoogle,setToggleLoginGoogle] = useState<boolean>(false)
    const [toggleCreate,setToggleCreate] = useState<boolean>(false)
    const [showHoverGoogle,setShowHoverGoogle] = useState<boolean>(false)
    const [loading,setLoading] = useState<boolean>(true)
    const [loadingFirst,setLoadingFirst] = useState<boolean>(true)
    const [requestEdit,setRequestEdit] = useState<typeData>()
    const [requestDelete,setRequestDelete] = useState<typeData>()
    const [requestDeleteRegisterMap,setrequestDeleteRegisterMap] = useState<boolean>(false)
    const hoverTimeout = useRef<NodeJS.Timeout | null>(null);
    const [showText, setShowText] = useState(false);
    const [lang,setLang] = useState<Lang>('en')
    const { data: session } = useSession();

    useEffect(() => {
      const timer = setTimeout(() => {
        setShowText(true);
      }, 7000);
      return () => clearTimeout(timer); // cleanup
    }, []);

    useEffect(() => {
      if (!loadingFirst) {
        setShowText(false);
      }
    }, [loadingFirst]);

    useEffect(() => {
      if(session){
        checkAuthentication()
      }else{
        setLoading(false)
      }
    },[session])
    const checkAuthentication = async() => {
      if (!session) return setToggleLoginGoogle(true)
      setLoading(true)
      setLoadingFirst(true)
      try{
        const email = session.user?.email
        const image = session.user?.image
        await alovaInstance.Put<typeData>(`/checkimage/${email}?t=${Date.now()}`,{
          image:image
        });
        const data = await alovaInstance.Get<typeData>(`/user/${email}?t=${Date.now()}`);
        const dataUser = await alovaInstance.Get<typeData[]>(`/user?t=${Date.now()}`);
        if(!data){
          setToggleCreate(true)
        }else{
          setDataMyself(data)
        }
        setUserData(dataUser)
      }catch (error: unknown){
        if (error instanceof Error) {
          toast.error(`${settings?.error[dataMyself?.language as Lang ?? 'th']} ${error.message}`);
        } else {
          toast.error(`${settings.error[dataMyself?.language as Lang ?? 'th']} Unknown error`);
        }
      }finally{
        const element = document.getElementById('waitserver')
        if(element) element.innerText = ''
        setLoading(false)
        setLoadingFirst(false)
      }
    }

    const setGetLatLng = (location?: Profile['location'], email?: string) => { 
      setLoading(true)
      try{
        setGetLatLngState({ location, email });
      }catch{
        console.error('หาที่อยู่ไม่ได้')
      }finally{
        setLoading(false)
      }
    };

    const ClickSetLanguage = async  (_id: string, lang: string) => {
      const updatedLang = lang === 'en' ? 'th' : 'en'
      setDataMyself((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          language: updatedLang,
        };
      });

      setLoading(true)
      try {
        await alovaInstance.Put(`/setting/${_id}`, { language: updatedLang });
      } catch (error) {
        console.error("Update language failed:", error);
      }finally{
        setLoading(false)
      }
    };
    const RequestDeleteInMap = (valueId: string) => {
      setUserData(prev => prev?.filter(user => user._id !== valueId));
    };
    const RequestEditInMap = async(email: string) => {
      try{
        const data : typeData = await alovaInstance.Get(`/user/${email}?t=${Date.now()}`)
        if (!data) return
        setUserData(prev => {
          if(!prev) return []
          const map = prev.map((value) => {
            if(value.email == email){
              return data
            }
            return value
          })
          return map; 
        });
      }catch (error) {
        console.error("Failed to update user:", error);
      }
    };
    const RequestCreateMap = async(email: string) => {
      try{
        const data : typeData = await alovaInstance.Get(`/user/${email}?t=${Date.now()}`)
        if (!data) return
        setUserData(prev => {
          if(!prev) return [data]
          return [...prev,data]; 
        });
      }catch (error) {
        console.error("Failed to update user:", error);
      }
    }
    const requestReload = async() => {
      if (!session) return setToggleLoginGoogle(true)
        try{
          const email = session.user?.email
          const data = await alovaInstance.Get<typeData>(`/user/${email}?t=${Date.now()}`);
          const dataUser = await alovaInstance.Get<typeData[]>(`/user?t=${Date.now()}`);
          if(!data){
            setToggleCreate(true)
          }else{
            setDataMyself(data)
          }
          setUserData(dataUser)
        }catch (error: unknown){
          if (error instanceof Error) {
            toast.error(`${settings?.error[dataMyself?.language as Lang ?? 'th']} ${error.message}`);
          } else {
            toast.error(`${settings.error[dataMyself?.language as Lang ?? 'th']} Unknown error`);
          }
        }
    }
  return (
    <div id="page" className='text-black'>
      {loading ? 
        <div role="status" className="fixed inset-0 flex flex-col items-center justify-center z-50 backdrop-blur-xs">
        <svg
          aria-hidden="true"
          className="w-10 h-10 text-gray-200 animate-spin fill-blue-600 mb-4"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        {showText && loadingFirst && 
          <div className="text-center">
            <div id="waitserver1">{settings.waitserver?.['en']}</div>
            <div id="waitserver2">{settings.waitserver?.['th']}</div>
          </div>
        }
      </div> 
      :'' }

      {toggleLoginGoogle ?
        <div role="status" id='LoginGoogleBackdrop' className='absolute flex justify-center h-full w-full z-50 backdrop-blur-xs'>
          <div className='absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2  flex items-center justify-between'>
              <button className='z-10 border-1 border-gray-300 text-gray-500 font-bold bg-white hover:bg-gray-200 hover:text-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-sm px-5 py-2.5 text-center inline-flex items-center' onClick={() => signIn("google")}>
                <Image src={'/google-logo.png'} width={30} height={30} alt='google-logo' className='mr-3'/>
                {settings.signingoogle?.[lang as Lang]}
              </button>
          </div>
      </div>: '' }
      {!session ? (
          <button onClick={() => signIn("google")} onMouseOver={() =>  hoverTimeout.current = setTimeout(() => setShowHoverGoogle(true),200)} onMouseOut={() =>  {if (hoverTimeout.current) clearTimeout(hoverTimeout.current);setShowHoverGoogle(false)}} className={`absolute googleloginhover p-2.5 left-17 top-2 z-10 border-1 border-gray-300 text-gray-500 font-bold bg-white hover:bg-gray-200 hover:text-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-sm  text-center inline-flex items-center`}>
            <Image src={'/google-logo.png'} width={20} height={20} alt='google-logo' className='mr-3'/>
            {showHoverGoogle && `${settings.signingoogle?.[lang as Lang ]}`}
          </button>
        ) : (
          <button onClick={() => signOut()} onMouseOver={() =>  hoverTimeout.current = setTimeout(() => setShowHoverGoogle(true),200)} onMouseOut={() =>  {if (hoverTimeout.current) clearTimeout(hoverTimeout.current);setShowHoverGoogle(false)}} className={`absolute ${dataMyself?.language == 'th' ? 'googlelogouthoverth' : 'googlelogouthover'} p-2.5 left-17 top-2 z-10 border-1 border-gray-300 text-gray-500 font-bold bg-white hover:bg-gray-200 hover:text-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-sm  text-center inline-flex items-center`}>
            <Image src={'/google-logo.png'} width={20} height={20} alt='google-logo' className='mr-3'/>
            {showHoverGoogle && `${settings.signout?.[dataMyself?.language as Lang]}`}
          </button>
        )}
      <div onMouseDown={() => {if (!session) checkAuthentication()}}>
        {toggleCreate ? 
          <div role="status" id='LoginGoogleBackdrop' className='absolute flex justify-center h-full w-full z-50 backdrop-blur-xs'>
            <button onClick={() => signOut()} className={`cursor-pointer right-10 top-0 absolute p-2.5 top-2 z-10 border-1 border-gray-300 text-gray-500 font-bold bg-white hover:bg-gray-200 hover:text-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-sm  text-center inline-flex items-center`}>
               <Image src={'/google-logo.png'} width={20} height={20} alt='google-logo' className='mr-3'/>
               {settings.signout?.[lang as Lang]}
            </button>
            <button onClick={() => setLang(lang === 'th' ? 'en' : 'th')} id="dropdownDefaultButton" className={`cursor-pointer right-10 absolute p-2.5 top-15 z-10 border-1 border-gray-300 text-gray-500 font-bold bg-white hover:bg-gray-200 hover:text-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-sm  text-center inline-flex items-center`} type="button">
              {settings.language?.[(lang as Lang) === 'en' ? 'th' : 'en']}
            </button>
            <div className='absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2  '>
                <div className='z-10 w-150 h-150 shadow-2xl border-1 border-gray-300 text-gray-500 font-normal bg-white focus:ring-blue-300 rounded-xl text-sm px-5 py-2.5 text-center inline-flex items-center' >
                <CreateProfile setLoading={setLoading} lang={lang} setGetLatLng={setGetLatLng} data={session as SessionGoogle} userData={userData ?? []}  defaultLanguage={settings}/>
                </div>
            </div>
        </div> : ''}
        <button onClick={() => ClickSetLanguage(dataMyself?._id  ?? '',dataMyself?.language ?? 'th')} id="dropdownDefaultButton" className="absolute right-20  bottom-6 z-10 border-1 border-gray-300 text-gray-500 font-bold bg-white hover:bg-gray-200 hover:text-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center " type="button">
        {settings.language?.[(dataMyself?.language as Lang) === 'en' ? 'th' : 'en'] ?? 'th'}
        </button>

        <ProfileUser 
          requestReload={requestReload}
          setrequestDeleteRegisterMap={setrequestDeleteRegisterMap}
          RequestEditInMap={RequestEditInMap} 
          RequestDeleteInMap={RequestDeleteInMap}
          RequestCreateMap={RequestCreateMap} 
          setLoading={setLoading}
          requestEdit={requestEdit as typeData}
          requestDelete={requestDelete as typeData} 
          setGetLatLng={setGetLatLng} 
          data={dataMyself as typeData} 
          userData={userData ?? []} 
          defaultLanguage={settings}/>

        <Sidebar 
          data={dataMyself as typeData} 
          userData={userData} 
          userFilter={setDataFilter} 
          setGetLatLng={setGetLatLng} 
          defaultLanguage={settings} 
          language={dataMyself?.language as Lang ?? 'th'}/>

        <MapGoogle 
          requestDeleteRegisterMap={requestDeleteRegisterMap} 
          setrequestDeleteRegisterMap={setrequestDeleteRegisterMap}
          setLoading={setLoading} 
          userData={dataFilter} 
          userMove={getLatLng} 
          getDataMyself={dataMyself as typeData} 
          defaultLanguage={settings} 
          setRequestEdit={setRequestEdit}
          setRequestDelete={setRequestDelete}
          RequestEditInMap={RequestEditInMap} 
          />
        <ToastContainer 
          autoClose={3000}/>
        
      </div>
    </div>
  )
}

export default Page