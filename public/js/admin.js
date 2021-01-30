const check = document.getElementById('admin');

// admin page 
check.addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.getElementById('mailId').value;
    const password = document.getElementById('password').value;

    fetch('/admin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email, password
        })
    }).then((result)=>
        result.text())
        .then(result => {
            document.getElementById('Admin').style.display = "none"
            let h = document.createElement('h1');
            let t = document.createTextNode("The most searches page is  :  "  + result);
            h.appendChild(t);
            document.body.appendChild(h);
        })
        .catch((err)=>{
        console.log(" you got server response error")
    })
})