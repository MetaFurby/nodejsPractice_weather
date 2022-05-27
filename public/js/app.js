console.log("Client side message");

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msgOne = document.querySelector('#msg1');
const msgTwo = document.querySelector('#msg2');

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    msgTwo.textContent = "Loading";
    let aux = search.value;
    fetch('http://localhost:3000/weather?address='+aux).then((res)=>{
    res.json().then((data)=>{
        if(data.error){
            msgOne.textContent = data.error;
        }
        else{
            msgOne.textContent= data;
        }
        msgTwo.textContent = "";
    })
})

})