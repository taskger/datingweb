import { alovaInstance } from "@/components/data/alova";
import "./CustomTextPopup.css"
import {TranslateToThai} from "./TranslateToThai";
import {typeData, CategoryNameHobby, Lang} from "@/providers/lib/typeData"
import { settings } from "@/components/data/FakeData";
export const PopupUser = (data:typeData,lang:Lang,id:string) => {
  const popup = document.createElement('div');
  const display = TranslateToThai(data,lang)
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

  const mapDataLifestyle = [
    { name: 'pet', image: 'pet-icon.png', text: { en: 'Pet Lover', th: 'เลี้ยงสัตว์' } },
    { name: 'exercise', image: 'exercise-icon.png', text: { en: 'Exercise', th: 'ออกกำลังกาย' } },
    { name: 'book', image: 'book-icon.png', text: { en: 'Reading', th: 'อ่านหนังสือ' } },
    { name: 'game', image: 'gamelifestyle-icon.png', text: { en: 'Gaming', th: 'เล่นเกม' } },
    { name: 'healthy', image: 'healthy-icon.png', text: { en: 'Healthy Eating', th: 'กินอาหารสุขภาพ' } },
    { name: 'alcohol', image: 'cocktail.png', text: { en: 'Alcohol', th: 'ดื่มแอลกอฮอล์' } },
    { name: 'smoke', image: 'smoke-icon.png', text: { en: 'Smoking', th: 'สูบบุหรี่' } },
    { name: 'weed', image: 'weed-icon.png', text: { en: 'Cannabis', th: 'สูบกัญชา' } },
  ];
  
  if (display) {
    popup.innerHTML = `
      <div class="bg">
        <div>
          <div class="scopeProfile">
            <img class="profile" referrerpolicy="no-referrer" src="${data.image || 'user.png'}"/>
          </div>
          <div class="description">
            <span class="texthead">${settings.name[lang]} 
              <span class="textinfo"> 
                ${display.name} 
              </span>
            </span>
            <span class="texthead">${settings.age[lang]} 
              <span class="textinfo"> 
                ${display.age}
              </span>
            </span>
            ${display.height != 0 ? 
            `<span class="texthead">${settings.height[lang]} <span class="textinfo">${display.height}</span></span>`: ''}
            
            <span class="texthead">${settings.status[lang]} <span class="textinfo"> ${display.status}</span></span>
            <span class="texthead">${settings.gender[lang]} <span class="textinfo">${display.gender}</span></span>
            ${display.ethnicity ? 
            `<span class="texthead">${settings.ethnicity[lang]} <span class="textinfo">${display.ethnicity}</span></span>`
            :''}
            ${display.religion ? 
            `<span class="texthead">${settings.religion[lang]} <span class="textinfo">${display.religion}</span></span>`
          : ''}
            ${display.chinese_zodiac ?
            `<span class="texthead">${settings.chinese_zodiac[lang]} <span class="textinfo">${display.chinese_zodiac}</span></span>`: ''}
            ${display.western_zodiac ?
            `<span class="texthead">${settings.western_zodiac[lang]} <span class="textinfo">${display.western_zodiac}</span></span>` : ''}
            ${display.group ? 
            `<span class="texthead">${settings.group_blood[lang]} <span class="textinfo">${display.group}</span></span>`: ''}
            ${display.degree ? 
            `<span class="texthead">${settings.degree[lang]} <span class="textinfo">${display.degree}</span></span>` : ''}
            ${display.university && (data.profile?.degree != 'high_school' && data.profile?.degree != 'middle_school') ? 
            `<span class="texthead">${settings.university[lang]} <span class="textinfo">${display.university}</span></span>` : ''}
            ${display.salary ?
              `<span class="texthead">${settings.salary[lang]} <span class="textinfo">${display.salary}</span></span>` : ''}
          </div>
        </div>
        ${Object.entries(data.profile?.lifestyle ?? {}).filter(([,value])=> value).length != 0 ? 
        `<div>
          <div>
            <span class="head">${settings.lifestyle[lang]}</span>
          </div>
          <div>
          ${Object.entries(data.profile?.lifestyle ?? {}).filter(([,value])=> value).map(([key]) => {
            const data = mapDataLifestyle.find(valuefind => valuefind.name == key)
            console.log(data)
            return(
              `<span class="lifestyle ${data?.name}">
                <img class="imagelifestyle" src="${data?.image}" width="20" height="20">${data?.text?.[lang]}
              </span>`
            )
          }).join('')}
          </div>
        </div>`: ''}
 
        ${Object.values(display.hobbys ?? {}).filter(value => { 
          if(value.length > 0) return value
        }).length != 0 ? 
        `<div>
          <div>
            <span class="head">${settings.hobby[lang]}</span>
          </div>
          <div>
            ${mapData.map((value) => 
                display.hobbys?.[value.name as CategoryNameHobby]?.map((valuehobby:string) => {
                  if(valuehobby) return (`
                    <span class="hobbys">
                      <img src="${value.image}" alt="image ${valuehobby}" width="25" height="25">
                      ${valuehobby}
                    </span>`
                  )
              }).join('')
            ).join('')} 
          </div>
        </div>`: ''}
          <div class='divheart'>
            <button id="button-heart" class='${data.profile?.gender == 'female' ? 'heartsend' : 'heartsendmale'}'>
              <span>
                <img src="white-heart-icon.png" width="25" height="25" alt="heartsend"  class="heart-icon" />
              </span>
              <span class='number-heart'>${data.profile?.like?.length}</span>
          </button> 
          </div>
        <div>
          ${data.profile?.contact?.facebook ? 
          `
          <div>
            <span class="texthead">
              <img src="https://cdn.pixabay.com/photo/2021/06/15/12/51/facebook-6338508_1280.png" width="25" height="20" alt="heartsend"/>
              ${data.profile.contact.facebook} 
            </span>
          </div>` : ''}
          ${data.profile?.contact?.ig ? 
          `<div>
               <span class="texthead">
                <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" width="25" height="20" alt="heartsend"/>
                <a href="https://instagram.com/${data.profile.contact.ig} ">${data.profile.contact.ig} </a> 
              </span>
          </div>` : ''}
          ${data.profile?.contact?.telephone ? 
          `<div>
              <span class="texthead">
                <img src="https://images.vexels.com/media/users/3/205069/isolated/preview/f207045d96c258fed664305f0ac2c5bd-telephone-handset-blue-icon.png?w=360" width="25" height="20" alt="heartsend"/>
                <a href="tel:${data.profile.contact.telephone}">${data.profile.contact.telephone} </a>
              </span>
          </div>` : ''}
          <div>
          </div>
        </div>
      </div>
      `
 
      const buttonHeart = popup.querySelector('#button-heart') as HTMLButtonElement | null;      
      buttonHeart?.addEventListener("click", async () => {
        console.log(id)
        try {
          const response :Response = await alovaInstance.Put(`/heart/${data._id}`,{
            id:id
          }) ;
          const numberHeart = popup.querySelector('.number-heart') as HTMLButtonElement | null;
          if(!numberHeart) return
          const currentLikes = Number(numberHeart.innerText);
          if (response.status === 200) {
            numberHeart.innerText = String(currentLikes + 1);
          } else if (response.status === 409) {
            numberHeart.innerText = String(currentLikes - 1);
          } else {
          }
      
        } catch (error) {
          console.error('🔥 Error:', error);
        }
      });
      
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


