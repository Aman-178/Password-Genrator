const inputslider = document.querySelector(".slider");
const lengthdisplay = document.querySelector(".number");
const passwordDispaly=document.querySelector(".display");
const copybutton=document.querySelector(".button1");
const uppercase=document.querySelector("#first");
const lowercase=document.querySelector("#second");
const numbers=document.querySelector("#third");
const symbols=document.querySelector("#fourth");
const genratebutton=document.querySelector("#singh");
const allcheckbox=document.querySelectorAll("input[type=checkbox]");
const strength=document.querySelector("#aman");

let password = " ";
let passwordlength = 10;
let checkcount = 0;
handleslider();

function handleslider() {
    inputslider.value = passwordlength;
    lengthdisplay.innerText = passwordlength;
}




//genrate random number 
function generateRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

//genrate single digit number
function getraterandomnumber(){
    return generateRandomInteger(0,9);
}

//genrate lower alphabet
function geenraaterandomlowercae(){
    return String.fromCharCode(generateRandomInteger(97,123));//String.fromCharCode()this function return character if you give ascii value
}
//genrate random upper  alphabet
function geenraaterandomuppercase(){
    return String.fromCharCode(generateRandomInteger(65,91));
}

//make collection of symbbol
const symbol = "!@#$%^&*()_+-=[]{}|;:,.<>?";


//genrate random symbol
function genraterandomsymbol(){
    let random=generateRandomInteger(0,symbol.length);
      return symbol.charAt(random);
}

// function gentraterandompassword(){
//     getraterandomnumber();
//     geenraaterandomlowercae();
//     geenraaterandomuppercase();
//     genraterandomsymbol();
// }


async function copy(){
    try{
    await navigator.clipboard.writeText(passwordDispaly.value);
    }catch(e){
        console.error("Error copying to clipboard: ", e);
    }
}


//event listner on slider
 

inputslider.addEventListener("input", (e) => {
    passwordlength = e.target.value;
    handleslider();
});


copybutton.addEventListener("click",(e)=>{
    if(passwordDispaly.value){
        copy();
    }
})

//count how many checkbox count
function handlecheckboxchange(){
    checkcount=0;
    allcheckbox.forEach((checkbox)=>{
        if(checkbox.checked){
            checkcount++;
        }
    })
    //special condition
    if(checkcount>passwordlength){
        passwordlength=checkcount;
        handleslider();
    }
}

//add eventlistner on chheckbox
allcheckbox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handlecheckboxchange )
})

function shufflepassword(array){
    array = array.split(''); // Convert string to array of characters
    for(let i = array.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array.join(''); // Convert array back to string
}

genratebutton.addEventListener('click', () => {
    if(checkcount <= 0) return;

    if(passwordlength < checkcount) {
        passwordlength = checkcount;
        handleslider();
    }

    password = "";

    let funarr = [];

    if(uppercase.checked) {
        funarr.push(geenraaterandomuppercase);
    }
    if(lowercase.checked) {
        funarr.push(geenraaterandomlowercae);
    }
    if(numbers.checked) {
        funarr.push(getraterandomnumber);
    }
    if(symbols.checked) {
        funarr.push(genraterandomsymbol);
    }

    for(let i = 0; i < funarr.length; i++) {
        password += funarr[i]();
    }

    for(let i = 0; i < passwordlength - funarr.length; i++) {
        let randomindex = generateRandomInteger(0, funarr.length);
        password += funarr[randomindex]();
    }

    password = shufflepassword(password);
    passwordDispaly.value = password;
});
 //put the stuff in password
    // if(uppercase.checked){
    //     password+=geenraaterandomuppercase();
    // }
    // if(lowercase.checked){
    //     password+=geenraaterandomlowercae();
    // }
    // if(numbers.checked){
    //     password+=generateRandomInteger();
    // }
    // if(symbols.checked){
    //     password+=genraterandomsymbol();
    // }
