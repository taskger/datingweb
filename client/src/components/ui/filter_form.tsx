import React from 'react'

interface FilterFormProps {
  id: string;
  name: string;
  value: string[] | number | string;
  onChange?: (value: string) => void;
  onFocus?: (focus: boolean) => void;
  onBlur?: (focus: boolean) => void;
  readonly?: boolean;
  class?: string;
}

export default function filter_form(props:FilterFormProps) {
  return (
    <>
      {props.onFocus && props.onBlur ?
        <div className='relative'>
            <input readOnly={props.readonly} autoComplete='off' value={props?.value} type="text" id={`filter_form_${props?.id}`} onFocus={() => props.onFocus?.(true)} onBlur={() => props.onBlur?.(false)}  onChange={(e) => props.onChange?.(e.target.value)} className={`${props?.class} block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-blue-600 peer`} placeholder="" />
            <label htmlFor={`filter_form_${props?.id}`} className={`${props?.class} absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1`}>{props.name}</label>
        </div>
        : <div className='relative'>
              <input readOnly={props.readonly} autoComplete='off' value={props?.value}  type="text" id={`filter_form_${props?.id}`} className={`${props?.class} block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-blue-600 peer`} placeholder="" />
              <label htmlFor={`filter_form_${props?.id}`} className={`${props?.class} absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1`}>{props.name}</label>
          </div>
      }
    </>
  )
}
