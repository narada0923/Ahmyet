if(localStorage['userIn']) {  
class Card {
    constructor(userId,productTitle,productImg,productId, price,total,changePrice){
        this.userId = userId;
        this.productTitle = productTitle;
        this.productImg = productImg;
        this.productId = productId;       
        this.price = price;       
        this.total = total;     
        this.changePrice = changePrice;     

    }
}
crds =[];

window.addEventListener('load', () => {
    if (crds.length==0) { 
        let retcarts = localStorage.getItem('carts');
        if (JSON.parse(retcarts)) { 
           for (let i = 0; i < JSON.parse(retcarts).length; i++) {
            crds.push(JSON.parse(retcarts)[i])               
           }           
        }        
    }    
    cartSend()   
    cartModal() 
    payCart()
});
function myStorage() {
    if (crds.length>0) {
        localStorage.setItem('carts', JSON.stringify(crds));
       // let retCarts = localStorage.getItem('carts');         
    }    
}


document.addEventListener('click', e=>{
    //console.log(e.target.id)
    if(e.target.classList[0]=== 'btnCards') {
        if(!localStorage['userIn']) {
            location.href = "http://127.0.0.1:5500/login.html"
        }     
        fetch('../data/products.json')
        .then(res=>res.json())
        .then(results=>{   
        let pp = results.find(el=>el.id==e.target.id)      
        const ccds = new Card(            
            JSON.parse(localStorage['userIn']).id,
            pp.title,
            pp.image,
            pp.id,
            pp.price,
            1,
            pp.price
        )
        crds.push(ccds);    
        myStorage();     
        cartSend() 
        swal({
            title: "Амжилттай",
            text: "Таны сонгосон бүтээгдэхүүн сагсанд орлоо.",
            type: "success",
            timer: 1000
            });
        })
       
                       
    }

})

function cartSend() {
    const cartNum = document.querySelector('.cartNum');
    const cartNumMobile = document.querySelector('.cartNumMobile');
    cartNum.innerHTML=""
    cartNumMobile.innerHTML=""

    let mycart = crds.filter(el=>el.userId===JSON.parse(localStorage['userIn']).id)
    cartNum.insertAdjacentHTML('afterbegin',`
        <p class="bg-blue-500 px-2 rounded-full text-sm text-white hover:bg-green-500">${mycart.length}<p>      
    `)
    cartNumMobile.insertAdjacentHTML('afterbegin',`    
    <p class="bg-white px-2 rounded-full ml-1 text-sm text-blue-500 hover:bg-green-500">${mycart.length}<p>   
`)
payCart()
}

const ctdiv = document.querySelector('.carts');

function cartModal() {
    ctdiv.innerHTML='';
    let mycart = crds.filter(el=>el.userId===JSON.parse(localStorage['userIn']).id)
    mycart.forEach(el => {
        ctdiv.insertAdjacentHTML('afterbegin', `
        <div class="prodImg mb-2 h-48 w-full bg-white rounded-md flex justify-between items-center">
           <div class="imgs flex p-2 hidden sm:block">
               <img class="rounded-md bg-cover w-30 h-32 border border-gray-300" src="${el.productImg}" alt="img">  
               <div class="prinf ml-2">
                   <p>${el.productTitle.slice(0, 15)}</p>                    
               </div>
           </div>
           <div class="price">
               <div class="plas flex items-center text-sm">
                   <button id="${el.productId}" class="minusCart px-6 rounded-l-md border border-gray-200 hover:bg-blue-300 ">-</button>
                   <p id="totalProd" class="px-6 border-t border-b border-gray-200">${el.total}</p>
                   <button id="${el.productId}" class="plusCart px-6 rounded-r-md border border-gray-200 hover:bg-blue-300 ">+</button>
                   <p class="px-4">$${el.changePrice}</p>
               </div>
           </div>
           <div class="pay flex flex-col text-sm">
               <button id="${el.productId}" class="deleteC px-2 md:px-6 m-2 border border-gray-200 rounded-md hover:bg-red-500 hover:text-white">Устгах</button>
               <button class="px-2 md:px-6 m-2 border border-gray-200 rounded-md hover:bg-blue-500 hover:text-white">Төлбөр хийх</button>
           </div>        
       </div>       
       `)  
    });  
    payCart()  
}
const shopC = document.querySelector('.fa-shopping-cart');
shopC.addEventListener('click', ()=>{
    cartModal()
})

} else {
    document.addEventListener('click', e=>{
        if(e.target.classList[0]=== 'btnCards') {
            swal("Та заавал нэвтэрсэн байх ёстой.", {icon: "warning",})   
        }    
    })
   
}

document.addEventListener('click', e=>{   
    if(e.target.classList[0]=='deleteC') {
        let id = e.target.id
        let proc = crds.find(el=>el.productId==id)
        const ind = crds.indexOf(proc);
        crds.splice(ind, 1);
        if(crds.length==0) {
            localStorage.removeItem('carts')
        }
        myStorage();
        cartSend();
        cartModal()
    }
})

// plus  products

plusCart = document.querySelector('.plusCart');
minusCart = document.querySelector('.minusCart');
document.addEventListener('click', e=>{   
    if(e.target.classList[0]=='plusCart') {
        //let fdata = crds.find(el=>el.productId==e.target.id)
        for (var i = 0; i < crds.length; i++) {
            if (crds[i].productId == e.target.id) {               
                crds[i].total += 1; 
                let plusVal = crds[i].changePrice+crds[i].price;
                crds[i].changePrice = parseInt(plusVal); 
                myStorage();
                cartSend();
                cartModal()  
                break;
            }
        }
        cartModal()
    } 
    if(e.target.classList[0]=='minusCart') {
        for (var i = 0; i < crds.length; i++) {
            if (crds[i].productId == e.target.id) {  
                crds[i].total -= 1; 
                let minusVal = crds[i].changePrice-crds[i].price;
                crds[i].changePrice = parseInt(minusVal); 
                if(crds[i].total==0) {
                    let id = e.target.id
                    let proc = crds.find(el=>el.productId==id)
                    const ind = crds.indexOf(proc);
                    crds.splice(ind, 1);
                    if(crds.length==0) {
                        localStorage.removeItem('carts')
                    }
                    myStorage();
                    cartSend();
                    cartModal()                                       
                } else {
                    myStorage();
                    cartSend();
                    cartModal()  
                }
                break;
            }
        }
        cartModal()
        
    } 
       
})

function payCart (){
    const cartFoot = document.querySelector('.cartFoot');
    const payProd = document.querySelector('.payProd');
    let totalP=0;
    let totalPrice=0;
    if(crds.length==0) {
        cartFoot.classList.add('hidden')
    } else {
        cartFoot.classList.remove('hidden')
    }
  
    crds.forEach(el=>{
        totalP+=el.total;
        totalPrice+=el.changePrice;        
    })
    if(totalP > 0) {
        payProd.innerHTML=('afterbegin', `
        <div class="info flex justify-between my-2">
            <p>Нийт: ${totalP} ширхэг бараа</p>
            <button class="py-2 px-4 bg-white rounded-md hover:bg-green-400 hover:text-white">Худалдан авах</button>
        </div>
        <div class="info flex justify-between my-2">
            <p>Нийт үнэ: $${totalPrice}</p>                           
            <button class="py-2 px-5 bg-white rounded-md hover:bg-green-400 hover:text-white">Зээлээр авах</button>
        </div>    
    `)        
    }
       

}


