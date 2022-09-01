const imagecondainar = document.getElementById('image-condainar');
const loader = document.getElementById('loader');

let ready = false;
let imagesloaded = 0;
let totalimage = 0 ;
let photoArray = [];


// unsplash API
const count = 30;
const apiKey = '6mCrXboqdoPpDvtgRObNvD8XabF7_UrwVp6TmYMsqrU';

// unsplash Api
const apiUrl =`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// check all event listner are loaded
function imageloaded(){
    imagesloaded++;
    
    if(imagesloaded === totalimage){
        ready = true; 
        loader.hidden = true; 
       console.log('ready =',ready);
    }
}
// helper function  to set attributes on DOm Elemant

function setAttributes(element,attributes){

    for(const key in attributes ){
        element.setAttribute(key,attributes[key]);
    }
}

// create aelements for links & photos ,add to dom
function diplayphotos() {
    imagesloaded = 0;
    totalimage = photoArray.length;
    
    // run function for each object in photos array 
    photoArray.forEach((photo)=>{
        // create <a> to link  to unsplash 
        const item = document.createElement('a');
         setAttributes(item,{
            href: photo.links.html,
            target:'_balank',
         });
        // create img for photo
        const img = document.createElement('img');
           setAttributes(img,{
            src:photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
           });
        //    Event listner , check when each is finished loading
        img.addEventListener('load',imageloaded);
        // put img inside <a>,then put both inside image condainar ElE
        item.appendChild(img);
        imagecondainar.appendChild(item);
    });
}




// get photos from unsplash API
async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photoArray = await response.json();
        diplayphotos();
    }catch(error){
        // catch error here
    }
}

// check to see if scrolling near load more photos
window.addEventListener('scroll', () => {
   if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
       getPhotos();
         
   }
});

// on load
getPhotos();