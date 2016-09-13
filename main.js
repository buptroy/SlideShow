window.onload=function () {
	// body...
	var container=document.getElementById('container');
	var list=document.getElementById('list');
	var buttons=document.getElementById('buttons').getElementsByTagName('span');
	var prev=document.getElementById('prev');
	var next=document.getElementById('next');
	var index=1;
	var animating=false;
	var timer;

	autoPlay();
	container.onmouseover=autoPlayStop;
	container.onmouseout=autoPlay;

	//点亮图片对应的按钮
	function showButton(){
		for (var i = 0; i <= buttons.length; i++) {
			if (buttons[i].className=='on') {
				buttons[i].className='';
				break;
			}
		}
		buttons[index-1].className='on';
	}

	// 处理图片切换
	function animate(offset) {
		animating=true;
		var newLeft=parseInt(list.style.left)+offset;
		var time=300;//位移总时间
		var interval=10;//位移时间间隔
		var speed=offset/(time/interval);
		//list.style.left=newLeft+'px';

		function go() {
			//图片切换中的动画效果
			if ((speed<0&&parseInt(list.style.left)>newLeft)||(speed>0&&parseInt(list.style.left)<newLeft)) {
				list.style.left=parseInt(list.style.left)+speed+'px';
				setTimeout(go,interval);
			}else{
				animating=false;
				list.style.left=newLeft+'px';
				if(newLeft<-3000){
					list.style.left=-600+'px';
					//index=1;//超出边界的处理
				}else if (newLeft>-600) {
					list.style.left=-3000+'px';
					//index=5;//超出边界的处理
				}
			}
		}
		go();
	}
	//ok
	/*autoPlay();
	container.onmouseover=autoPlayStop;
	container.onmouseout=autoPlay;*/

	//点击右箭头切换下一张
	next.onclick=function (){
		if (!animating) {//animating的判断前置，animate和showButton同步
			if (index==5) {
				index=1;
			}else{
				index+=1;
			}
			animate(-600);	
			showButton();
		}
		//index+=1;
	};
	//ok
	/*autoPlay();
	container.onmouseover=autoPlayStop;
	container.onmouseout=autoPlay;
*/

	//点击左箭头切换上一张
	prev.onclick=function(){
		if (!animating) {//animating的判断前置，animate和showButton同步
			if (index==1) {
				index=5;
			}else{
				index-=1;
			}
			animate(600);	
			showButton();
		}
		//index-=1;	
	};

	//ok
	/*autoPlay();
	container.onmouseover=autoPlayStop;
	container.onmouseout=autoPlay;*/


	//处理点击按钮的图片切换
	for (var i = 0; i <= buttons.length; i++) {
		buttons[i].onclick=function(){
			if (this.className=='on') {return;}
			var myIndex=parseInt(this.getAttribute('index'));			
			var offset=-600*(myIndex-index);
			index=myIndex;
			if (!animating) {
				animate(offset);
				showButton();	
			}
			
			
		};
	}

	//不知道为什么这三个函数放在这里不能运行？？？？？？？？
	//container.onmouseover=autoPlayStop;
	//container.onmouseout=autoPlay;
	//autoPlay();
	

	//图片自动播放
	function autoPlay() {
		// body...
		timer = setInterval(function(){
			next.onclick();
		},3000);
	}

	//图片停止自动播放
	function autoPlayStop(){
		clearInterval(timer);
	}
	
	//不知道为什么这三个函数放在最后面就不能运行？？？？？？？？
	//container.onmouseover=autoPlayStop;
	//container.onmouseout=autoPlay;
	//autoPlay();
}	