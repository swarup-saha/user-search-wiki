
let cats = document.getElementsByClassName("catagory");

// user like and delete handle
for(let i=0; i< cats.length; i++){
    let cat = cats[i];
    cat.addEventListener("click", e => {
        let list = cat.lastElementChild.classList;
        let target = e.target
        let link = target.previousElementSibling.href.split('/');
        let link_name = link[link.length - 1];
        const like = link_name;
        if(list[list.length - 1] === 'active'){
            cat.lastElementChild.classList.remove('active');
            fetch('/likeDelete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    like
                })
            }).then(() => {
                console.log("your like imoji deleted successfully");
            }).catch(() => {
                console.log("you got a server deletion error")
            })
        }else{
            console.log("yoyoyo")
            cat.lastElementChild.classList.add('active');
            fetch('/likePath', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    like
                })
            }).then(() => {
                console.log("your like added successfully");
            }).catch(() => {
                console.log("you got a server add like error")
            })
        }
    }, false);
}

// user logout handle
const button = document.getElementById('logout');
button.addEventListener('click', (e) => {
    e.preventDefault();
    fetch('/log', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({

        })
    }).then(() => {
        window.location.href = "../registration.html"
    }).catch(() => {
        console.log("You got u error");
    })

})


// windows loading hanle
window.addEventListener('load', (e) => {
    e.preventDefault();
    for (let i = 0; i < cats.length; i++) {
        let cat = cats[i];
        let link = e.target.body.children[1].children[i].children[0].href.split('/');
        let link_name = link[link.length - 1];
        const like = link_name;
        fetch('/loading', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                like
            })
        }).then((result) => {
            cat.lastElementChild.classList.add('active')
        }).catch((err) => {
            console.log("err:" + err);
        });
    }

}, false)
