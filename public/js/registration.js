// const { json } = require("body-parser");

const regButton = document.getElementById('regButton');


regButton.addEventListener('click', (e) => {
    e.preventDefault();
    const name = document.getElementById('namereg').value;
    const email = document.getElementById('mailId').value;
    const password = document.getElementById('password').value;
    console.log("hi there");

    fetch('/register', {
        method: 'POST',

        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name, email, password
        })
    }).then((result)=>{
        window.location.href = "../index.html"
    }).catch((e)=>{
        console.log("your registration process got a error")
    })

})