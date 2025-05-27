
import React from 'react'
interface Button_dropdown_Props {
    idtoggle?: string;
    titlebutton?: string;
    titlemenu_url?: [string, string][];
    icon?: string;
    idmodal?: string;
  }
  const Button_dropdown: React.FC<Button_dropdown_Props> = ({
    idtoggle = "",
    titlebutton = "Title test",
    titlemenu_url = [],
    icon = '',
    idmodal
  }: Button_dropdown_Props) => {
    
  return (
    
    <div >
        <a  className="titlebutton border-t-1 border-b-1 border-zinc-300 hover:cursor-pointer hover:animate-pulse border-solid h-15 w-auto  flex items-center p-2 text-gray-900  
             hover:bg-gray-300  group" 
            data-collapse-toggle={idtoggle}
            >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d={`${icon}`}  />
            </svg>
            <span className="flex-1 ms-3 ">{titlebutton}</span>
            <svg className="chevron w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
            </svg>
        </a>
        
        <ul id={idtoggle} className='hidden '>
            {titlemenu_url.length > 0 ?(
                titlemenu_url.map(([label ,url],index :number) => (
                    <li key={index}><a 
                            href={`${url}`} 
                            {...(label == 'ตั้งค่า' ? { 'data-modal-target': idmodal } : {})}
                            {...(label == 'ตั้งค่า' ? { 'data-modal-toggle': idmodal } : {})}
                            data-drawer-hide="sidebar"
                            className="border-t-1 border-b-1 border-zinc-400 border-solid w-full flex items-center p-1 bg-zinc-300 text-black  hover:bg-zinc-400  group"
                            ><span className="flex-1 ms-3 ">{label}</span></a>
                    </li>
                    
                ))
            ):null}
        </ul>
</div>
  )
}

export default Button_dropdown