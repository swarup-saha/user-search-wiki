const login = document.getElementById('login')

login.addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.getElementById('mailId').value;
    const password = document.getElementById('password').value;

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email, password
        })
    }).then((r) => {
        console.log('congrats');
        window.location.href = "../lg_rg_page.html"
    }).catch((err) => {
        throw err
    })
})