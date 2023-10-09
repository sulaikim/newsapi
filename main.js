let news = []
let menus = document.querySelectorAll(".menus button")
menus.forEach(menu => menu.addEventListener("click",()=>getNewsByTopic(event)))

let searchButton =document.getElementById('search_button');
let url;
const getNews = async() =>{
  let header = new Headers({'x-api-key':'3J6tln5KVU4-I_IRHJ1UwSDXdB5XYugJw9njrPiBCwo'})
  let response = await fetch(url,{headers:header});
  //ajax axios fetch 등..
  // async 와 await 는 짝꿍이다.
  let data = await response.json()
  // json은 서버통신에서 많이 쓰는 데이터 타입(객체인데 텍스트타입이다.)
  news = data.articles
  console.log(news)
  render()
}


const getLatestNews = async() =>{
  url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=business`)
  getNews()
};

const getNewsByTopic = async(event) => { 
  let topic = event.target.textContent.toLowerCase()
  url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&page_size=10&topic=${topic}`
  );
  getNews()
}

const getNewsByKeyword = async () =>{
  let keyword = document.getElementById("search_input").value
  url = new URL(`https://api.newscatcherapi.com/v2/search?q=${keyword}&page_size=10`);
  getNews()
};


// UI 그리는 함수 
const render = () => {
  let newsHTML ="";
  newsHTML = news.map((item) => {
    return `<div class="row news">
    <div class="col-lg-4">
      <img class="news_img_size" src="${item.media}">
    </div>
    <div class="col-lg-8">
      <h2>${item.title}</h2>
      <p>${item.summary}</p>
      <div>
      ${item.rights} * ${item.published_date}
      </div>
    </div>
  </div>`;
  }).join('');
  // 배열로 불러왔을때 join사용해서 ,없애는 방법 

  
  document.getElementById("news_board").innerHTML = newsHTML;
};

searchButton.addEventListener("click",getNewsByKeyword)
getLatestNews();

