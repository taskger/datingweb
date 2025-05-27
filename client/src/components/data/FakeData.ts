import { SettingChineseZodiac, SettingGender, SettingRole, Settings, SettingWorldEthnicities } from "@/providers/lib/typeData";

export const fakeLocations = [
  {'location': {'lat': 18.825, 'lng': 98.912}}, 
  {'location': {'lat': 18.893, 'lng': 99.089}}, 
  {'location': {'lat': 18.761, 'lng': 99.0}}, 
  {'location': {'lat': 18.748, 'lng': 99.011}}, 
  {'location': {'lat': 7.839, 'lng': 98.324}}, 
  {'location': {'lat': 7.856, 'lng': 98.398}}, 
  {'location': {'lat': 7.821, 'lng': 98.48}}, 
  {'location': {'lat': 7.976, 'lng': 98.335}}, 
  {'location': {'lat': 7.937, 'lng': 98.35}}, 
  {'location': {'lat': 7.814, 'lng': 98.403}}, 
  {'location': {'lat': 7.991, 'lng': 98.425}}, 
  {'location': {'lat': 7.868, 'lng': 98.332}}, 
  {'location': {'lat': 7.813, 'lng': 98.435}}, 
  {'location': {'lat': 7.802, 'lng': 98.436}}, 
  {'location': {'lat': 13.313, 'lng': 100.931}}, 
  {'location': {'lat': 13.332, 'lng': 100.916}}, 
  {'location': {'lat': 13.43, 'lng': 100.974}}, 
  {'location': {'lat': 13.311, 'lng': 100.884}}, 
  {'location': {'lat': 13.282, 'lng': 100.988}}, 
  {'location': {'lat': 13.334, 'lng': 100.971}}, 
  {'location': {'lat': 13.413, 'lng': 101.008}}, 
  {'location': {'lat': 13.35, 'lng': 101.013}}, 
  {'location': {'lat': 13.442, 'lng': 100.96}}, 
  {'location': {'lat': 13.446, 'lng': 100.951}},
   {'location': {'lat': 16.53, 'lng': 102.835}}, 
   {'location': {'lat': 16.394, 'lng': 102.863}}, {'location': {'lat': 16.507, 'lng': 102.779}}, {'location': {'lat': 16.431, 'lng': 102.734}}, {'location': {'lat': 16.534, 'lng': 102.883}}, {'location': {'lat': 16.455, 'lng': 102.836}}, {'location': {'lat': 16.493, 'lng': 102.816}}, {'location': {'lat': 16.444, 'lng': 102.889}}, {'location': {'lat': 16.35, 'lng': 102.88}}, {'location': {'lat': 16.387, 'lng': 102.847}}, {'location': {'lat': 14.317, 'lng': 100.56}}, {'location': {'lat': 14.287, 'lng': 100.546}}, {'location': {'lat': 14.347, 'lng': 100.605}}, {'location': {'lat': 14.286, 'lng': 100.601}}, {'location': {'lat': 14.316, 'lng': 100.555}}, {'location': {'lat': 14.293, 'lng': 100.584}}, {'location': {'lat': 14.401, 'lng': 100.605}}, {'location': {'lat': 14.293, 'lng': 100.612}}, {'location': {'lat': 14.271, 'lng': 100.559}}, {'location': {'lat': 14.309, 'lng': 100.502}}, {'location': {'lat': 14.921, 'lng': 102.169}}, {'location': {'lat': 15.023, 'lng': 102.13}}, {'location': {'lat': 15.075, 'lng': 102.108}}, {'location': {'lat': 14.999, 'lng': 102.146}}, {'location': {'lat': 15.052, 'lng': 102.157}}, {'location': {'lat': 14.958, 'lng': 102.037}}, {'location': {'lat': 14.912, 'lng': 102.184}}, {'location': {'lat': 14.989, 'lng': 102.092}}, {'location': {'lat': 14.917, 'lng': 102.078}}, {'location': {'lat': 15.041, 'lng': 102.003}}, {'location': {'lat': 13.904, 'lng': 100.514}}, {'location': {'lat': 13.857, 'lng': 100.574}}, {'location': {'lat': 13.957, 'lng': 100.438}}, {'location': {'lat': 13.941, 'lng': 100.592}}, {'location': {'lat': 13.898, 'lng': 100.524}}, {'location': {'lat': 13.826, 'lng': 100.575}}, {'location': {'lat': 13.792, 'lng': 100.483}}, {'location': {'lat': 13.775, 'lng': 100.502}}, {'location': {'lat': 13.79, 'lng': 100.617}}, {'location': {'lat': 13.856, 'lng': 100.534}}, {'location': {'lat': 13.606, 'lng': 100.733}}, {'location': {'lat': 13.672, 'lng': 100.733}}, {'location': {'lat': 13.619, 'lng': 100.6}}, {'location': {'lat': 13.506, 'lng': 100.544}}, {'location': {'lat': 13.621, 'lng': 100.623}}, {'location': {'lat': 13.51, 'lng': 100.711}}, {'location': {'lat': 13.599, 'lng': 100.547}}, {'location': {'lat': 13.669, 'lng': 100.669}}, {'location': {'lat': 13.552, 'lng': 100.652}}, {'location': {'lat': 13.49, 'lng': 100.728}}, {'location': {'lat': 14.12, 'lng': 100.532}}, {'location': {'lat': 14.011, 'lng': 100.446}}, {'location': {'lat': 13.95, 'lng': 100.435}}, {'location': {'lat': 13.999, 'lng': 100.462}}, {'location': {'lat': 14.144, 'lng': 100.521}}, {'location': {'lat': 14.102, 'lng': 100.433}}, {'location': {'lat': 14.032, 'lng': 100.43}}, {'location': {'lat': 14.026, 'lng': 100.563}}, {'location': {'lat': 14.091, 'lng': 100.562}}, {'location': {'lat': 14.08, 'lng': 100.442}}, {'location': {'lat': 12.666, 'lng': 101.118}}, {'location': {'lat': 12.69, 'lng': 101.225}}, {'location': {'lat': 12.697, 'lng': 101.072}}, {'location': {'lat': 12.716, 'lng': 101.146}}, {'location': {'lat': 12.747, 'lng': 101.097}}, {'location': {'lat': 12.75, 'lng': 101.111}}, {'location': {'lat': 12.583, 'lng': 101.121}}, {'location': {'lat': 12.592, 'lng': 101.159}}, {'location': {'lat': 12.619, 'lng': 101.038}}, {'location': {'lat': 12.605, 'lng': 101.121}}, {'location': {'lat': 8.157, 'lng': 99.022}}, {'location': {'lat': 8.249, 'lng': 99.051}}, {'location': {'lat': 8.19, 'lng': 98.981}}, {'location': {'lat': 8.196, 'lng': 98.922}}, {'location': {'lat': 8.104, 'lng': 98.952}}, {'location': {'lat': 8.184, 'lng': 99.1}}, {'location': {'lat': 8.065, 'lng': 99.097}}, {'location': {'lat': 8.213, 'lng': 98.988}}, {'location': {'lat': 8.186, 'lng': 99.083}}, {'location': {'lat': 8.218, 'lng': 99.08}}, {'location': {'lat': 9.10, 'lng': 99.217}}, {'location': {'lat': 9.082, 'lng': 99.394}}, {'location': {'lat': 8.971, 'lng': 99.324}}, {'location': {'lat': 9.09, 'lng': 99.397}}, {'location': {'lat': 9.002, 'lng': 99.369}}, {'location': {'lat': 9.001, 'lng': 99.278}}, {'location': {'lat': 9.03, 'lng': 99.24}}, {'location': {'lat': 8.99, 'lng': 99.239}}, {'location': {'lat': 9.013, 'lng': 99.341}}, {'location': {'lat': 8.992, 'lng': 99.379}}, {'location': {'lat': 7.121, 'lng': 100.548}}, {'location': {'lat': 7.177, 'lng': 100.632}}, {'location': {'lat': 7.129, 'lng': 100.528}}, {'location': {'lat': 7.126, 'lng': 100.683}}, {'location': {'lat': 7.156, 'lng': 100.513}}, {'location': {'lat': 7.3, 'lng': 100.568}}, {'location': {'lat': 7.12, 'lng': 100.63}}, {'location': {'lat': 7.173, 'lng': 100.658}}, {'location': {'lat': 7.208, 'lng': 100.685}}, {'location': {'lat': 7.211, 'lng': 100.676}}, {'location': {'lat': 15.282, 'lng': 104.835}}, {'location': {'lat': 15.289, 'lng': 104.886}}, {'location': {'lat': 15.168, 'lng': 104.833}}, {'location': {'lat': 15.32, 'lng': 104.791}}, {'location': {'lat': 15.174, 'lng': 104.917}}, {'location': {'lat': 15.268, 'lng': 104.809}}, {'location': {'lat': 15.309, 'lng': 104.86}}, {'location': {'lat': 15.227, 'lng': 104.783}}, {'location': {'lat': 15.214, 'lng': 104.772}}, {'location': {'lat': 15.159, 'lng': 104.885}}, {'location': {'lat': 19.85, 'lng': 99.897}}, {'location': {'lat': 19.877, 'lng': 99.866}}, {'location': {'lat': 19.841, 'lng': 99.921}}, {'location': {'lat': 19.817, 'lng': 99.731}}, {'location': {'lat': 19.883, 'lng': 99.768}}, {'location': {'lat': 19.886, 'lng': 99.794}}, {'location': {'lat': 19.963, 'lng': 99.818}}, {'location': {'lat': 19.955, 'lng': 99.874}}, {'location': {'lat': 19.936, 'lng': 99.863}}, {'location': {'lat': 19.973, 'lng': 99.82}}, {'location': {'lat': 18.212, 'lng': 99.566}}, {'location': {'lat': 18.282, 'lng': 99.455}}, {'location': {'lat': 18.366, 'lng': 99.491}}, {'location': {'lat': 18.2, 'lng': 99.497}}, {'location': {'lat': 18.274, 'lng': 99.465}}, {'location': {'lat': 18.341, 'lng': 99.511}}, {'location': {'lat': 18.353, 'lng': 99.513}}, {'location': {'lat': 18.238, 'lng': 99.426}}, {'location': {'lat': 18.317, 'lng': 99.551}}, {'location': {'lat': 18.242, 'lng': 99.589}}, {'location': {'lat': 13.902, 'lng': 99.471}}, {'location': {'lat': 14.093, 'lng': 99.562}}, {'location': {'lat': 14.073, 'lng': 99.519}}, {'location': {'lat': 14.006, 'lng': 99.547}}, {'location': {'lat': 13.956, 'lng': 99.561}}, {'location': {'lat': 14.035, 'lng': 99.572}}, {'location': {'lat': 13.978, 'lng': 99.429}}, {'location': {'lat': 13.981, 'lng': 99.473}}, {'location': {'lat': 13.95, 'lng': 99.513}}, {'location': {'lat': 14.064, 'lng': 99.518}}, {'location': {'lat': 13.099, 'lng': 99.973}}, {'location': {'lat': 13.013, 'lng': 99.872}}, {'location': {'lat': 13.181, 'lng': 100.038}}, {'location': {'lat': 13.192, 'lng': 99.973}}, {'location': {'lat': 13.102, 'lng': 99.984}}, {'location': {'lat': 13.133, 'lng': 99.905}}, {'location': {'lat': 13.182, 'lng': 99.871}}, {'location': {'lat': 13.132, 'lng': 99.992}}, {'location': {'lat': 13.063, 'lng': 99.887}}, {'location': {'lat': 13.11, 'lng': 99.939}}];

export const dataMyself = {
  email:'chayanon.poolwas@gmail.com',
  role:'user',
  profile : {
    name:'Mos',
    birthday:'2002-03-03',
    age:18,
    salary:0,
    status:'prefer_not_to_say',
    gender:'female',
    ethnicity:'asia',
    height:180,
    religion:'buddhist',
    chinese_zodiac:'rabbit',
    western_zodiac:'aquarius',
    group:'b',
    degree:'bachelors',
    university:'Kasetsart University',
    lifestyle:{
      pet:true,
      exercise:true,
      book:false,
      game:false,
      healthy:true,
      alcohol:true,
      smoke:false,
      weed:false
    },
    hobbys:{
      adventure:[
        'dive',
        'mountain climbing'
      ],
      song:[
        'rock',
        'indy',
        'jazz'
      ],
      sport:[],
      movie:[],
      content:[],
      travel:[],
      game:[],
      selfcare:[]
    },
    contact:{
      facebook:'',
      ig:'',
      telephone:''
    },
    like:[],
    location: {
      'lat': 13.793,
      'lng': 100.548
    }
  }
} 
export const settings : Settings = {
  name: { en: 'Name', th: 'ชื่อ' },
  gender: { en: 'Gender', th: 'เพศ' },
  age: { en: 'Age', th: 'อายุ' },
  status: { en: 'Status', th: 'สถานะ' },
  salary: { en: 'Salary', th: 'เงินเดือน' },
  select: { en: 'Select', th: 'จำนวนตัวกรอง' },
  found_filter_people: { en: 'People found', th: 'จำนวนคนที่พบ' },
  height: { en: 'Height', th: 'ความสูง' },
  ethnicity: { en: 'Ethnicity', th: 'เชื้อชาติ' },
  religion: { en: 'Religion', th: 'ศาสนา' },
  western_zodiac: { en: 'Zodiac Sign', th: 'ราศี' },
  chinese_zodiac: { en: 'Chinese Zodiac', th: 'ปีนักษัตร' },
  group_blood: { en: 'Blood', th: 'เลือด' },
  degree: { en: 'Education', th: 'การศึกษา' },
  university: { en: 'University', th: 'มหาวิทยาลัย' },
  hobby: { en: 'Hobby', th: 'งานอดิเรก' },
  adventure: { en: 'Adventure', th: 'ผจญภัย' },
  song: { en: 'Music', th: 'ร้องเพลง' }, 
  content: { en: 'Content Creation', th: 'สร้างคอนเทนต์' },
  game: { en: 'Games', th: 'เกม' }, 
  movie: { en: 'Movies', th: 'หนัง' }, 
  selfcare: { en: 'Self-care', th: 'ดูแลตัวเอง' }, 
  sport: { en: 'Sports', th: 'กีฬา' }, 
  travel: { en: 'Travel', th: 'ท่องเที่ยว' },
  lifestyle: { en: 'Lifestyle', th: 'ไลฟ์สไตล์' },
  filter_use: { en: 'Filter Use', th: 'ตัวกรองที่เปิดใช้' },
  filter: { en: 'Filter', th: 'ตัวกรอง' },
  reset_filter: { en: 'Reset Filter', th: 'ล้างตัวกรอง' },
  language: { en: 'English', th: 'ภาษาไทย' },
  select_user: { en: 'Select User', th: 'เลือกผู้ใช้' },
  role: { en: 'Role', th: 'ตำแหน่ง' },
  birthday: { en: 'Birth Day',th: 'วันเกิด'},
  submit_button: { en: 'Submit',th: 'ยืนยันข้อมูล'},
  reset_button: { en: 'Reset',th: 'ล้างข้อมูล'},
  permisson_update: { en: "You don't have permission to edit.",th: 'คุณไม่มีสิทธิ์แก้ไขข้อมูล'},
  success_update: { en: 'Update Success!',th: 'อัพเดทข้อมูลเสร็จสิ้น'},
  update_fail: { en: 'Update Fail!',th: 'อัพเดทข้อมูลไม่สำเร็จ'},
  error: { en: 'Error!',th: 'เกิดข้อผิดพลาด'},
  success_but: { en: 'Warning: Something might be incorrect.',th: 'อาจมีบ้างอย่างผิดพลาด'},
  empty_form_edit: { en: 'Please complete all required fields: Name and Birth Date.',th: 'กรุณากรอกข้อมูลสำคัญให้ครบ ชื่อ วันเกิด'},
  empty_form_create: { en: 'Please complete all required fields: Email, Role, Address, Name, Gendedr, and Birth Date.',th: 'กรุณากรอกข้อมูลสำคัญให้ครบ อีเมล์ ตำแหน่ง ที่อยู่ ชื่อ วันเกิด เพศ'},
  edit: { en: 'Edit',th: 'แก้ไข'},
  create: { en: 'Create',th: 'สร้าง'},
  delete: { en: 'Delete',th: 'ลบ'},
  success_delete: { en: 'Delete Success!',th: 'ลบข้อมูลเสร็จสิ้น'},
  permission_delete: { en: "You Don't have Permission Delete !",th: 'คุณไม่มีสิทธิ์ลบข้อมูล'},
  text_confirm_delete: { en: `Are you sure you want to delete `,th: 'คุณยืนยันจะลบข้อมูล'},
  submit_delete: { en: "Yes, I'm sure",th: 'ยืนยัน'},
  cancel: { en: "No, cancel!",th: 'ยกเลิก'},
  admin_cant_delete_self: { en: "Admin cannot delete themselves.",th: 'แอดมินไม่สามารถลบตัวเองได้'},
  email: {en: "Email" , th: "อีเมล์"},
  location: {en: "Location" , th: "ที่อยู่"},
  facebook: {en: "Facebook" , th: "เฟสบุ๊ค"},
  instragram: {en: "Instagram" , th: "อินสตาแกรม"},
  telephone: {en: "Telephone" , th: "เบอร์โทร"},
  age_more_eighteen: {en: "You must be at least 18 years old.", th: "คุณต้องมีอายุอย่างน้อย 18 ปี" },
  kilometers: {en: "Km.", th: "กิโลเมตร" },
  permission_create: { en: "You Don't have Permission Create !",th: 'คุณไม่มีสิทธิ์สร้างข้อมูล'},
  create_email_have: {en: "This email already exists in the system.", th: "มีอีเมล์นี้อยู่ในระบบแล้ว" },
  location_current: {en: "Current Location", th: "ที่อยู่ปัจจุบัน" },  
  location_in_system: {en: "Location In System", th: "ที่อยู่ในระบบ" },
  laglngempty: {
en: "Please complete Location with search or use current location and select",
    th: "กรุณาหาที่อยู่ด้วยการกดค้นหาหรือใช้ตำแหน่งปัจจุบัน"
  },
  success_create: { en: 'Create Success!',th: 'สร้างข้อมูลใหม่เสร็จสิ้น'},

  
};


export const hobbys = {
  adventure: {
    dive: { en: 'Diving', th: 'ดำน้ำ' },
    mountain_climbing: { en: 'Mountain Climbing', th: 'ปีนเขา' },
    camping: { en: 'Camping', th: 'แคมป์ปิ้ง' },
    trekking: { en: 'Trekking', th: 'เดินป่า' },
    bungee_jump: { en: 'Bungee Jump', th: 'บันจี้จัมพ์' },
    skydiving: { en: 'Skydiving', th: 'กระโดดร่ม' },
    zipline: { en: 'Zipline', th: 'โหนสลิง' },
    kayaking: { en: 'Kayaking', th: 'พายเรือคายัค' }
  },
  song: {
    rock: { en: 'Rock', th: 'ร็อค' },
    indy: { en: 'Indie', th: 'อินดี้' },
    jazz: { en: 'Jazz', th: 'แจ๊ส' },
    rap: { en: 'Rap', th: 'แร็ป' },
    pop: { en: 'Pop', th: 'ป๊อป' },
    edm: { en: 'EDM', th: 'อีดีเอ็ม' },
    classical: { en: 'Classical', th: 'คลาสสิก' }
  },
  sport: {
    football: { en: 'Football', th: 'ฟุตบอล' },
    basketball: { en: 'Basketball', th: 'บาสเกตบอล' },
    yoga: { en: 'Yoga', th: 'โยคะ' },
    gym: { en: 'Gym', th: 'ฟิตเนส' },
    running: { en: 'Running', th: 'วิ่ง' },
    cycling: { en: 'Cycling', th: 'ปั่นจักรยาน' },
    badminton: { en: 'Badminton', th: 'แบดมินตัน' },
    swimming: { en: 'Swimming', th: 'ว่ายน้ำ' },
    boxing: { en: 'Boxing', th: 'มวย' }
  },
  movie: {
    action: { en: 'Action', th: 'แอคชั่น' },
    romance: { en: 'Romance', th: 'โรแมนติก' },
    horror: { en: 'Horror', th: 'สยองขวัญ' },
    scifi: { en: 'Sci-fi', th: 'ไซไฟ' },
    animation: { en: 'Animation', th: 'แอนิเมชัน' },
    documentary: { en: 'Documentary', th: 'สารคดี' },
    comedy: { en: 'Comedy', th: 'ตลก' },
    drama: { en: 'Drama', th: 'ดราม่า' },
    fantasy: { en: 'Fantasy', th: 'แฟนตาซี' }
  },
  content: {
    youtuber: { en: 'YouTuber', th: 'ทำ YouTube' },
    tiktoker: { en: 'TikToker', th: 'ทำ TikTok' },
    podcast: { en: 'Podcasting', th: 'ทำพอดแคสต์' },
    bloger: { en: 'Blogging', th: 'สร้างบล็อก' },
    streaming: { en: 'Streaming', th: 'สตรีมมิ่ง' },
    vlogging: { en: 'Vlogging', th: 'ทำ vlog' },
    review: { en: 'Product Reviews', th: 'รีวิวสินค้า' },
    shortvideo: { en: 'Short Videos', th: 'คลิปสั้น' }
  },
  travel: {
    beach: { en: 'Beach Trips', th: 'เที่ยวทะเล' },
    mountain: { en: 'Mountain Trips', th: 'เที่ยวเขา' },
    cafe_hopping: { en: 'Cafe Hopping', th: 'คาเฟ่ฮอปปิ้ง' },
    road_trip: { en: 'Road Trip', th: 'โร้ดทริป' },
    abroad: { en: 'Travel Abroad', th: 'เที่ยวต่างประเทศ' },
    backpack: { en: 'Backpacking', th: 'แบกเป้เที่ยว' },
    local: { en: 'Local Travel', th: 'เที่ยวในประเทศ' },
    culture_trip: { en: 'Cultural Trips', th: 'เที่ยวเชิงวัฒนธรรม' }
  },
  game: {
    console: { en: 'Console Games', th: 'เกมคอนโซล' },
    pc: { en: 'PC Games', th: 'เกมพีซี' },
    mobile: { en: 'Mobile Games', th: 'เกมมือถือ' },
    boardgame: { en: 'Board Games', th: 'บอร์ดเกม' },
    moba: { en: 'MOBA Games', th: 'เกม MOBA' },
    rpg: { en: 'RPG Games', th: 'เกม RPG' },
    fps: { en: 'FPS Games', th: 'เกมยิงปืน (FPS)' },
    simulation: { en: 'Simulation Games', th: 'เกมจำลองสถานการณ์' }
  },
  selfcare: {
    meditation: { en: 'Meditation', th: 'นั่งสมาธิ' },
    skincare: { en: 'Skincare', th: 'ดูแลผิวหน้า' },
    spa: { en: 'Spa', th: 'เข้าสปา' },
    reading: { en: 'Reading', th: 'อ่านหนังสือ' },
    journaling: { en: 'Journaling', th: 'เขียนไดอารี่' },
    gardening: { en: 'Gardening', th: 'ปลูกต้นไม้' },
    cooking: { en: 'Cooking', th: 'ทำอาหาร' },
    sleep: { en: 'Sleep', th: 'นอนพักผ่อน' }
  }
};
 
 export const questionLifestyle = [
  {
    key: "pet",
    question: "เลี้ยงสัตว์หรือไม่"
  },
  {
    key: "exercise",
    question: "ออกกำลังกายหรือไม่"
  },
  {
    key: "book",
    question: "อ่านหนังสือหรือไม่"
  },
  {
    key: "game",
    question: "เล่นเกมหรือไม่"
  },
  {
    key: "healthy",
    question: "กินอาหารสุขภาพหรือไม่"
  },
  {
    key: "alcohol",
    question: "ดื่มแอลกอฮอล์หรือไม่"
  },
  {
    key: "smoke",
    question: "สูบบุหรี่หรือไม่"
  },
  {
    key: "weed",
    question: "สูบกัญชาหรือไม่"
  },
];

export const group_blood = ['A','B','AB','O']
export const role : SettingRole = {
  admin: { en: "Admin", th: "ผู้ดูแลระบบ" },
  user: { en: "User", th: "ผู้ใช้งาน" },
}
export const gender:SettingGender = {
  female: {en:'Female',th:'หญิง'},
  male: {en:'Male',th:'ชาย'}
}
export const degree = {
  middle_school: { en: "Middle School", th: "มัธยมศึกษาตอนต้น" },
  high_school: { en: "High School", th: "มัธยมศึกษาตอนปลาย" },
  vocational: { en: "Vocational", th: "ปวช" },
  high_vocational: { en: "High Vocational", th: "ปวส" },
  diploma: { en: "Diploma", th: "อนุปริญญา" },
  bachelors: { en: "Bachelors", th: "ปริญญาตรี" },
  masters: { en: "Masters", th: "ปริญญาโท" },
  doctorate: { en: "Doctorate", th: "ปริญญาเอก" }
}


export const chinese_zodiac: SettingChineseZodiac = {
  rat: { en: "Rat", th: "ชวด" },
  ox: { en: "Ox", th: "ฉลู" },
  tiger: { en: "Tiger", th: "ขาล" },
  rabbit: { en: "Rabbit", th: "เถาะ" },
  dragon: { en: "Dragon", th: "มะโรง" },
  snake: { en: "Snake", th: "มะเส็ง" },
  horse: { en: "Horse", th: "มะเมีย" },
  goat: { en: "Goat", th: "มะแม" },
  monkey: { en: "Monkey", th: "วอก" },
  rooster: { en: "Rooster", th: "ระกา" },
  dog: { en: "Dog", th: "จอ" },
  pig: { en: "Pig", th: "กุน" }
}
export const western_zodiac = {
  aries: { en: "Aries", th: "เมษ" },
  taurus: { en: "Taurus", th: "พฤษภ" },
  gemini: { en: "Gemini", th: "เมถุน" },
  cancer: { en: "Cancer", th: "กรกฏ" },
  leo: { en: "Leo", th: "สิงห์" },
  virgo: { en: "Virgo", th: "กันย์" },
  libra: { en: "Libra", th: "ตุลย์" },
  scorpio: { en: "Scorpio", th: "พิจิก" },
  sagittarius: { en: "Sagittarius", th: "ธนู" },
  capricorn: { en: "Capricorn", th: "มังกร" },
  aquarius: { en: "Aquarius", th: "กุมภ์" },
  pisces: { en: "Pisces", th: "มีน" }
}
export const status = {
  single: { en: "Single", th: "โสด" },
  separated: { en: "Separated", th: "แยกกันอยู่" },
  divorced: { en: "Divorced", th: "หย่าร้างแล้ว" },
  widowed: { en: "Widowed", th: "หม้าย" },
  open_relationship: { en: "Open Relationship", th: "ความสัมพันธ์แบบเปิด" },
  prefer_not_to_say: { en: "Prefer Not To Say", th: "ไม่ต้องการระบุ" },
}
export const worldEthnicities:SettingWorldEthnicities = {
  asian: { en: "Asian", th: "เอเชีย" },
  east_asian: { en: "East Asian", th: "เอเชียตะวันออก" },
  southeast_asian: { en: "Southeast Asian", th: "เอเชียตะวันออกเฉียงใต้" },
  south_asian: { en: "South Asian", th: "เอเชียใต้" },
  central_asian: { en: "Central Asian", th: "เอเชียกลาง" },
  middle_eastern: { en: "Middle Eastern", th: "ตะวันออกกลาง" },
  european: { en: "European", th: "ยุโรป" },
  african: { en: "African", th: "แอฟริกัน" },
  americas: { en: "Americas", th: "อเมริกาเหนือ" },
  latino: { en: "Latino", th: "ละตินอเมริกัน" }
};
export const worldReligions = {
  buddhism: { en: "Buddhism", th: "พุทธ" },
  christianity: { en: "Christianity", th: "คริสต์" },
  islam: { en: "Islam", th: "อิสลาม" },
  hinduism: { en: "Hinduism", th: "ฮินดู" },
  sikhism: { en: "Sikhism", th: "ซิกข์" },
  judaism: { en: "Judaism", th: "ยิว" },
  taoism: { en: "Taoism", th: "เต๋า" },
  confucianism: { en: "Confucianism", th: "ขงจื๊อ" },
  jainism: { en: "Jainism", th: "เชน" },
  non_religious: { en: "Non Religious", th: "ไม่มีศาสนา / ไม่ระบุ" }
};