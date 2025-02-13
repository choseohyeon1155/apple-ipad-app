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