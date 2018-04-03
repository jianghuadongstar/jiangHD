/**
 * Created by Happily on 17/8/15.
 */
$(function() {
document.getElementById('root');
// 自适应屏幕缩放
const baseWidth = 1920;
const baseHeight = 1080;

var body = document.querySelector('body');
var root = document.querySelector('#root');
var realtime = document.querySelector('.health');

function adaptiveScreen() {
    var per = body.clientWidth / baseWidth;
    root.style.width = body.clientWidth + 'px';
    root.style.height = baseHeight * per + 'px';
    root.style.overflow = 'hidden';
    realtime.style.transform = 'scale(' + per + ')';
    realtime.style.transformOrigin = 'left top';

}

let timeout = null;
window.onresize = function() {
    clearTimeout(timeout);
    timeout = setTimeout(function() {
        adaptiveScreen();
    }, 400);
};
adaptiveScreen();

//************************************

    // function current() {
    //     var time = new Date(),
    //         str = '';
    //     str += time.getFullYear() + ' - '; //获取当前年份
    //     str += time.getMonth() + 1 + ' - '; //月份
    //     str += time.getDate() + '&nbsp;&nbsp;&nbsp'; //日
    //     str += time.getHours() + ':'; //时
    //     str += time.getMinutes() + ':'; //分
    //     str += time.getSeconds(); //秒
    //     return str;
    // }
    //
    // setInterval(function() {
    //     $(".time").html(current)
    // }, 1000);







    function getWindow(elem) {
        return jQuery.isWindow(elem) ?
            elem :
            elem.nodeType === 9 ?
                elem.defaultView || elem.parentWindow :
                false;
    }

    $.fn.offset = function (options) {
        if (arguments.length) {
            return options === undefined ?
                this :
                this.each(function (i) {
                    jQuery.offset.setOffset(this, options, i);
                });
        }

        var docElem, win,
            box = {top: 0, left: 0},
            elem = this[0],
            doc = elem && elem.ownerDocument;

        if (!doc) {
            return;
        }

        docElem = doc.documentElement;

        // Make sure it's not a disconnected DOM node
        if (!jQuery.contains(docElem, elem)) {
            return box;
        }

        // If we don't have gBCR, just use 0,0 rather than error
        // BlackBerry 5, iOS 3 (original iPhone)
        if (typeof elem.getBoundingClientRect !== "undefined") {
//      box = elem.getBoundingClientRect();

            box = {
                top: elem.offsetTop,
                left: elem.offsetLeft
            };

        }
        win = getWindow(doc);


        return {
            top: box.top + ( win.pageYOffset || docElem.scrollTop ) - ( docElem.clientTop || 0 ),
            left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
        };
    }

    $.fn.position = function () {
        if (!this[0]) {
            return;
        }

        var offsetParent, offset,
            parentOffset = {top: 0, left: 0},
            elem = this[0];

        // Fixed elements are offset from window (parentOffset = {top:0, left: 0},
        // because it is its only offset parent
        if (jQuery.css(elem, "position") === "fixed") {

            // we assume that getBoundingClientRect is available when computed position is fixed
            offset = elem.getBoundingClientRect();
            offset.top = elem.offsetTop;
            offset.left = elem.offsetLeft;

        } else {

            // Get *real* offsetParent
            offsetParent = this.offsetParent();

            // Get correct offsets
            offset = this.offset();


            if (!jQuery.nodeName(offsetParent[0], "html")) {
                parentOffset = offsetParent.offset();
            }

            // Add offsetParent borders
            parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", true);
            parentOffset.left += jQuery.css(offsetParent[0], "borderLeftWidth", true);
        }

        // Subtract parent offsets and element margins
        // note: when an element has margin: auto the offsetLeft and marginLeft
        // are the same in Safari causing offset.left to incorrectly be 0

        return {
            top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
            left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
        };
    };

    //滚图table1
    $('.slider2').bxSlider({
//      slideWidth: 300,
        mode: 'vertical', //默认的是水平
        displaySlideQty: 1,//显示li的个数
        moveSlideQty: 1,//移动li的个数
        captions: false,//自动控制
        auto: true,
        controls: false,//隐藏左右按钮
        minSlides: 1,
        slideMargin: 2,
        pager: false,
   // autoHover: true,
    });
    //datetime

    function currentTime() {
        var date = new Date();
        var str = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
            + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        $(".time").html(str);
    }
    var timer = setInterval(currentTime, 1000);
});

//交易总量
$('#salesNum').html(Math.floor(Math.random()*1500+2000))
$('#failNum').html(Math.floor(Math.random()*170+30))

//数据中心得分
$('#Score').html(Math.floor(Math.random()*5+95))

//数据量统计WorthySignInUser
$('#WorthySignInUser').html(Math.floor(Math.random()*3000+5900))
$('#WorthyOnlineUser').html(Math.floor(Math.random()*20000+30000))
$('#flowToal').html(Math.floor(Math.random()*100+1500))
$('#networkVisit').html(Math.floor(Math.random()*10000+35000))
$('#networkHook').html(Math.floor(Math.random()*100+200))
$('#bearToal').html(Math.floor(Math.random()*50+350))
$('#VirtualMachineToal').html(Math.floor(Math.random()*100+1400))



/**
 * ajax  拿数据
 */
$.ajax({
	type:"get",
	url:"js/pay.json",
	success:function(res){
		var aAlarmType = ["故障告警","故障恢复","阈值越界","阈值恢复"];
		var aAlarmLv = ["严重","较重","一般"];
		var aAlarmStatus = ["未处理","处理中","已处理"];
		var aAlarmContent = ["连接请求被拒绝","当前响应时间大于800ms","无法通过SNMP获取数据"];
        fStore(aAlarmType);
        fStore(aAlarmLv);
        fStore(aAlarmStatus);
        fStore(aAlarmContent);
        /**
         * fSetArray   随机数组(作为索引使用)
         * @param val 随机范围
         * @returns {Array}
         */
        function fSetArray(val) {
            var arr = [];
            for(let i=0;i<28;i++){
                arr[i] = (Math.random() * val).toFixed(0)/1;
            }
            return arr;
        }
        //滑动列表装填数据
        function fStore() {
            var tab1_alarm = fSetArray(4);
            var tab1_Lv = fSetArray(3);
            var tab1_msg = fSetArray(3);
            var tab1_status = fSetArray(3);
            for(let i=0,len=14;i<len;i++){
                $($(".tab1_alarm")[i+7]).text(aAlarmType[tab1_alarm[i]]);
                $($(".tab1_Lv")[i+7]).text( aAlarmLv[tab1_Lv[i]] );
                $($(".tab1_msg")[i+7]).text( aAlarmContent[tab1_msg[i]] );
                $($(".tab1_status")[i+7]).text( aAlarmStatus[tab1_status[i]] );
                $($(".tab2_alarm")[i+7]).text(aAlarmType[tab1_alarm[i]]);
                $($(".tab2_Lv")[i+7]).text( aAlarmLv[tab1_msg[i]] );
                $($(".tab2_msg")[i+7]).text( aAlarmContent[tab1_Lv[i]] );
                $($(".tab2_status")[i+7]).text( aAlarmStatus[tab1_status[i]] );

            }
            for(let i=0;i<$(".tab1_Lv").length;i++){
                if( '严重' == $($(".tab1_Lv")[i]).text() ){
                    $($(".tab1_Lv")[i]).removeClass("text-yellow");
                    $($(".tab1_Lv")[i]).addClass("text-red");
                }else if( '较重' == $($(".tab1_Lv")[i]).text() ){
                    $($(".tab1_Lv")[i]).removeClass("text-red");
                    $($(".tab1_Lv")[i]).addClass("text-yellow");
                }else if( '一般' == $($(".tab1_Lv")[i]).text() ){
                    $($(".tab1_Lv")[i]).removeClass("text-red");
                    $($(".tab1_Lv")[i]).removeClass("text-yellow");
                }

                if( '严重' == $($(".tab2_Lv")[i]).text() ){
                    $($(".tab2_Lv")[i]).removeClass("text-yellow");
                    $($(".tab2_Lv")[i]).addClass("text-red");
                }else if( '较重' == $($(".tab2_Lv")[i]).text() ){
                    $($(".tab2_Lv")[i]).removeClass("text-red");
                    $($(".tab2_Lv")[i]).addClass("text-yellow");
                }else if( '一般' == $($(".tab2_Lv")[i]).text() ){
                    $($(".tab2_Lv")[i]).removeClass("text-red");
                    $($(".tab2_Lv")[i]).removeClass("text-yellow");
                }
			}

        }
		var payment_stats=res.payment_stats
		var goodNum=fineNumber=general=unusual = normal=unnormal=0
		//应用总量 echart function(){}
			applicationToalFn()
		for(var i=0; i < payment_stats.length; i++ ){
			if(payment_stats[i].success <= 100 && payment_stats[i].success >= 70){
				goodNum++
			}else if(payment_stats[i].success <= 60 && payment_stats[i].success >= 30){
				fineNumber++
			}else if(payment_stats[i].success <= 30 && payment_stats[i].success >= 10){
				unusual++
			}else if(payment_stats[i].success <= 90 && payment_stats[i].success >= 80){
				normal++
			}else if(payment_stats[i].success <= 20 && payment_stats[i].success >= 10){
				unnormal++
			}
		}
		var systemChartData = {
				data:[
		                {value:goodNum, name:'优秀门店'},
		                {value:fineNumber, name:'一般门店'},
		                {value:fineNumber, name:'异常门店'},
		                {value:unusual, name:'良好门店'}
		            ],
		        dataitem:[]
			}
		//关键业务系统性能--儿童娱乐项目
		systemChartFn(systemChartData)
		
		//点击量最高的系统echart
		var clickOrigin=[],OA=[],miningSystem=[],costSystem=[],EPS=[]
		for(var i = 0 ;i <= 6; i ++){
			clickOriginNum = Math.floor(Math.random()*1000+9000)
			OANum = Math.floor(Math.random()*1000+6000)
			miningSystemNum = Math.floor(Math.random()*1000+2000)
			costSystemNum = Math.floor(Math.random()*1000+1500)
			EPSNum = Math.floor(Math.random()*500+1500)
			clickOrigin.push(clickOriginNum)
			OA.push(OANum)
			miningSystem.push(miningSystemNum)
			costSystem.push(costSystemNum)
			EPS.push(EPSNum)
		}
		clickTopData=[
	        {
	            name:'单点登录',
	            type:'line',
	            stack: '总量',
	            data:clickOrigin
	        },
	        {
	            name:'OA',
	            type:'line',
	            stack: '总量',
	            data:OA
	        },
	        {
	            name:'招采系统',
	            type:'line',
	            stack: '总量',
	            data:miningSystem
	        },
	        {
	            name:'成本系统',
	            type:'line',
	            stack: '总量',
	            data:costSystem
	        },
	        {
	            name:'EPS财务共享中心',
	            type:'line',
	            stack: '总量',
	            label: {
	                normal: {
	                    show: true
	                }
	            },
	            data:EPS
	        }
	    ]
		console.log(clickTopData)
		clickTopFn(clickTopData)
    		//专线健康统计
    		var healthtatisticsData=[
                {value:120, name:'异常'},
                {value:310, name:'正常'}
            ]
  		healthtatisticsFn(healthtatisticsData)
  		//流入流出随机数据
  		var machineInOne = [],machineInTwo = [],machineInThree = [],machineInFour = []
  		for(var i = 0 ; i <= 6 ; i++){
  			var machineInOneNum = Math.floor(Math.random()*300+500)
  			var machineInTwoNum = Math.floor(Math.random()*300+500)
  			var machineInThreeNum = Math.floor(Math.random()*300+500)
  			var machineInFourNum = Math.floor(Math.random()*300+500)
  			
//			var machineTwoNum = Math.floor(Math.random()*200+800)
  			machineInOne.push(machineInOneNum)
  			machineInTwo.push(machineInTwoNum)
  			machineInThree.push(machineInThreeNum)
  			machineInFour.push(machineInFourNum)
  		}
  		var flowInData=[
	        {
	            name:'机房出口一',
	            symbol:'none',
	            type:'line',
	            smooth:true,
	            data:machineInOne
	        },
	        {
	            name:'机房出口二',
	            type:'line',
	            symbol:'none',
	            smooth:true,
	            data:machineInTwo
	        },
	        {
	            name:'机房出口三',
	            type:'line',
	            smooth:true,
	            symbol:'none',
	            data:machineInThree
	        },
	        {
	            name:'机房出口四',
	            smooth:true,
	            type:'line',
	            symbol:'none',
	            label: {
	                normal: {
	                    show: true,
	                    position: 'top'
	                }
	            },
	            data:machineInFour
	        }
	    ]
  		var machineOutOne = [],machineOutTwo = [],machineOutThree = [],machineOutFour = []
  		for(var i = 0 ; i <= 6 ; i++){
  			var machineOutOneNum = Math.floor(Math.random()*200+800)
  			var machineOutTwoNum = Math.floor(Math.random()*200+800)
  			var machineOutThreeNum = Math.floor(Math.random()*200+800)
  			var machineOutFourNum = Math.floor(Math.random()*200+800)
  			
//			var machineTwoNum = Math.floor(Math.random()*200+800)
  			machineOutOne.push(machineOutOneNum)
  			machineOutTwo.push(machineOutTwoNum)
  			machineOutThree.push(machineOutThreeNum)
  			machineOutFour.push(machineOutFourNum)
  		}
  		var flowOutData=[
	        {
	            name:'机房出口一',
	            symbol:'none',
	            type:'line',
	            smooth:true,
	            data:machineOutOne
	        },
	        {
	            name:'机房出口二',
	            type:'line',
	            symbol:'none',
	            smooth:true,
	            data:machineOutTwo
	        },
	        {
	            name:'机房出口三',
	            type:'line',
	            smooth:true,
	            symbol:'none',
	            data:machineOutThree
	        },
	        {
	            name:'机房出口四',
	            smooth:true,
	            type:'line',
	            symbol:'none',
	            label: {
	                normal: {
	                    show: true,
	                    position: 'top'
	                }
	            },
	            data:machineOutFour
	        }
	    ]
  		
  		//流入
  		InflowsFn(flowInData)
  		//流出
  		flowOutFn(flowOutData)
  		//工单类型数量
  		var open=[],close=[],requery=[],click=[],change=[]
  		for(var i = 0 ; i <= 5 ; i ++ ){
  			var openNum = Math.floor(Math.random()*100+100)
  			var closeNum = Math.floor(Math.random()*100+200)
  			var requeryNum = Math.floor(Math.random()*50+50)
  			var clickNum = Math.floor(Math.random()*100+150)
  			var changeNum = Math.floor(Math.random()*100+50)
  			open.push(openNum)
  			close.push(closeNum)
  			requery.push(requeryNum)
  			click.push(clickNum)
  			change.push(changeNum)
  		}
  		var typeNumberData=[
	        {
	            name: '开启',
	            type: 'bar',
	            stack: '总量',
	            barWidth:20,
	            label: {
	                normal: {
	                    show: true,
	                    position: 'inside'
	                }
	            },
	            data: open
	        },
	        {
	            name: '关闭',
	            type: 'bar',
	            stack: '总量',
	            label: {
	                normal: {
	                    show: true,
	                    position: 'inside'
	                }
	            },
	            data: close
	        },
	        {
	            name: '请求',
	            type: 'bar',
	            stack: '总量',
	            label: {
	                normal: {
	                    show: true,
	                    position: 'inside'
	                }
	            },
	            data: requery
	        },
	        {
	            name: '事件',
	            type: 'bar',
	            stack: '总量',
	            label: {
	                normal: {
	                    show: true,
	                    position: 'inside'
	                }
	            },
	            data: click
	        },
	        {
	            name: '变更',
	            type: 'bar',
	            stack: '总量',
	            label: {
	                normal: {
	                    show: true,
	                    position: 'inside'
	                }
	            },
	            data: change
	        }
	    ]
  		typeNumberFn(typeNumberData)
  	}	
})



/**
 * Ecahrt 表格数据添加
 */


//应用总数
function applicationToalFn(){
	var applicationToal = echarts.init(document.getElementById('applicationToal'));
	var outData = []
	var data = [
				{value:70, name:'优秀'},
	        {value:17, name:'良好'},
	        {value:13, name:'一般'}
	    		]
	var applicationOption = {
		title: {
	        text: '',
	    subtext:'',
	    x: 'center',
	    y: 'center',
	    textStyle: {
	        fontWeight: 'normal',
	        fontSize: 20,
	        color: "#c1dbfd",
	        fontWeight:'bold'
	    }
	},
	legend: {
	    orient: 'horizontal',
	    y:"bottom",
	    data:['优秀','良好','一般'],
	    textStyle:{
	    		color:"#fff"
	    },
	    itemWidth: 15,
	    itemHeight: 8,
	    selected: {
		    // 选中'系列1'
		    '优秀': true
		}
	    
	},
	color:['#00c9d7', '#ec9e00','#fe2e26'],
	series: [
	    {
	        type: 'pie',
	        selectedMode: 'single',
	        hoverAnimation: false,
	        radius: ['50%', '60%'],
	        avoidLabelOverlap: false,
	        selectedOffset:0,
	        label: {
	            normal: {
	                show: false,
	            }
	        },
	        labelLine: {
	            normal: {
	                show: false
	            }
	        },
	        data:[
				{value:335, name:'优秀'},
	            {value:310, name:'良好'},
	            {value:234, name:'一般'}
	    		]
	    },
	    //外环
	    {
				type: 'pie',
	        selectedMode: 'single',
	        hoverAnimation: false,
	        selectedOffset: 4,
	        radius: ['45%', '70%'],
	        itemStyle: {
	            normal: {
	                color: 'transparent',
	                opacity: '0.15'
	                }
	            },
	            avoidLabelOverlap: false,
	            label: {
	                normal: {
	                    show: false,
	                }
	            },
	            labelLine: {
	                normal: {
	                    show: false
	                }
	            },
	            data: outData,
	            z: 2
	        }
	    ]
	}
	applicationToal.setOption(applicationOption);
	var count = 0
	 data.forEach(function (d) {
	    var tmp = {
	        name: d.name,
	        value: d.value
	    }
	    count += (d.value - 0);
	    outData.push(tmp);
	});
	var  text = '';
	var subtext = '';
	if (outData && outData.length) {
	    text = '' + parseInt(outData[0].value / count * 100)+ '%'
	    subtext = outData[0].name
	}
	 applicationToal.setOption({
	    title: {
	        text: text,
	        subtext:subtext
	    },
	    series: [{
	        data: data
	    }, {
	        data: outData
	    }]
	});
	var  selectedId = 0;
	var  length = outData.length;
	var  style = {
		    normal: {
		        color: '#00c9d6'
	    		}
		}
	if (outData && outData.length) {
	        this.interval = setInterval(function () {
	            let i = selectedId % length;
	            outData.map(function (d) {
	                if (d.itemStyle) delete d.itemStyle;
	            });
	            outData[i].itemStyle = style;
	            selectedId = selectedId + 1;
	            applicationToal.setOption({
	                title: {
	                    text: '' + parseInt(outData[i].value / count * 100) + '%',
	                    subtext:outData[i].name
	                },
	                series: [{
	                    data: data
	                }, {
	                    data: outData
	                }]
	            });
	        }, 1000);
	    }
	}
//关键业务系统性能--儿童娱乐系统echart
function systemChartFn(Data){
	var systemChart = echarts.init(document.getElementById('children-entertainment-system'));
	
	var systemOption = {
	    calculable : true,
	    series : [
	        {
	            name:'访问来源',
	            type:'pie',
	            radius : ['40%','50%'],
	            label:{
	            		normal:{
	            			show:true,
	              		formatter:function(val){ //让series 中的文字进行换行
	                		 	return '   '+val.percent + "% \n \n" + val.name + '('+val.value+')'
	              		},
	              		padding:[0,-50],
	              		textStyle: {
	                        color: '#fff'
	                    }
	            		}
	            },
	            labelLine: {
	                normal: {
	                    lineStyle: {
	                        color: '#fff'
	                    },
	                    length: 10,
	                    length2: 40
	                }
	            },
	            data:Data.data
	       },{
	       		type:'pie',
	            radius : ['30%','35%'],
	            hoverAnimation: false,
	            itemStyle:{
	            		normal:{
	            			color:'#1d2a57'
	            		}
	            },
	            label:{
	            	normal:{
						show:false
					}
	            },
	            labelLine:{
					normal:{
						show:false
					}
	            },
	            data:[
	                {value:310, name:'一般门店'}
	            ]
	       }
	    ]
	}
	  systemChart.setOption(systemOption);
  
}

//点击量最高的系统echart
  function clickTopFn(Data){
  	var clickTop = echarts.init(document.getElementById('clickTop'));
	var clickTopOption = {
	    tooltip : {
	        trigger: 'axis'
	    },
	    legend: {
	        data:['单点登录','OA','招采系统','成本系统','EPS财务共享中心'],
	        textStyle:{
	        		color:'#fff'
	        }
	    },
	    grid: {
	        left: '3%',
	        right: '4%',
	        bottom: '3%',
	        containLabel: true
	        
	    },
	    color:['#8f82bc', '#288dff','#18e9ad',"#ffae3a","#f5533d"],
	    xAxis : [
	        {
	            type : 'category',
	            boundaryGap : false,
	            data : ['周一','周二','周三','周四','周五','周六','周日'],
	            axisLine: {
	                lineStyle: {
	                    type: 'solid',
	                    color: '#576589',//左边线的颜色
	                    width:'2'//坐标线的宽度
	                }
	            },
	            axisLabel: {
	                textStyle: {
	                    color: '#fff',//坐标值得具体的颜色
	 
	                }
	            }
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value',
	            axisLine: {
	                lineStyle: {
	                    type: 'solid',
	                    color: '#576589',//左边线的颜色
	                    width:'1'//坐标线的宽度
	                }
	            },
	            axisLabel: {
	                textStyle: {
	                    color: '#fff',//坐标值得具体的颜色
	 
	                }
	            },
	            splitLine:{
	            		lineStyle:{
	            			color:'#fff',
	            			type:"dashed",
	            			opacity:0.1
	            		}
	            }
	            
	        },
	        {
	        		boundaryGap: [0.2, 0.2]
	        }
	    ],
	    series:Data
	}
	  clickTop.setOption(clickTopOption);
  }
  
  
  



//专线健康统计
function healthtatisticsFn(Data){
	var healthtatistics = echarts.init(document.getElementById('health-statistics'));
	  healthtatistics.setOption({
	    calculable : true,
	    series : [
	        {
	            name:'访问来源',
	            type:'pie',
	            radius : ['50%','60%'],
	            color:['#fb6231','#56be28'],
	            label:{
	            		normal:{
	            			show:true,
	              		formatter:function(val){ //让series 中的文字进行换行
	                		 	return '   '+val.percent + "% \n \n" + val.name + '('+val.value+')'
	              		},
	              		padding:[0,-50],
	              		textStyle: {
	                        color: '#fff'
	                    }
	            		}
	            },
	            labelLine: {
	                normal: {
	                    lineStyle: {
	                        color: '#fff'
	                    },
	                    length: 10,
	                    length2: 20
	                }
	            },
	            data:Data
	       }
	    ]
	});

}


//流入
function InflowsFn(Data){
	
	var Inflows = echarts.init(document.getElementById('inflows'));
	var InflowsOption = {
	//  tooltip : {
	//      trigger: 'axis'
	//  },
	    legend: {
	    		top:'10%',
	        data:['机房出口一','机房出口二','机房出口三','机房出口四','机房出口五'],
	        textStyle:{
	        		color:'#fff'
	        }
	    },
	    grid: {
	        left: '3%',
	        right: '4%',
	        bottom: '3%',
	        containLabel: true
	        
	    },
	    color:['#00c9d7', '#ec9e00','#fe2e26'],
	    xAxis : [
	        {
	            type : 'category',
	            boundaryGap : false,
	            data : ['04-07','04-08','04-09','04-10','04-11','04-12','04-13'],
	            axisLine: {
	                lineStyle: {
	                    type: 'solid',
	                    color: '#576589',//左边线的颜色
	                    width:'2'//坐标线的宽度
	                }
	            },
	            axisLabel: {
	                textStyle: {
	                    color: '#fff',//坐标值得具体的颜色
	 
	                }
	            }
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value',
	            min:400,
	            interval:100,
	            axisLine: {
	                lineStyle: {
	                    type: 'solid',
	                    color: '#576589',//左边线的颜色
	                    width:'1'//坐标线的宽度
	                }
	            },
	            axisLabel: {
	                textStyle: {
	                    color: '#fff',//坐标值得具体的颜色
	                }
	            },
	            splitLine:{
	            		lineStyle:{
	            			color:"#fff",
	            			type:"dashed",
	            			opacity:0.1
	            		}
	            }
	            
	        },
	        {
	        		boundaryGap: [0.2, 0.2]
	        }
	    ],
	    series : Data
	}
	  Inflows.setOption(InflowsOption);
}
//流出
function flowOutFn(Data){
	
	var flowOut = echarts.init(document.getElementById('flowOut'));
	  flowOut.setOption({
	//  tooltip : {
	//      trigger: 'axis'
	//  },
	    legend: {
	        data:['机房出口一','机房出口二','机房出口三','机房出口四','机房出口五'],
	        top:'10%',
	        textStyle:{
	        		color:'#fff'
	        }
	    },
	    grid: {
	        left: '3%',
	        right: '4%',
	        bottom: '3%',
	        containLabel: true
	        
	    },
	    color:['#00c9d7', '#ec9e00','#fe2e26'],
	    xAxis : [
	        {
	            type : 'category',
	            boundaryGap : false,
	            data : ['04-07','04-08','04-09','04-10','04-11','04-12','04-13'],
	            axisLine: {
	                lineStyle: {
	                    type: 'solid',
	                    color: '#576589',//左边线的颜色
	                    width:'2'//坐标线的宽度
	                }
	            },
	            axisLabel: {
	                textStyle: {
	                    color: '#fff',//坐标值得具体的颜色
	 
	                }
	            }
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value',
	            min:700,
	            interval:100,
	            axisLine: {
	                lineStyle: {
	                    type: 'solid',
	                    color: '#576589',//左边线的颜色
	                    width:'1'//坐标线的宽度
	                }
	            },
	            axisLabel: {
	                textStyle: {
	                    color: '#fff',//坐标值得具体的颜色
	                }
	            },
	            splitLine:{
	            		lineStyle:{
	            			type:"dashed",
	            			color:'#fff',
	            			opacity:0.1
	            		}
	            }
	        },
	        {
	            boundaryGap: [0.2, 0.2]
	        }
	    ],
	    series : Data
	});
}


//工单类型数量
function typeNumberFn(Data){
	var typeNumber = echarts.init(document.getElementById('typeNumber'));
	typeNumber.setOption({
	    tooltip : {
	        trigger: 'axis',
	        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
	            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
	        }
	    },
	    legend: {
	        data: ['开启', '关闭','请求','事件','变更'],
	         textStyle:{
	        		color:'#fff'
	        },
	        top:"10%",
	        right:"10px"
	    },
	    grid: {
	        left: '3%',
	        right: '4%',
	        bottom: '3%',
	        containLabel: true,
	        borderWidth:1
	    },
	    color:['#00c9d6', '#fe2e26','#ec9e00','#278dff','#e364e2'],
	    xAxis:  {
	        type: 'value',
	        axisLine: {
	            lineStyle: {
	                type: 'solid',
	                color: '#576589',//左边线的颜色
	                width:'1'//坐标线的宽度
	            }
	        },
	        axisLabel: {
	            textStyle: {
	                color: '#fff',//坐标值得具体的颜色
	 
	                }
	        },
	        splitLine:{
	        		show:false
	        		
	        }
	    },
	    	yAxis: [
	        {
	            type: 'category',
	             data: ['5:00','6:00','7:00','8:00','9:00','10:00'],
	             min:"5:00",
	             axisLine: {
			            lineStyle: {
			                type: 'solid',
			                color: '#576589',//左边线的颜色
			                width:'1'//坐标线的宽度
			            }
			        },
			        axisLabel: {
			            textStyle: {
			                color: '#fff',//坐标值得具体的颜色
			 
			                }
			        },
			        splitLine:{
			        		show:true,
			        		lineStyle:{
			        			type:'dashed',
			        			opacity:0.1
			        		}
			        }
	        }
	    ],
	    series: Data
	})
}



