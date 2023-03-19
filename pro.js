let latitude = 0 ;
let longitude = 0 ;
let buttonLoading = document.getElementsByClassName('button_loading')[0];
let loading_p = document.getElementsByClassName('loading_p')[0];
let loading = document.getElementsByClassName('loading')[0];
let container =document.getElementsByClassName('container')[0];
let showError =document.getElementsByClassName('show_error')[0];
let hour = new Date();
let dateNow = hour;
hour=hour.getHours();
let dateNowOnSite = document.getElementsByClassName('time')[0];
let city = document.getElementsByClassName('city')[0]
let uv = document.getElementsByClassName('uv')[0];
let wind = document.getElementsByClassName('wind')[0];
let hr = document.getElementsByClassName('HR')[0];
let rain =document.getElementsByClassName('rains')[0];
let tempH = document.getElementsByClassName('temp_now')[0];
let timeD =document.getElementsByClassName('time_d');
let dayTemp =document.getElementsByClassName('temp_d');
let realTemp = document.getElementsByClassName('real_temp');
let date = document.getElementsByClassName('date');
let ultraV = document.getElementsByClassName('ultra_v');
let maxTemp =document.getElementsByClassName('max_temp');
let minTemp =document.getElementsByClassName('min_temp');
let buttom =document.getElementsByClassName("buttom")[0];
let icone =document.getElementsByClassName('fa-spinner')[0];
let jsData
let counter = hour ;
counter+=4;
let dateForTimeD = [];
buttom.onclick =function() {
    getLocation();
};
function getLocation() {
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition,showerror,allow);
    }   
}
function showPosition(position) {
    latitude= position.coords.latitude.toFixed(2)  ; 
    longitude = position.coords.longitude.toFixed(2) ;
    applyReq()
}
function applyReq(){
    let requset =new XMLHttpRequest();
    requset.open('get',`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,rain,windgusts_10m,shortwave_radiation&daily=temperature_2m_max,temperature_2m_min,uv_index_max&timezone=auto`);
    requset.send();
    requset.onreadystatechange=function(){
    if(requset.readyState==4 &&requset.status==200){
        jsData = JSON.parse(requset.responseText);
        editdaily ()
        edithours ()
        editheader ()
        viewHide()
        
    }
    
};
}
function editdaily (){
    for (let i = 0 ; i < maxTemp.length ; i++){
        maxTemp[i].textContent=` الحرارة العليا = ${jsData.daily.temperature_2m_max[i]}`;
        minTemp[i].textContent=` الحرارة الدنيا = ${jsData.daily.temperature_2m_min[i]}`;
        ultraV[i].textContent=` فوق البنفسجية = ${jsData.daily.uv_index_max[i]}`
        date[i].textContent=`الوقت=${jsData.daily.time[i]}`
    }
}
function edithours (){
    
    for(let i = 0 ;i<dayTemp.length ; i++ ){
        dayTemp[i].textContent= `درجة الحرارة = ${jsData.hourly.temperature_2m[counter]}`;
        realTemp[i].textContent= ` درجة الحقيقية = ${jsData.hourly.apparent_temperature[counter]}`
        dateForTimeD[i] = `الوقت = ${jsData.hourly.time[counter].slice(8,10)}/${jsData.hourly.time[counter].slice(11)}`
        timeD[i].textContent=dateForTimeD[i];
        counter+=4;
    }
    counter = hour;
    counter+=4; 
}
function editheader (){
    tempH.textContent = jsData.hourly.temperature_2m[hour];
    rain.textContent = `الأمطار = ${jsData.hourly.rain[hour]} مم`;
    hr.textContent = ` الرطوبة = ${jsData.hourly.relativehumidity_2m[hour]} %`;
    wind.textContent = `سرعة الرياح = ${jsData.hourly.windgusts_10m[hour]} س/كم`;
    uv.textContent = ` فوق البنفسجية = ${jsData.hourly.shortwave_radiation[hour]} متر مربع/وات`
    city.textContent = ` الدولة : ${jsData.timezone.slice(7)}`
    dateNowOnSite.textContent= `الوقت : ${dateNow.getMonth()+1}/${dateNow.getDate()}`
}

buttonLoading.onclick =function(){
    showError.textContent =`جاري تحميل البيانات`
    icone.style.display = 'block';
    loading_p.style.opacity ="1";
    getLocation();
}
function viewHide(){
    setTimeout(function(){
        loading.style.opacity = '0';
        loading.style.zIndex = '-1'
        container.style.opacity = '1';
        container.style.zIndex = '1';
    },1500)
}
function showerror(elementError){
    if(elementError.message == 'User denied Geolocation'){
        showError.textContent = `تم رفض الوصول إلى الموقع`; 
        icone.style.display = 'none';
    }
}
const allow = {
    enableHighAccuracy: true,
}