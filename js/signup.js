const passwordInput = document.querySelector('#password');
const passwordConfirm = document.querySelector('#password--confirm');
const smallLetter = document.querySelectorAll('.check');
const btn = document.querySelector('#btn');

const fullnameInput = document.querySelector('#fullname');
const emailInput = document.querySelector('#email');
const numberInput = document.querySelector('#number');
const avatarInput = document.querySelector('#avatar');

class User {
    constructor(id,email, fullname, password, number, avatar){
        this.email = email;
        this.id = id;       
        this.fullname = fullname;
        this.password = password;
        this.number = number;
        this.avatar = avatar;
    }
}

let formIsValid = false;
let passwordIsValid = false;
let passwordMatched = false;

const users = [];

passwordInput.addEventListener('input', () => {
    let regExp =[/[a-z]/, /[A-Z]/, /\d/, /\W/, /.{8,}/];

    let regExInput = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)(?=.{8,})/;

    if(regExInput.test(passwordInput.value)){
        passwordInput.classList.add('border-green-400');
        passwordInput.classList.remove('border-red-400');
        passwordIsValid = true;
    } else {
        passwordInput.classList.remove('border-green-400');
        passwordInput.classList.add('border-red-400');
        passwordIsValid = false;
    }

    regExp.forEach((exp, index) => {
        if(exp.test(passwordInput.value)){
            addClasses(index)
        } else {
            removeClasses(index)
        }
    })
})

function addClasses(index){
    smallLetter[index].classList.add('text-gray-500');
    smallLetter[index].classList.add('line-through');
    smallLetter[index].classList.remove('text-red-500');
}

function removeClasses(index){
    smallLetter[index].classList.remove('text-gray-500');
    smallLetter[index].classList.remove('line-through');
    smallLetter[index].classList.add('text-red-500');
}

passwordConfirm.addEventListener('input', () => {
    if(passwordInput.value === passwordConfirm.value){
        passwordConfirm.classList.remove('border-red-400')
        passwordConfirm.classList.add('border-green-400')
        passwordMatched = true
    } else {
        passwordConfirm.classList.add('border-red-400')
        passwordConfirm.classList.remove('border-green-400')
        passwordMatched = false
    }
})



btn.addEventListener('click', e => {
    e.preventDefault();
    if(fullnameInput.value === ''){
        fullnameInput.classList.add('border-red-400');
        formIsValid = false
    } else {
        fullnameInput.classList.remove('border-red-400');
        formIsValid = true
    }

    if(emailInput.value === ''){
        emailInput.classList.add('border-red-400');
        formIsValid = false
    } else {
        emailInput.classList.remove('border-red-400');
        formIsValid = true
    }

    if(numberInput.value === ''){
        numberInput.classList.add('border-red-400');
        formIsValid = false
    } else {
        numberInput.classList.remove('border-red-400');
        formIsValid = true
    }

    if(formIsValid && passwordIsValid && passwordMatched){
       //checkUser(emailInput.value,numberInput.value);   
       if (users.length>0) { 
            for (let i = 0; i < users.length; i++) {
                if(emailInput.value === users[i].email || numberInput.value === users[i].number) {
                return alert('Таны майл эсвэл утасны дугаар бүртгэлтэй байна.');
                }                         
            }           
        }            
        const user = new User(
            Math.random().toString().split(".")[1],
            emailInput.value,
            fullnameInput.value,
            passwordInput.value,
            numberInput.value,
            avatarInput.value
        )

        users.push(user);
        resetForm();
        myStorage();        
        swal("Амжилттай бүртхүүллээ.", {icon: "success",})
        .then((value) => {
            if (value) {
                return  location.href = "http://127.0.0.1:5500/login.html"
            } else {
                return  location.href = "http://127.0.0.1:5500/login.html"
            }
            
           
        });
        
      
        
    }
})


function resetForm(){
    fullnameInput.value = '';
    emailInput.value = '';
    numberInput.value = null;
    passwordInput.value = '';
    passwordConfirm.value = '';
    avatarInput.value = '';
}

window.addEventListener('load', () => {
    if (users.length===0) { 
        let retUsers = localStorage.getItem('users');
        if (JSON.parse(retUsers)) { 
           for (let i = 0; i < JSON.parse(retUsers).length; i++) {
            users.push(JSON.parse(retUsers)[i])               
           }           
        }        
    }        
});

const backBtn = document.querySelector('#back_btn')
backBtn.addEventListener('click', e=>{
    e.preventDefault();
    window.location='index.html';
})



function myStorage() {
    if (users.length>0) {
        localStorage.setItem('users', JSON.stringify(users));
        let retUsers = localStorage.getItem('users');
        //userIn= JSON.parse(retUsers);  
        //console.log(userIn);    
    }
   
    // for (let i = 0; i < userIn.length; i++) {      
    //     if(emailInput.value ===userIn[i].email && numberInput.value ===userIn[i].number )  {
    //         return alert('Таны майл юмуу утасны дугаар бүртгэлтэй байна.')
    //     }     
    // }
    
}
// function checkUser(mail,phone) {
//     if (mail && phone) {       
//         if (users.length>0) { 
//            for (let i = 0; i < users.length; i++) {
//                if(mail === users[i].email || phone === users[i].number) {
//                 return alert('Таны майл эсвэл утасны дугаар бүртгэлтэй байна.');
//                }                         
//            }           
//         }        
//     }    

//}









