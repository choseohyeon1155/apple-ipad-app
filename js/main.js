import ipads from '../data/ipads.js'

//장바구니!
const basketStarterEl = document.querySelector('header .basket-starter')
const basketEl = basketStarterEl.querySelector('.basket')

basketStarterEl.addEventListener('click', function(event){
    //윈도우 팝업 숨김 처리 진행시 해당 아래 이벤트도 remove('show')되니 이벤트 전파 차단
    event.stopPropagation()
    if(basketEl.classList.contains('show')) {  //false & true
        //hide
        hideBasket()
    } else {
        //show
        showBasket()
    }
})

//팝업 선택시 숨김처리 안되게 이벤트 전파 차단
basketEl.addEventListener('click', function(event){
    event.stopPropagation()
})

//윈도우 최상위 객체 선택 시 팝업 숨김 처리
window.addEventListener('click', function(){
    basketEl.classList.remove('show')
})

//장바구니 팝업 노출 함수
function showBasket() {
    basketEl.classList.add('show')
}
//장바구니 팝업 숨김 함수
function hideBasket() {
    basketEl.classList.remove('show')
}


//검색!
const headerEl = document.querySelector('header')
const headerMenuEls = [...headerEl.querySelectorAll('ul.menu > li')]
const searchWrapEl = headerEl.querySelector('.search-wrap')
const searchStarterEl = headerEl.querySelector('.search-starter')
const searchCloserEl = searchWrapEl.querySelector('.search-closer')
const searchShadowEl = searchWrapEl.querySelector('.shadow')
const searchInputEl = searchWrapEl.querySelector('input')
const searchDelayEls = [...searchWrapEl.querySelectorAll('li')]


searchStarterEl.addEventListener('click', showSearch)
searchCloserEl.addEventListener('click', hideSearch)
searchShadowEl.addEventListener('click', hideSearch)

//검색 영역 선택시 메뉴 숨김 및 검색영역 노출 함수
function showSearch() {
    //검색 영역 노출
    headerEl.classList.add('searching')
    document.documentElement.classList.add('fixed')
    //메뉴 숨김 애니메이션
    headerMenuEls.reverse().forEach(function (el, index) {
        el.style.transitionDelay = index * .4 / headerMenuEls.length + 's'
    })
    //검색 애니메이션
    searchDelayEls.forEach(function (el, index){
        el.style.transitionDelay = index * .4 / searchDelayEls.length + 's'
    })
    //검색인풋창에 포커스
    setTimeout(function(){
        searchInputEl.focus()
    }, 600)
}
//검색 영역 선택시 메뉴 노출 및 검색영역 숨김 함수
function hideSearch() {
    //검색 영역 숨김
    headerEl.classList.remove('searching')
    document.documentElement.classList.remove('fixed')
    //메뉴 노출 애니메이션
    headerMenuEls.reverse().forEach(function (el, index) {
        el.style.transitionDelay = index * .4 / headerMenuEls.length + 's'
    })
    //검색 애니메이션
    searchDelayEls.reverse().forEach(function (el, index){
        el.style.transitionDelay = index * .4 / searchDelayEls.length + 's'
    })
    searchDelayEls.reverse()
    //검색바 사라질 때 검색입력내용도 삭제(초기화)
    searchInputEl.value = ''
}


// 요소의 가시설 관찰
const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if(!entry.isIntersecting) {
            return
        }
        entry.target.classList.add('show')
    })
})
const infoEls = document.querySelectorAll('.info')
infoEls.forEach(function (el) {
    io.observe(el)
})


// 비디오 재생!
const video = document.querySelector('.stage video')
const playBtn = document.querySelector('.stage .controller--play')
const pauseBtn = document.querySelector('.stage .controller--pause')

playBtn.addEventListener('click', function () {
    video.play()
    playBtn.classList.add('hide')
    pauseBtn.classList.remove('hide')
})
pauseBtn.addEventListener('click', function () {
    video.pause()
    pauseBtn.classList.add('hide')
    playBtn.classList.remove('hide')
})


// '당신에게 맞는 iPad는?' 렌더링!
const itemsEl = document.querySelector('section.compare .items')
ipads.forEach(function (ipad) {
    const itemEl = document.createElement('div')
    itemEl.classList.add('item')

    let colorList = ''
    ipad.colors.forEach(function (color) {
        colorList += `<li style="background-color: ${color};"></li>`
    })

    itemEl.innerHTML = /*html*/ `
        <div class="thumbnail">
            <img src="${ipad.thumbnail}" alt="${ipad.thumbnail}" />
        </div>
        <ul class="colors">
            ${colorList}
        </ul>
        <h3 class="name">${ipad.name}</h3>
        <p class="tagline">${ipad.tagline}</p>
        <p class="price">₩${ipad.price.toLocaleString('en-US')}부터</p>
        <button class="btn">구입하기</button>
        <a href="${ipad.url}" class="link">더 알아보기</a>
    `

    itemsEl.append(itemEl)
})

