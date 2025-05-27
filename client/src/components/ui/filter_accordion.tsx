import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { HobbyCategory, Lang, SettingHobbyCategory, TranslatedString } from '@/providers/lib/typeData'
interface FilterAccordionProps {
  name: HobbyCategory
  data: Record<string, TranslatedString>
  updateDataSet:(name: string, value: string) =>void
  parent:string
  lang:Lang
}
export default function Filter_accordion(props:FilterAccordionProps) {
  const [imageurl,setImageUrl] = useState<string>('')
  const [namethai,setNameThai] = useState<string>('')
    useEffect(() => {
    const statusMap: Record<string, string> = {
      adventure: '/adventure-icon.png',
      song: '/music-icon.png',
      content: '/content-icon2.png',
      game: '/game-icon.png',
      movie: '/movie-icon.png',
      selfcare: '/self-love.png',
      travel: '/travel-icon.png',
      sport: '/sport-icon.png',
    };
    const statusMapName: SettingHobbyCategory = {
      adventure: {en:'Adventure',th:'ผจญภัย'},
      song: {en:'Song',th:'ฟังเพลง'},
      content: {en:'Content',th:'สร้างคอนเทนต์'},
      game: {en:'Game',th:'เกม'},
      movie: {en:'Movie',th:'หนัง'},
      selfcare: {en:'Selfcare',th:'ดูแลตัวเอง'},
      travel: {en:'Travel',th:'ท่องเที่ยว'},
      sport: {en:'Sport',th:'กีฬา'},
    };
    setImageUrl(statusMap[props.name])
    setNameThai(statusMapName[props.name as HobbyCategory]?.[props.lang as Lang])
    },[props.name,props.lang])

  return (
    <>
      <h2 id={`accordion-collapse-heading-${props.name}${props.parent ?? ''}`}>
        <button type="button" className="flex items-center justify-between w-full pl-4 pr-4 pt-2 pb-2  font-normal rtl:text-right text-gray-500 focus:ring-0 focus:border-blue-600 focus:ring-gray-200    hover:bg-gray-100  gap-3" data-accordion-target={`#accordion-collapse-body-${props.name}${props.parent ?? ''}`} aria-expanded="false" aria-controls={`accordion-collapse-body-${props.name}${props.parent ?? ''}`}>
          <span> 
            { imageurl ?
              <Image src={imageurl} width={30} height={30} alt={`${props.name}${props.parent ?? ''} image`} className='p-1'/> : ''
              }
          </span>
          <span>{namethai}</span>
            <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
          </svg>
        </button>
    </h2>
    <div id={`accordion-collapse-body-${props.name}${props.parent ?? ''}`} className="hidden" aria-labelledby={`accordion-collapse-heading-${props.name}${props.parent ?? ''}`}>
        <div className="p-1 border border-t-0 border-gray-200 ">
          {props.data ? 
              Object.entries(props.data).map(([id,value]) => (
                    <button key={id} id={`${id}${props.parent ?? ''}`} onClick={() => props.updateDataSet(props.name,id)} className='border border-zinc-300 inline-flex items-center bg-white ml-2 mr-2 mt-2 p-1 rounded-lg hover:bg-gray-200'>
                      {value[props.lang  as Lang]}
                    </button>
              )): ''}
        </div>
    </div>
    </>
  )
}
