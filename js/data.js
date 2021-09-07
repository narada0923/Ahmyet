let prods = [];

function proddata(catname){
    let cat=catname;
    const product = document.querySelector('#product')
    let l=0;
    fetch('../data/products.json')
    .then(res=>res.json())
    .then(results=>{  
        product.innerHTML="";
        let currentData = results.filter(el => el.category === cat)    
        currentData.forEach(el => {
            prods.push(el)  
            let title = el.title;
            product.insertAdjacentHTML('afterbegin', `
                <div class="imgBtn w-full bg-white h-full border border-green-300 rounded-md shadow-xl cursor-pointer mx-auto sm:mx-0 relative overflow-hidden pb-2">
                    <div id="${el.id}" class="imgclick w-full h-72 bg-contain bg-no-repeat bg-center rounded-sm" style="background-image: url(${el.image});">               
                        <div id="${el.id}" class="imgclick absolute w-full top-0 h-72 cursor-pointer flex justify-start transform -translate-x-20 transition duration-300 hover:translate-x-0">
                            <p class="w-3/12 h-7 p-1 bg-green-500 text-white text-sm"><i class="fas fa-star"></i> ${el.rating.rate}</p>
                        </div>                
                    </div>
                    <div class="infoProdr w-full">
                        <div class="price text-center mt-1">
                            <p class="text-sm">${title.slice(0, 20)}..</p>
                            <p class="text-lg font-black text-green-500">$${el.price}</p>
                        </div>
                        <div class="text-center">
                        <button type="submit" id="${el.id}" class="btnCards py-2 px-4 bg-green-500 rounded-3xl text-white hover:bg-blue-500 text-sm">Сагсанд хийх</button>    
                        </div>  
                    </div>            
                </div>         
            `)
            l++;
        });
        const productsLen = document.querySelector('#product_info');
        productsLen.insertAdjacentHTML('afterbegin', `
            <div class="productsLen flex justify-start">
                <p class="font-bold">${cat.toUpperCase()}</p>
                <p class="mx-4 text-gray-500 hidden sm:block">нийт ${l} бүтээгдэхүүн байна</p>  
            </div>          
            <div class="productSort border border-gray-200 rounded-md">
                <select onchange="change()" class="selSort bg-gray-100  py-2 px-4 outline-none cursor-pointer">
                    <option value="0">Үнэ өсөхөөр</option>
                    <option value="1">Үнэ буурахаар</option>                    
                  </select>                
            </div>         
    `)
    })
}



window.addEventListener('load', function() {
    let urlParams = new URLSearchParams(window.location.search);
    let val = urlParams.get('val');     
    let catnames =["electronics","women's clothing","men's clothing","sports","foods","cosmetics","toys","jewelery"]
    for (let i = 0; i < catnames.length; i++) {       
        if(val == i+1) {
            proddata(catnames[i]);
        }
    }  
})

function  change() {
    let selSort = document.querySelector('.selSort').value;
    let sortData = prods.slice(0);
    sortData.sort(function(a,b) {
        return a.price - b.price;
    });

    let urlParams = new URLSearchParams(window.location.search);
    let val = urlParams.get('val');   
    let catnames =["electronics","women's clothing","men's clothing","sports","foods","cosmetics","toys","jewelery"]

    if(selSort==1) {        
        catnames.forEach((el,index)=>{            
            if(val == index+1) {      
                dataSort(el,sortData,selSort) 
            }   
        })                
    } else {
        let catn
        for (let i = 7; i >-1; i--) {
            if(val == i+1) {      
               catn = catnames[i]              
            }                                    
        }
        dataSort(catn,sortData.reverse(),selSort)       
    }
}

function dataSort(catname,data,sSort){
    let cat=catname;
    const product = document.querySelector('#product')
    let l=0;   
        product.innerHTML="";  
        data.forEach(el => {
            let title = el.title;
            product.insertAdjacentHTML('afterbegin', `
            <div class="imgBtn w-full bg-white h-full border border-green-300 rounded-md shadow-xl cursor-pointer mx-auto sm:mx-0 relative overflow-hidden pb-2">
                    <div id="${el.id}" class="imgclick w-full h-72 bg-contain bg-no-repeat bg-center rounded-sm" style="background-image: url(${el.image});">               
                        <div id="${el.id}" class="imgclick absolute w-full top-0 h-72 cursor-pointer flex justify-start transform -translate-x-20 transition duration-300 hover:translate-x-0">
                            <p class="w-3/12 h-7 p-1 bg-green-500 text-white text-sm"><i class="fas fa-star"></i> ${el.rating.rate}</p>
                        </div>                
                    </div>
                    <div class="infoProdr w-full">
                        <div class="price text-center mt-1">
                            <p class="text-sm">${title.slice(0, 20)}..</p>
                            <p class="text-lg font-black text-green-500">$${el.price}</p>
                        </div>
                        <div class="text-center">
                        <button type="submit" id="${el.id}" class="btnCards py-2 px-4 bg-green-500 rounded-3xl text-white hover:bg-blue-500 text-sm">Сагсанд хийх</button>    
                        </div>  
                    </div>            
                </div>     
                  
            `)
            l++;
        });
        const productsLen = document.querySelector('#product_info');
        productsLen.innerHTML="";
        if(sSort==0) {
            var qscr = `{
                <option value="0" selected="selected">Үнэ өсөхөөр</option>
                <option value="1">Үнэ буурахаар</option>
            }`
        } else {
            var qscr = `{
                <option value="0">Үнэ өсөхөөр</option>
                '<option value="1" selected="selected">Үнэ буурахаар</option>'
            }`
        }
        productsLen.insertAdjacentHTML('afterbegin', `
            <div class="productsLen flex justify-start">
                <p class="font-bold">${cat.toUpperCase()}</p>
                <p class="mx-4 text-gray-500 hidden sm:block">нийт ${l} бүтээгдэхүүн байна</p>  
            </div>          
            <div class="productSort border border-gray-200 rounded-md">
                <select onchange="change()" class="selSort bg-gray-100  py-2 px-4 outline-none cursor-pointer">
                    ${qscr}                                   
                  </select>                
            </div>         
    `)
}

// click product --> modal container

const prodModal = document.querySelector('.prodModal');

document.addEventListener('click',e=>{
    if(e.target.classList[0] == 'imgclick') {
        prodModal.classList.remove('hidden')
        fetch('../data/products.json')
        .then(res=>res.json())
        .then(results=>{  
        let curId = results.find(el=>el.id==e.target.id)
        
        prodModal.innerHTML= `
        <div class="imgcontainer bg-white w-4/5 md:w-2/5 h-3/5 rounded-xl">              
                <div class="w-full h-full bg-contain bg-no-repeat bg-center flex flex-col justify-between p-4" style="background-image: url(${curId.image});">
                   <div class="tag1 flex justify-between items-center">
                        <div class="titlepro bg-gray-500 bg-opacity-60 rounded-xl p-2 text-white">
                            <h1 class="uppercase">${curId.title}</h1>                      
                        </div>
                        <i class="closeImg fas fa-times cursor-pointer text-2xl hover:text-red-500"></i>                          
                   </div>
                   <div class="tag2 flex justify-center items-center bg-gray-500 bg-opacity-60 rounded-xl p-2">
                        <div class="titlepro mx-4">
                            <p class="text-lg text-white">Үнэ: $${curId.price}</p>                   
                        </div>
                        <div class="text-xl hover:text-red-500 cursor-pointer mx-4">
                            <button type="submit" id="${curId.id}" class="btnCards py-2 px-4 bg-green-500 rounded-3xl text-white hover:bg-blue-500 text-sm">Сагсанд хийх</button>  
                        </div>    
                    </div>
                </div>           
            </div>  
        `
        findText.classList.add('hidden');
    })
    }

})

document.addEventListener('click',e=>{
    if(e.target.classList[0] == 'prodModal' | e.target.classList[0] == 'closeImg') {
        prodModal.classList.add('hidden')
    }
})

//find Product
const search = document.querySelector('.search');
const findText = document.querySelector('.findText');
search.addEventListener('input', updateValue);
function updateValue(e) {      
    if(e.target.value !='') {
        findText.classList.remove('hidden');
        fetch('../data/products.json')
        .then(res=>res.json())
        .then(results=>{   
            for(var i = 0; i < results.length; i++){          
                if(results[i].title.indexOf(e.target.value) != -1){               
                    curtext = `<p id="${results[i].id}" class="imgclick">${results[i].title}</p>`}
            }       
            findText.innerHTML =curtext; 
         })  
         

    } else {        
        let curtext ='';
        findText.innerHTML =''; 
        findText.classList.add('hidden');
    }   
}










    





