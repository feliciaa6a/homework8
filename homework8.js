//新建一个axios实例
const instance1 = axios.create({
    baseURL: 'http://runninglili.club:8080',
    headers: {
        'Authorization':'xxxx',
        "Content-Type": "application/x-www-form-urlencoded"
    }
});
//渲染消息
instance1.get("/getAllMessages")
    .then(res => {
        const html = res.data.map(item =>
            `<li>
               <section class="imf">
                  <div>${item.username}</div>
                  <img src="${item.avatar}" alt="">
              </section>
              <h3 class="mes">${item.words}</h3>
          </li>`
        ).join("")
        document.querySelector(".chatUl").insertAdjacentHTML("beforeend", html)
});
//监听注册
document.querySelector("#registerBut").addEventListener("click", () => {
    instance1.post("/register", `username=${registerInput.value}`).then((res) => {
        console.log(res.data);
    });
});
//监听登录
document.querySelector("#loginBut").addEventListener("click", () => {
    instance1.post("/login",`username=${loginInput.value}`).then((res)=>{
        localStorage.setItem("token",res.data.token)
        console.log(res.data.token);
        //修改authorization默认值
        instance1.defaults.headers['Authorization'] =localStorage.getItem("token");
    })
});
//监听发送
document.querySelector("#sendBut").addEventListener("click", () => {
    instance1.post("/sendMes", `words=${sendInput.value}`).then(res=>{
        console.log(res);
    })
})

//拦截器

// 添加请求拦截器
instance1.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    alert("success request")
    return config;
  }, function (error) {
    // 对请求错误做些什么
    alert("success request")
    return Promise.reject(error);
  });

// 添加响应拦截器
  instance1.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    alert("success response");
    return response; 
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    alert("failed response:"+error);
    return Promise.reject(error);
  });
