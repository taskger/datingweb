import "./CustomTextPopup.css"
import {TranslateToThai} from "./TranslateToThai";
import {typeData, CategoryNameHobby} from "@/providers/lib/typeData"

export const PopupUser = (data:typeData) => {
  const popup = document.createElement('div');
  const display = TranslateToThai(data)
  const mapData = [
    {name:'adventure' , image:'adventure-icon.png'},
    {name:'song' , image:'music-icon.png'},
    {name:'content' , image:'content-icon2.png'},
    {name:'game' , image:'game-icon.png'},
    {name:'movie' , image:'movie-icon.png'},
    {name:'selfcare' , image:'self-love.png'},
    {name:'sport' , image:'sport-icon.png'},
    {name:'travel' , image:'travel-icon.png'},
  ]
  if (display) {
    popup.innerHTML = `
      <div class="bg">
        <div class="scopeProfile">
          <img class="profile" src="https://i0.wp.com/whateverbrightthings.com/wp-content/uploads/2020/05/Dot-Icon-Orange.png?ssl=1"/>
          <div>
            <span class="texthead">ชื่อ ${display.name}</span>
            <span class="texthead">อายุ ${display.age}</span>
            <span class="texthead">สถานะ ${display.status}</span>
            <span class="texthead">เพศ ${display.gender}</span>
            <span class="texthead">เชื้อชาติ ${display.ethnicity}</span>
            <span class="texthead">ศาสนา ${display.religion}</span>
            ${display.chinese_zodiac ?
            `<span class="texthead">นักษัตร ${display.chinese_zodiac}</span>`: ''}
            ${display.western_zodiac ?
            `<span class="texthead">ราศี ${display.western_zodiac}</span>` : ''}
            ${display.group ? 
            `<span class="texthead">กรุ๊ปเลือด ${display.group}</span>`: ''}
            <div>
              ${display.degree ? 
              `<span class="texthead">การศึกษา ${display.degree}</span>` : ''}
              ${display.university ? 
              `<span class="texthead">มหาวิทยาลัย ${display.university}</span>` : ''}
            </div>
          </div>
        </div>
        
        <div>
          <div>
            <span class="head">ไลฟ์สไตล์</span>
          </div>
          <div>
          </div>
        </div>
        <div>
          <div>
            <span class="head">งานอดิเรก</span>
          </div>
          <div>
            ${mapData.map((value) => 
                display.hobbys?.[value.name as CategoryNameHobby]?.map((valuehobby:string) => (`
                  <span class="hobbys">
                    <img src="${value.image}" alt="image ${valuehobby}" width="25" height="25">
                    ${valuehobby}
                  </span>`
                )).join('')
            )} 
          </div>
        </div>
      </div>
      `
    }
  return popup
}
export const PopupMySelfCurrent = (data:typeData) => {
  const popup = document.createElement('div');
  popup.innerHTML = `
    ที่อยู่ปัจจุบัน

    ละติจูด ${data.profile?.location.lat} ลองติจูด ${data.profile?.location.lng}
  `
  return popup
}


export const CustomTextPopup = (html : string) => {
  const popup = document.createElement('div');
  popup.innerHTML = `${html}`
  return popup
}


