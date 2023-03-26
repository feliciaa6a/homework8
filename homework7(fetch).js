const baseURL="http://runninglili.club:8080";
//直接渲染消息
fetch(baseURL+"/getAllMessages")
.then(res=>res.json())
.then(res=>{
    const html=res.map(item=>
    `<li>
         <section class="imf">
            <div>${item.username}</div>
            <img src="${item.avatar}" alt="">
        </section>
        <h3 class="mes">${item.words}</h3>
    </li>`
    ).join("")
    document.querySelector(".chatUl").insertAdjacentHTML("beforeend",html)
    console.log(res); 
});
//监听注册
document.querySelector("#registerBut").addEventListener("click",()=>{
    fetch(
        baseURL+"/register",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded"
            },
            body:`username=${registerInput.value}`
        }
    )
});
//监听登录
document.querySelector("#loginBut").addEventListener("click",()=>{
    fetch(
        baseURL+"/login",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded"
            },
            body:`username=${loginInput.value}`
        }
    )
    .then(res=>res.json())
    .then(res=>{
        localStorage.setItem("token",res.token)
        console.log(res.token);
    })
});
//监听发送
document.querySelector("#sendBut").addEventListener("click",()=>{
    fetch(
        baseURL+"/sendMes",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded",
                "Authorization":localStorage.getItem("token")
            },
            body:`words=${sendInput.value}`
        }
    )
})
let token=localStorage.getItem("token");
console.log(token);
