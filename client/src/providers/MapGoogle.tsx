'use client';

import Script from 'next/script';
import { useEffect, useRef, useState,useCallback  } from 'react';
import { createCustomMarker , CustomMarker } from './lib/createCustomMarkers';
import { PopupUser ,PopupMySelfCurrent } from './lib/createCustomTextPopup';
import { Lang, Profile, typeData } from './lib/typeData';
import { Settings } from './lib/typeData';
import { settings } from '@/components/data/FakeData';
interface typeProps{
  userData?:typeData[]
  userMove?: {
    location?: Profile['location'];
    email?: string;
  };
  getDataMyself:typeData
  defaultLanguage:Settings
}

const MapProvider = (props:typeProps) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [map ,setMap ] = useState<google.maps.Map>()
  const [infoWindow,setInfoWindow] = useState<google.maps.InfoWindow>()
  const [user,setUser] = useState<typeData[]>([])
  const [userInBound,setUserInBound] = useState<typeData[]>([])
  const [copuntPeople,setCountPeople] = useState<number>()
  const [current,setCurrent] = useState<Profile['location']>()
  const mapRef = useRef<HTMLDivElement | null>(null);
  const userRef = useRef<Set<string>>(new Set());
  const markerRef = useRef<Set<string>>(new Set());
  const markerMapRef = useRef<Map<string, google.maps.marker.AdvancedMarkerElement>>(new Map()); //เก็บข้อมูล marker Map
  const infoWindowMapRef = useRef<Map<string, google.maps.InfoWindow>>(new Map()); //เก้บข้อมูลแสดงผล
  const getUserRef = useRef<typeData[]>([]); //เก็บ user ดิบๆ
  const [dataMyself,setDataMyself] = useState<typeData>()
  const [toggleDisplay,setToggleDisplay] = useState<boolean>(false)
  const {userData,getDataMyself} = props
  useEffect(() => {
    if(getDataMyself){
      setDataMyself(getDataMyself as typeData)
    }
  },[getDataMyself])
  
  const datamap = useCallback(async () => {
    if (mapLoaded && window.google && mapRef.current) {
      const map = new window.google.maps.Map(mapRef.current, {
        mapTypeControl: false,
        fullscreenControl: false,
        zoom: 12,
        mapId: 'googleMap'
      });
      navigator.geolocation.getCurrentPosition((position) => {
        const {latitude,longitude} = position.coords
        const LatLng = {lat:latitude,lng:longitude}
        map?.setCenter(LatLng)
        setCurrent(LatLng)
      })
      setMap(map)
      setInfoWindow(new window.google.maps.InfoWindow())
      map.addListener("idle", () => {
        findPeopleBound(map)  
      });      
    }
    
  },[mapLoaded])

  useEffect(() => {
    datamap() 
  }, [datamap]);

  const clickUserMove = (location:Profile['location'],email?:string) =>{
      map?.panTo(location)
      map?.setZoom(15)
    if(email) {
      const marker = markerMapRef.current.get(email)
      const infoWindow = infoWindowMapRef.current.get(email)
      console.log(infoWindow)
      if (marker && marker?.position && infoWindow && map) {
        infoWindow.open({
          anchor: marker,
          map,
        });
        map.panTo(marker.position);
        map.setZoom(15);
      }
    }else{
      const getMarker =  markerMapRef.current.get('registerMap')
      console.log(getMarker)
      if (getMarker) {
        getMarker.map = null
        markerMapRef.current.delete('registerMap')
      }
      const registerMap = new window.google.maps.marker.AdvancedMarkerElement({
        map,
        position: location,
      });
      markerMapRef.current.set('registerMap', registerMap);
    }
  }
  useEffect(() => {
    if (props.userMove?.location && !props.userMove?.email){
      clickUserMove(props.userMove.location)
    }else if(props.userMove?.location && props.userMove?.email){
      const location = props.userMove.location
      const email = props.userMove.email
      if (props.userMove){
        clickUserMove(location,email)
      }
    }
  }, [props.userMove,map])
  
  useEffect(() => {
    getUserRef.current = userData ?? [];
    markerMapRef.current.forEach((marker) => {
      marker.map = null; 
    });
    markerMapRef.current.clear();
    userRef.current.clear()
    markerRef.current.clear()
    infoWindowMapRef.current.clear()
    setUser([])
  }, [userData]);
  
  const findPeopleBound = (mapData : google.maps.Map) => {
    if(!getUserRef) return
    console.log(getUserRef)
    const bounds = mapData.getBounds()
    // const NE = bounds?.getNorthEast().toJSON()
    // const SW = bounds?.getSouthWest().toJSON()
    // const center = mapData?.getCenter()
    const data:typeData[] = []
    const dataInBound:typeData[] = []
    let dataCount:number = 0
    getUserRef?.current.filter((value) => {
      if(value.profile){
        return bounds?.contains(value.profile.location)
      }
    }).map((value) => {
      if (value.profile){
        dataCount +=1
        dataInBound.push(value)
        const checkData = userRef.current.has(`${value.email}`)
        if (checkData){
            return
          } else{
            data.push(value)
            userRef.current.add(`${value.email}`)
          }
      }
    })
    setCountPeople(dataCount)
    setUser((prev) => [...prev, ...data]);
    setUserInBound(() => [...dataInBound])
  }

  useEffect(() => {
    markerMapRef.current.forEach((marker) => {
      marker.map = null; 
    });
    markerMapRef.current.clear();
    markerRef.current.clear()
    infoWindowMapRef.current.forEach((info) => {
      info.close() 
    });
    infoWindowMapRef.current.clear()
  },[dataMyself])
  
  useEffect(() => {
    user?.forEach((value:typeData) => { 
      if (value.profile){
        if (markerRef.current.has(`${value.email}`)) return
        markerRef.current.add(`${value.email}`)
        const userMap = new window.google.maps.marker.AdvancedMarkerElement({
          map,
          position: value.profile.location,
          content:CustomMarker(value.profile.gender)
        });

        let infoWindow
        if(value.profile.gender == 'female'){
          infoWindow = new window.google.maps.InfoWindow({
            content: PopupUser(value,dataMyself?.language as Lang,dataMyself?._id as string),
            ariaLabel: "Female",
          });
        }else{
          infoWindow = new window.google.maps.InfoWindow({
            content: PopupUser(value,dataMyself?.language as Lang,dataMyself?._id as string),
            ariaLabel: "Male",
          });
        }
        userMap.addListener("click", () => {
          infoWindow?.open({
            anchor: userMap,
            map,
          });
        });
        markerMapRef.current.set(value.email, userMap);
        infoWindowMapRef.current.set(value.email, infoWindow);
      }
    })
      
  },[user,map,dataMyself])
  
  
  useEffect(() => {
  if (!infoWindow || !map || !current) return;
      const mySelf = new window.google.maps.marker.AdvancedMarkerElement({
        map,
        position: current,
        title: 'ที่อยู่ปัจจุบัน',
        content:createCustomMarker()
      });   
      const infoWindowMyselfCurrent = new window.google.maps.InfoWindow({
        content: PopupMySelfCurrent((dataMyself as typeData) ?? ''),
        ariaLabel: "Uluru",
      });
      mySelf.addListener("click", () => {
        infoWindowMyselfCurrent?.open({
          anchor: mySelf,
          map,
        });
      });
    },[map,current,infoWindow,dataMyself])
    
  
  const button_move_locationdata = async () => {
    if(dataMyself && dataMyself.profile) {
      clickUserMove(dataMyself?.profile.location,dataMyself.email)
    }


  }
  const button_move_current = async () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const {latitude,longitude} = position.coords
      const LatLng = {lat:latitude,lng:longitude}
      clickUserMove(LatLng,dataMyself?.email)
      map?.panTo(LatLng)
      map?.setZoom(15)
      
    })
  }
  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&v=3.59&libraries=marker,geometry`}
        strategy="afterInteractive"
        onLoad={() => {
          console.log('✅ Google Maps API loaded');
          setMapLoaded(true);
        }}
      />
      <div>
        <div id="googleMap" ref={mapRef} className="w-screen h-screen"/>
        <div onClick={() => setToggleDisplay(!toggleDisplay)} className=' cursor-pointer absolute top-2.5 right-5 z-10 text-black text-gray-500 font-bold border-1 border-gray-300 p-2 rounded-lg bg-white flex items-center justify-between'>
          <span>
            {settings.found_filter_people[dataMyself?.language as Lang ?? 'th']} 
          </span>
          <span className='ml-2 mr-2'>
          {copuntPeople}
          </span>
          <span className=' mr-2'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </span> 
        </div>
        {toggleDisplay ? 
        <div className='max-h-60 overflow-y-auto absolute top-14 right-5 z-10 text-black text-gray-500 font-bold border-1 border-gray-300 p-1 rounded-lg bg-white'>
            {userInBound.map(value => 
            <div key={value.email}>
              <button onClick={() => {if (value.profile) { clickUserMove(value.profile.location,value.email)}}} onMouseEnter={() => console.log('qweqw')}className={`w-full rounded-sm p-1 mb-1
                ${value.profile?.gender == 'female' ? 'filterbannerfemale text-white ' : value.profile?.gender == 'male' ? 'filterbannermale text-white ' : 'filterbannerother text-black'}`}>
                {value.profile?.name}
              </button>
            </div>
            )}
        </div>:''}
        <div className='absolute bottom-6 right-50 z-10'>
          <button type="button" onClick={button_move_locationdata} 
          className="text-black border-1 border-gray-300 ml-5 text-gray-500 font-bold bg-white hover:bg-gray-200 hover:text-gray-800  focus:ring-4 focus:ring-purple-300 rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
          >
            {settings.location_in_system[dataMyself?.language as Lang ?? 'th']} 
          </button>
          <button type="button" onClick={button_move_current} 
          className="text-black border-1 border-gray-300 ml-5 bg-purple-700 text-gray-500 font-bold bg-white hover:bg-gray-200 hover:text-gray-800  focus:ring-4 focus:ring-purple-300 rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
          >
            {settings.location_current[dataMyself?.language as Lang ?? 'th']} 
          </button>
        </div>

        
      </div>
    </>
  );
};

export default MapProvider;
