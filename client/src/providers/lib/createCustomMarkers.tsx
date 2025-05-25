import "./CustomTextPopup.css"
import { Profile} from "./typeData";
export const createCustomMarker = () => {
  if (typeof window === 'undefined') return null;
  const img = document.createElement('div');
  img.innerHTML = `
  <div class="iconcurrent">
      <div class="iconcurrentshadow">
      </div>
  </div>
  `
  return img;
};
export const CustomMarker = (gender?: Profile['gender']) => {
  if (typeof window === 'undefined' || !gender) return null;
  const img = document.createElement('div');
  if (gender == 'female'){
    img.innerHTML = `
    <div class="iconfemale">
        <div class="iconfemaleshadow">
        </div>
    </div>
    `
  }else if(gender == 'male'){
    img.innerHTML = `
    <div class="iconmale">
        <div class="iconmaleshadow">
        </div>
    </div>
    `
  }else{
    img.innerHTML = `
    <div class="iconother">
        <img src="lgbt-circle.png" alt="image-lgbtq" width="16" height="16">
        <div class="iconothershadow">
        </div>
    </div>
    `
  }
  
  return img;
};