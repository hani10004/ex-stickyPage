let _wrapper; //sticky 영역의 부모(main-content)
let _sticky; //sticky공간
let children; //.section 
let _length; //section의 갯수
let headerVh=6; 
let cotentVh; //영역계산결과
let start=0;
let end=0;


function floderScroll(wrapper,sticky){
    _wrapper = wrapper; //부모
    _sticky = sticky; //sticky영역
    children = document.querySelectorAll('.section')//배열
    _length=children.length;//4

    console.log(_length)
    cotentVh = 96 - headerVh * _length;
    
    start = _wrapper.offsetTop;
    //offsetTop: 자신의 머리가 천장에 닿는 시점의 스크롤탑값을 추출 (문서에서 자신보다 위쪽의 영역높이)
    //offsetHeight: 자신의 높이 값
    //console.log("start" + start)
    //innerHeight: 화면하나의높이 (100vh)
    end = _wrapper.offsetTop + _wrapper.offsetHeight - innerHeight;

    //forEach:children 각각의 할일
    //
    // children.forEach((각각의 아이템,각각의index)})

    children.forEach((child,i)=>{
        child.style.bottom = -(100 - headerVh*(_length - i)) +"vh";
    })
}

function animate(){
    //console.log("scrollY" + scrollY)
    children.forEach((child,i)=>{
       
        let unit = (end - start)/_length;
        let s = start + unit * i;
        let e = start + unit * (i + 1)
        console.log(end)

        if(scrollY<= s){
            child.style.transform=`translate(0,0)`;
        }else if(scrollY>e){
            child.style.transform=`translate(0,${-cotentVh}%)`;
        }else{
            child.style.transform=`translate(0,${-(scrollY - s)/(unit/cotentVh)}%)`;
        }

    })
}

let mainContent=document.querySelector('.main-content');
let $sticky=document.querySelector('.sticky')
floderScroll(mainContent,$sticky)

window.addEventListener('scroll',function(){
    animate();
})
window.addEventListener('resize',()=>{
    floderScroll(mainContent,$sticky)
})