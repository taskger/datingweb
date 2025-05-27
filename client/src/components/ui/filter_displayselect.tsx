import React from 'react'
import { Lang, SettingOther } from '@/providers/lib/typeData';
interface FilterDisplaySelectProps {
  data: string[] | SettingOther | undefined;
  name: string;
  updateDataSet: (name: string, value: string) => void
  setInput?: (value: string) => void;
  lang:string
}

export default function filter_displayselect(props:FilterDisplaySelectProps) {  
  return (
  <>
  
    {Array.isArray(props.data) ? 
    <div onMouseDown={(e) => e.preventDefault()} className='max-h-30 overflow-hidden rounded-lg border-1 border-gray-300
      overflow-y-auto
      [&::-webkit-scrollbar]:w-2
      [&::-webkit-scrollbar-track]:bg-gray-100
      [&::-webkit-scrollbar-thumb]:rounded-full
      [&::-webkit-scrollbar-thumb]:bg-gray-300
    '>
      {props.data.map((value:string,index:number) => <button className="text-left text-gray-800 w-full py-3 px-4 inline-flex items-center gap-x-2 text-sm font-normal  border-b-1 border-gray-300 bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none " onMouseDown={(e) => e.preventDefault()} onClick={() => {if (props.setInput) props.setInput('');props.updateDataSet(props.name,value);}}id={value} key={index}>{value}</button>)}
    </div>
    : <div onMouseDown={(e) => e.preventDefault()} className='max-h-30 overflow-hidden rounded-lg border-1 border-gray-300
    overflow-y-auto
    [&::-webkit-scrollbar]:w-2
    [&::-webkit-scrollbar-track]:bg-gray-100
    [&::-webkit-scrollbar-thumb]:rounded-full
    [&::-webkit-scrollbar-thumb]:bg-gray-300
  '>
    {Object.entries(props.data ?? {}).map(([index,value]) => <button className="text-left text-gray-800 w-full py-3 px-4 inline-flex items-center gap-x-2 text-sm font-normal  border-b-1 border-gray-300 bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none " onMouseDown={(e) => e.preventDefault()} onClick={() => {if (props.setInput) props.setInput('');props.updateDataSet(props.name,index);}}id={index} key={index}>{value[props.lang  as Lang]}</button>)}
  </div>}
  </>
    
  )
}
