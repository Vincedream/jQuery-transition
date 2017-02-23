var loopPlayerInit=(function  () {
	var $butLeft=null;
	var $butRight=null;
	var $butPlay=null;
	var $imglist=null;
	//var origin=['125px','100px'];


	var imgAll=createImg([['img/1.png','img/2.png','img/3.png','img/4.png'],['img/5.png','img/6.png','img/7.png','img/8.png'],['img/9.png','img/10.png','img/11.png','img/12.png']]);

	var imgArrIndex=0;
	var imgAng=45;
	var imgTime=300;
	rotating=false;
	autoTimer=null;
	autointerval=3000;

	function init () {
		$butLeft=$(".butLeft"),
		$butRight=$(".butRight"),
		$butPlay=$(".butPlay"),
		$imglist=$(".mainbox ul li");
		

		confige();
		setEvent ();
		
	}
	function confige () {
		var ang=6;
		aint=-6;
		$imglist.css("transform-origin","125px 800px");
		$imglist.each(function(i) {
			var $this=$(this);
			$this.transition({rotate:(aint+i*ang)+"deg"});
		})
	}

	function setEvent () {
		$butLeft.bind("click",function() {
			anigo(-1);
			
		});
		$butRight.bind("click",function() {
			anigo(1);
			
		});
		$butPlay.bind("click",function() {
			var paly="play",pause="pause",$but=$(this);
			if($but.text()=="play"){
				$but.text(pause);
				autoGo();
			}else{
				$but.text("play");
				autoStop();
			}
		});
	}

	function createImg (arr) {

		var imgArr=[];
		for(var i in arr){
			imgArr[i]=[];
			for(var x in arr[i]){
				imgArr[i][x]=new Image();
				imgArr[i][x].src=arr[i][x];
			}
		}

		return imgArr;
	}			

	function anigo (d) {
		if(rotating)return false;
		rotating=true;
		imgArrIndex+=d;

		if(imgArrIndex>imgAll.length-1){
			imgArrIndex=0;
		}
		else if(imgArrIndex<0){
			imgArrIndex=imgAll.length-1;
		}
		$imglist.each(function (i) {
			var $thisItem=$(this);
			var $thisimg=$thisItem.children("img");
			var $targetImg=$(imgAll[imgArrIndex][i]);
			var thisTime=(d===1)?imgTime*i:imgTime*($imglist.length-1-i);

			$thisItem.append($targetImg);
			$targetImg.css("transform-origin","125px 800px");
			$thisimg.css("transform-origin","125px 800px");
			$targetImg.transition({rotate:(0-d)*imgAng+"deg"},0.001);
			
			setTimeout(function  () {
				$thisimg.animate({rotate:imgAng*d+"deg"});
			$targetImg.animate({rotate:0+"deg"},500,function () {
				$thisimg.remove();
				if(thisTime==(($imglist.length-1)*imgTime)){
				rotating=false;
			}
			});
			},thisTime);
			
			
		})

	}

	function autoGo () {
		clearInterval(autoTimer);
		anigo(1);
		autoTimer=setInterval(function  () {
			anigo(1);
		},autointerval);
	}

	function autoStop () {
		clearInterval(autoTimer);
	}

	return init;
})();
loopPlayerInit();