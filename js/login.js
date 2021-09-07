const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const btn = document.querySelector('#btn');


function myStorage() {    
    var retUsers = localStorage.getItem('users');
    let usersInfo =JSON.parse(retUsers);
//    console.log(usersInfo[0].email);
    let currentUser = usersInfo.find(el => el.email === emailInput.value) 
    if(currentUser.password === passwordInput.value) {      
        localStorage.setItem('userIn', JSON.stringify(currentUser));  
        window.location='index.html?val=2'    
    } else {
        return swal('Хэрэглэгч олдсонгүй.')
    }
   
}
btn.addEventListener('click',e =>{
    e.preventDefault();   
    if (emailInput.value ===''){
        emailInput.classList.add('border-red-400');     
    } else {
        emailInput.classList.add('border-green-400');   
    }
    if (passwordInput.value ===''){     
        passwordInput.classList.add('border-red-400');
    }else {
        passwordInput.classList.add('border-green-400');   
    }
    myStorage();
})

const forget = document.querySelector('#forget');
const modal = document.querySelector('.modal');
forget.addEventListener('click', e=>{
    modal.classList.remove('hidden')

})

const emailCheck = document.querySelector('#emailCheck');
const checkBtn = document.querySelector('#checkBtn');
const changePass = document.querySelector('#changePass');
const modalFooter = document.querySelector('.modal__footer');
const passwordModal2 = document.querySelector('#passwordModal2');
const passwordModal = document.querySelector('#passwordModal');
let users = []
let currentUser
checkBtn.addEventListener('click', e=> {
    var retUsers = localStorage.getItem('users');
    let usersInfo =JSON.parse(retUsers);
    users = usersInfo;

    currentUser = usersInfo.find(el => el.email === emailCheck.value) 
    if(currentUser) { 
        emailCheck.classList.add('border-green-400')  
        modalFooter.classList.remove('hidden')    
    } else {
        emailCheck.classList.add('border-red-400')  
        swal("Хэрэглэгч олдсонгүй.");       
    }
})
changePass.addEventListener('click', e=>{
    if (passwordModal.value === passwordModal2.value && passwordModal ) {
        console.log()
        for (let i = 0; i < users.length; i++) {
            if(users[i].email===currentUser.email){
                users[i].password = passwordModal.value ;
                swal("Амжилттай солигдлоо");   
                resetValue();
                modal.classList.add('hidden')  
                
            }               
        }   
        localStorage.setItem('users', JSON.stringify(users));       
    } else {
        swal("Нууц үг адилхан биш байна.");  
    }  

})
function resetValue (){
    emailCheck.value="";
    passwordModal2.value="";
    passwordModal.value="";

}

const cancelBtn = document.querySelector('#close')

cancelBtn.addEventListener('click', e=>{
    e.preventDefault();
    modal.classList.add('hidden')  
})







