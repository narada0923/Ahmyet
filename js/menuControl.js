const openMenu= document.querySelector('.openMenu');
const MoblieMenu= document.querySelector('.MoblieMenu');
const mHeader= document.querySelector('.mHeader');
const closeBtn= document.querySelector('.closeBtn');
const modalMenu = document.querySelector('.modalMenu')
const products = document.querySelector('.products')

function hiddenModal() {
    MoblieMenu.classList.add("hidden"); 
}
function ShowModal() {
    MoblieMenu.classList.remove("hidden"); 
}
function openM(){           
    mHeader.classList.remove("closeModal");
    mHeader.classList.add("showModal");
}
function closeM(){           
    mHeader.classList.remove("showModal");
    mHeader.classList.add("closeModal");
}       

openMenu.addEventListener('click', ()=>{  
    ShowModal()  
    openM();
    products.classList.add('fixed');
});
closeBtn.addEventListener('click', e=>{   
    e.preventDefault();
    closeM();        
    products.classList.remove('fixed');
    setTimeout(function () {
        hiddenModal()
    }, 200);      
});


modalMenu.addEventListener('click',e=>{
    e.preventDefault();
    closeM();        
    setTimeout(function () {
        hiddenModal()
    }, 200);  
})

const userCheck = document.querySelector('#userCheck');
const userLogout = document.querySelector('.userLogout');

userCheck.addEventListener('mouseover', ()=>{
    userLogout.classList.remove('hidden');    
})
// userCheck.addEventListener('mouseout', ()=>{
//     userLogout.classList.add('hidden');    
// })
document.addEventListener('click', e=>{
    if(e.target.id !='userLogout' | e.target.id !='other') {    
        userLogout.classList.add('hidden'); 
    }
  

   //    
})


userCheck.addEventListener('click',()=>{
    if(!localStorage['userIn']){       
        location.href = "http://127.0.0.1:5500/login.html"
    };
})


//cart controller
const shopCart = document.querySelector('.fa-shopping-cart');
const shopMob = document.querySelector('.shopMob');
const carts = document.querySelector('.hdnCrt');

shopCart.addEventListener('click',()=>{
    carts.classList.remove('hidden')    
})
shopMob.addEventListener('click',()=>{
    carts.classList.remove('hidden')    
})
document.addEventListener('click', e=>{
    // if( e.target.classList[0] !='cal' && e.target.classList[0] !='payProd'  && e.target.classList[0] !='info' && e.target.id !='totalProd' && e.target.classList[0] !='plusCart' &&  e.target.classList[0] !='minusCart' && e.target.classList[0] !='deleteC' && e.target.classList[0] !='prodImg' && e.target.classList[0] !='carts' && e.target.classList[1] !='fa-shopping-cart' && e.target.classList[0] !='shopMob'  | e.target.classList[0]==='close' ) {
    //     carts.classList.add('hidden')
    // } product_info
    console.log(e.target.classList[0])
    if(e.target.classList[0]=='close' || e.target.id=='product' || e.target.id=='product_info'|| e.target.classList[0]=='btnCards' || e.target.classList[0]=='imgclick') {
        carts.classList.add('hidden')
    } 
    
})

//exit 


document.addEventListener('click', e=>{
    if(e.target.classList[0] == 'exit') {
        localStorage.removeItem('userIn')
        location.href = "http://127.0.0.1:5500/index.html?val=1"
    }
    if(e.target.classList[0] == 'oShop') {
        location.href = "http://127.0.0.1:5500/index.html?val=1"
    }
})
const cont1 = document.querySelector('#cont1');
const cont2 = document.querySelector('#cont2');
const cont3 = document.querySelector('#cont3');
const cont4 = document.querySelector('#cont4');

document.addEventListener('mouseover',e=>{
    if(e.target.id=='cont1') {
        cont1.innerHTML='fb.com/oShop'
    }
    if(e.target.id=='cont2') {
        cont2.innerHTML='in.com/oShop'
    }
    if(e.target.id=='cont3') {
        cont3.innerHTML='mail@example.com'
    }
    if(e.target.id=='cont4') {
        cont4.innerHTML='123456'
    }
})
document.addEventListener('mouseout',e=>{
    if(e.target.id=='cont1') {
        cont1.innerHTML='<i class="fab fa-facebook-square cursor-pointer"></i>'
    }
    if(e.target.id=='cont2') {
        cont2.innerHTML='<i class="fab fa-instagram-square cursor-pointer"></i>'
    }
    if(e.target.id=='cont3') {
        cont3.innerHTML='<i class="fas fa-envelope cursor-pointer"></i>'
    }
    if(e.target.id=='cont4') {
        cont4.innerHTML='<i class="fas fa-phone-square-alt cursor-pointer"></i>'
    }

})


// document.addEventListener('mouseout',e=>{
//     if(e.target.id=='cont11') {
//         cont1.classList.remove('hidden');
//         cont11.classList.add('hidden');
   
//     }
// })







