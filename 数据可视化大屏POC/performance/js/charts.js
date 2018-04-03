/**
 * Created by jack on 2017/8/17.
 */
window.onload = function () {
    let nPayAllCount = [], aPayMethods = [], aPaymentStats = [];
    //let aPayName = [], nPayVal = 0;
    let aWX = new Array(), aZFB = [], aXJ = [],aPos = [], aQt = [];
    //let nWX = 0, nZFB = 0, nXJ = 0, nPos = 0, nQt = 0;
    let color1 = [{"top":'#62f6ff',"bottom":'#bbfbff'}];
    let color2 = [{"top":'#ffae3a',"bottom":'#ffdeaf'}];
    let color3 = [{"top":'#f5533d',"bottom":'#fe9587'}];

    $.ajax({
        type: "GET",
        url: "js/pay.json",
        dataType: "json",
        success: function (data) {
            var chartsData = [];
            nPayAllCount.push(data.payment_all);
            aPayMethods.push(data.pay_methods);
            aPaymentStats.push(data.payment_stats);
            data.pay_methods.forEach(function (val, index) {
                if (null != data.pay_methods[index].pay_name.match(/微信/gi)) {
                    var wx = {};
                    wx.name = data.pay_methods[index].business_name;
                    wx.success = data.pay_methods[index].success;
                    wx.failed = data.pay_methods[index].failed;
                    aWX.push(wx);
                } else if (null != data.pay_methods[index].pay_name.match(/支付宝/gi)) {
                    var zfb = {};
                    zfb.name = data.pay_methods[index].business_name;
                    zfb.success = data.pay_methods[index].success;
                    zfb.failed = data.pay_methods[index].failed;
                    aZFB.push(zfb);
                    //aZFB[nZFB++] = zfb;
                } else if (null != data.pay_methods[index].pay_name.match(/现金/gi)) {
                    var xj = {};
                    xj.name = data.pay_methods[index].business_name;
                    xj.success = data.pay_methods[index].success;
                    xj.failed = data.pay_methods[index].failed;
                    aXJ.push(xj);
                    //aXJ[nXJ] = xj;
                } else {
                    var qt = {};
                    qt.name = data.pay_methods[index].business_name;
                    qt.success = data.pay_methods[index].success;
                    qt.failed = data.pay_methods[index].failed;
                    aQt.push(qt);
                    //aQt[nQt++] = qt;
                }
            });
            fStore(aPaymentStats[0])
            chartsData.push({"wx":fValAdd(aWX),"zfb":fValAdd(aZFB),"xj":fValAdd(aXJ),"qt":fValAdd(aQt)});
            fDraw(color1,color1,color1,nPayAllCount[0],chartsData[0],fValAndPosition(fGetPosition(oChartPosition),aPaymentStats[0]),aPaymentStats[0]);

        }
    });
};
function fRandomNum() {
    return (Math.random() * 50).toFixed(0) - 0;
}

/**
 * fDraw 绘制所有canvas
 * @param color1 三个柱形图渐变颜色（现在一样，代码中只用了color1）
 * @param color2 三个柱形图渐变颜色
 * @param color3 三个柱形图渐变颜色
 * @param dataAll 总的成功和失败量
 * @param dataEvery 各个支付的交易量
 * @param chinaData  地图门店对应的值
 * @param dataWithFailed 地图门店对应的值（带有成功和失败）
 */
function fDraw(color1,color2,color3,dataAll,dataEvery,chinaData,dataWithFailed) {
    fChinaChart('map-chart',chinaData,dataWithFailed);
    fLineChart('area-chart');
    fPieChart('ring-chart',dataAll,dataEvery);
    fBarChart('cpu-chart1',color1,fRandomBarData(200,200));
    fBarChart('cpu-chart2',color2,fRandomBarData(300,70));
    fBarChart('cpu-chart3',color3,fRandomBarData(300,400));
    var total = $("#total"), failed = $("#failed");
    setInterval(function () {
        total.text((2000 + (Math.random() * 1500).toFixed(0)/1));
        failed.text(dataAll.failed)
        //failed.text((30 + (Math.random() * 170).toFixed(0)/1));
     },5000);
}
function fSetOption(dataAll,dataEvery) {
    var option = {
        backgroundColor: '#0d1e53',
        clockwise:false,
        stillShowZeroSum:false,
        /*title: {
            text: '儿童娱乐门店在线支付统计',
            textStyle: {
                fontWeight: 'bold',
                fontSize: 14,
                color: '#346e84',
            },
            left: 5,
            top:11,
        },*/
        /*tooltip: {
         trigger: 'item',
         formatter: "{a} <br/>{b}: {c} ({d}%)"
         },*/
        /*legend: {
         orient: 'vertical',
         x: 'left',
         data:['支付宝','POS机','其他']
         },*/
        series: [
            {
                name:'支付来源',
                type:'pie',
                selectedMode: 'single',
                //selectedOffset:0,
                radius: [0, '30%'],

                label: {
                    normal: {
                        position: 'inner',
                        textStyle:{
                            color:'#ebebed',
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:[
                    {
                        value: dataAll.success,
                        name:'支付成功',
                        itemStyle:{
                            normal:{
                                color:'#bc9af9',
                                shadowColor: '#bc9af9',
                                /* shadowBlur: 10,
                                 shadowOffsetX: 10,
                                 shadowOffsetY: -10,*/
                            },
                            emphasis:{
                                color:'#d7c0ff'
                            }
                        },
                    },
                    {
                        value:dataAll.failed,
                        name:'支付失败',
                        itemStyle:{
                            normal:{
                                color:'#00d1f0',
                                shadowColor: '#00d1f0',
                                /* shadowBlur: 10,
                                 shadowOffsetX: 10,
                                 shadowOffsetY: -10,*/
                            },
                            emphasis:{
                                color:'#2ee3fe'
                            }
                        },
                    },
                ]
            },
            {
                name:'支付来源',
                type:'pie',
                radius: ['40%', '55%'],
                avoidLabelOverlap:false,
                labelLine: {
                    normal: {
                        show: true,
                        length:10,
                        length2:20,
                    }
                },
                data:[
                    {
                        value:dataEvery.zfb,
                        name:'支付宝支付' + fFixed(dataEvery.zfb/dataAll.success),
                        itemStyle:{
                            normal:{
                                color:'#288dff',
                                shadowColor: '#3ea6ff',
                                /* shadowBlur: 10,
                                 shadowOffsetX: 10,
                                 shadowOffsetY: -10,*/
                            },
                            emphasis:{
                                color:'#5ea9fe'
                            }
                        },
                        label:{
                            normal:{
                                textStyle:{
                                    color:'#288dff'
                                }
                            },
                            emphasis:{
                                textStyle:{
                                    color:'#5ea9fe'
                                }
                            }
                        }
                    },
                    {
                        value:dataEvery.qt,
                        name:'POS机支付' + fFixed(dataEvery.qt/dataAll.success),
                        itemStyle:{
                            normal:{
                                color:'#79f7ff',
//                                shadowColor: 'rgba(94, 169, 254, 1)',
//                                shadowBlur: 100
                            },
                            emphasis:{
                                color:'#a9faff'
                            }
                        },
                        label:{
                            normal:{
                                textStyle:{
                                    color:'#79f7ff'
                                }
                            },
                            emphasis:{
                                textStyle:{
                                    color:'#a9faff'
                                }
                            }
                        }
                    },
                    {
                        value:dataEvery.wx,
                        name:'微信支付' + fFixed(dataEvery.wx/dataAll.success),
                        itemStyle:{
                            normal:{
                                color:'#18e9ad',
//                                shadowColor: 'rgba(94, 169, 254, 1)',
//                                shadowBlur: 100
                            },
                            emphasis:{
                                color:'#6fffd6'
                            }
                        },
                        label:{
                            normal:{
                                textStyle:{
                                    color:'#18e9ad'
                                }
                            },
                            emphasis:{
                                textStyle:{
                                    color:'#6fffd6'
                                }
                            }
                        }
                    },
                    {
                        value:dataEvery.xj,
                        name:'现金支付'+ fFixed(dataEvery.xj/dataAll.success),
                        itemStyle:{
                            normal:{
                                color:'#ffae3a',
//                                shadowColor: 'rgba(94, 169, 254, 1)',
//                                shadowBlur: 100
                            },
                            emphasis:{
                                color:'#ffc571'
                            }
                        },
                        label:{
                            normal:{
                                textStyle:{
                                    color:'#ffae3a'
                                }
                            },
                            emphasis:{
                                textStyle:{
                                    color:'#ffc571'
                                }
                            }
                        }
                    },
                    {
                        value:dataEvery.qt,
                        name:'其他'+fFixed(dataEvery.qt/dataAll.success),
                        itemStyle:{
                            normal:{
                                color:'#f5533d',
//                                shadowColor: 'rgba(94, 169, 254, 1)',
//                                shadowBlur: 100
                            },
                            emphasis:{
                                color:'#ff7e6d'
                            }
                        },
                        label:{
                            normal:{
                                textStyle:{
                                    color:'#f5533d'
                                }
                            },
                            emphasis:{
                                textStyle:{
                                    color:'#ff7e6d'
                                }
                            }
                        }
                    }
                ]
            }
        ]
    };
    return option
}
/**
 * fValAdd  累加各个支付的交易量
 * @param obj 各个交易类型对应的对象
 * @returns {number} 各个支付交易量总和
 */
function fValAdd(obj) {
    //console.log(obj)
    var add = 0;
    obj.forEach(function (val,index) {
        add += obj[index].success;
    });
    //console.log(add)
    return add
}
/*function fFixed(num) {
    var n = num*100;
    n = n.toFixed(2) + "%";
    return "("+n+")"
}*/

//绘图方法
/**
 * fChinaChart 绘制中国地图
 * @param id 绘制canvas所需id
 * @param chinaData 带坐标的数据
 * @param dataWithFailed 带交易成功失败的数据
 */
function fChinaChart(id,chinaData,dataWithFailed) {
    var charts = document.getElementById(id);
    var myChart = echarts.init(charts);

    var data = chinaData;
    var dataWithFailed = dataWithFailed;
    var geoCoordMap = oChartPosition;

    /**
     * convertData 处理各种状态数据
     * @param data 数据
     * @param str 各种类型 a:正常   b:一般  c:故障
     * @returns {Array} 返回对应状态的数组
     */
    var convertData = function (data,str) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
                if('a' == str && data[i].value/1>= 10){
                    res.push({
                        name: data[i].name,
                        failed: dataWithFailed[i].failed,
                        heath: ((Math.random() * 70).toFixed(0)/1 +30),
                        value: geoCoord.concat(data[i].value),

                    });
                }
                if('b' == str && data[i].value/1<10){
                    res.push({
                        name: data[i].name,
                        failed: dataWithFailed[i].failed,
                        heath: ((Math.random() * 70).toFixed(0)/1 +30),
                        value: geoCoord.concat(data[i].value),
                    });
                }
                if('c' == str && dataWithFailed[i].failed/1>0){
                    res.push({
                        name: data[i].name,
                        heath: ((Math.random() * 70).toFixed(0)/1 +30),
                        failed: dataWithFailed[i].failed,
                        value: geoCoord.concat(dataWithFailed[i].failed),
                    });
                }

            }
        }
        return res;
    };

    var option = {
        tooltip : {
            trigger: 'item',
            formatter: function (params) {
                var str = '';
                if(params){
                    str += '&nbsp;&nbsp;&nbsp;&nbsp;门店名称：' + params.name + '店'+'&nbsp;<br> '+'<br> ' ;
                    str += '&nbsp;&nbsp;&nbsp;&nbsp;健康得分：' + params.data.heath + '&nbsp;<br>'+'<br> ' ;
                    str += '&nbsp;&nbsp;&nbsp;&nbsp;总交易量：' + params.value[2]+ '&nbsp;<br>'+'<br> ' ;
                    str += ' &nbsp;失败交易量：' + params.data.failed+ '&nbsp;<br> '+'<br> ' ;
                }
                return str;
            },
            textStyle: {
                fontSize: 12,
                color: '#fff',
            },
            backgroundColor: '#103165',
        },
        legend: {
            orient: 'vertical',
            left:50,
            bottom:50,
            data:['正常','一般','故障'],
            textStyle: {
                color: '#fff'
            },
        },
        geo: [
            {
                map: 'china-contour',
                left:20,
                right:20,
                top:10,
                bottom:20,
                roam: false,
                silent:true,
                label: {
                    normal: {
                        show: true,
                    },
                    emphasis:{
                        show: false,
                    }
                },
                itemStyle: {
                    normal:{
                        borderColor: '#0881d4',
                        borderWidth: 3,
                        shadowColor: '#062254',
                        shadowBlur: 10,
                        shadowOffsetX:-15,
                        shadowOffsetY:12
                    },
                    emphasis:{
                        areaColor: 'transparent',
                        borderWidth: 2,
                        shadowColor: 'transparent'
                    }
                }
            },
            {
                map: 'china',
                left:20,
                right:20,
                top:10,
                bottom:20,
                silent:true,
                roam: false,
                label: {
                    emphasis: {
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        areaColor: '#062256',
                        borderColor: '#026dbf',
                        /*shadowColor: '#062254',
                         shadowBlur: 10,
                         shadowOffsetX:-10,
                         shadowOffsetY:10*/
                    },
                    emphasis: {
                        areaColor: '#19418a'
                    }
                }
            }],
        series : [
            {
                name: '正常',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                data: convertData(data,'a'),
                symbolSize: function (val) {
                    var n;
                    if (val[2]/1 >= 50){
                        n = 50;
                    }else if (val[2]/1 <= 5){
                        n = 5;
                    }else {
                        n = val[2];
                    }
                    return n;
                },
                showEffectOn: 'render',
                rippleEffect: {
                    brushType: 'stroke'
                },
                hoverAnimation: true,
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        //color: '#77ce4f',
                        color: {
                            type: 'radial',
                            x: 0.5,
                            y: 0.5,
                            r: 0.5,
                            colorStops: [
                                {
                                    offset: 0, color: 'rgba(126, 216, 78, 0.0)' // 0% 处的颜色
                                },
                                {
                                    offset: 0.3, color: 'rgba(126, 216, 78, 0.1)' // 100% 处的颜色
                                },
                                {
                                    offset: 1, color: 'rgba(126, 216, 78, 1.0)' // 100% 处的颜色
                                }
                            ],
                            globalCoord: false // 缺省为 false true为像素
                        },
                        shadowBlur: 5,
                        shadowColor: '#333'
                    },
                    emphasis:{
                        color: {
                            type: 'radial',
                            x: 0.5,
                            y: 0.5,
                            r: 0.5,
                            colorStops: [
                                {
                                    offset: 0, color: 'rgba(116, 251, 113, 0.0)' // 0% 处的颜色
                                },
                                {
                                    offset: 0.3, color: 'rgba(116, 251, 113, 0.1)' // 100% 处的颜色
                                },
                                {
                                    offset: 1, color: 'rgba(116, 251, 113, 1.0)' // 100% 处的颜色
                                }
                            ],
                            globalCoord: false // 缺省为 false true为像素
                        },
                    }
                },
                zlevel: 1
            },
            {
                name: '一般',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                //data: convertData(data),
                data: convertData(data,'b'),
                symbolSize: function (val) {
                    var n;
                    if (val[2]/1 >= 50){
                        n = 50;
                    }else if (val[2]/1 <= 5){
                        n = 5;
                    }else {
                        n = val[2];
                    }
                    return n;
                },
                showEffectOn: 'render',
                rippleEffect: {
                    brushType: 'stroke'
                },
                hoverAnimation: true,
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        //color: '#d89941',
                        color: {
                            type: 'radial',
                            x: 0.5,
                            y: 0.5,
                            r: 0.5,
                            colorStops: [
                                {
                                    offset: 0, color: 'rgba(223, 157, 64, 0.0)' // 0% 处的颜色
                                },
                                {
                                    offset: 0.3, color: 'rgba(223, 157, 64, 0.1)' // 100% 处的颜色
                                },
                                {
                                    offset: 1, color: 'rgba(223, 157, 64, 1.0)' // 100% 处的颜色
                                }
                            ],
                            globalCoord: false // 缺省为 false true为像素
                        },
                    },
                    emphasis:{
                        color: {
                            type: 'radial',
                            x: 0.5,
                            y: 0.5,
                            r: 0.5,
                            colorStops: [
                                {
                                    offset: 0, color: 'rgba(254, 196, 114, 0.0)' // 0% 处的颜色
                                },
                                {
                                    offset: 0.3, color: 'rgba(254, 196, 114, 0.1)' // 100% 处的颜色
                                },
                                {
                                    offset: 1, color: 'rgba(254, 196, 114, 1.0)' // 100% 处的颜色
                                }
                            ],
                            globalCoord: false // 缺省为 false true为像素
                        },
                    }
                },
                zlevel: 1
            },
            {
                name: '故障',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                //data: convertData(data),
                data: convertData(data,'c'),
                symbolSize: function (val) {
                    var n;
                    if (val[2]/1 >= 50){
                        n = 50;
                    }else if (val[2]/1 <= 5){
                        n = 10;
                    }else {
                        n = val[2];
                    }
                    return n;
                },
                showEffectOn: 'render',
                rippleEffect: {
                    brushType: 'stroke'
                },
                hoverAnimation: true,
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        color: {
                            type: 'radial',
                            x: 0.5,
                            y: 0.5,
                            r: 0.5,
                            colorStops: [
                                {
                                    offset: 0, color: 'rgba(245, 63, 60, 0.0)' // 0% 处的颜色
                                },
                                {
                                    offset: 0.3, color: 'rgba(245, 63, 60, 0.1)' // 100% 处的颜色
                                },
                                {
                                    offset: 1, color: 'rgba(245, 63, 60, 1.0)' // 100% 处的颜色
                                }
                            ],
                            globalCoord: false // 缺省为 false true为像素
                        },
                    },
                    emphasis:{
                        color: {
                            type: 'radial',
                            x: 0.5,
                            y: 0.5,
                            r: 0.5,
                            colorStops: [
                                {
                                    offset: 0, color: 'rgba(254, 106, 63, 0.0)' // 0% 处的颜色
                                },
                                {
                                    offset: 0.3, color: 'rgba(254, 106, 63, 0.1)' // 100% 处的颜色
                                },
                                {
                                    offset: 1, color: 'rgba(254, 106, 63, 1.0)' // 100% 处的颜色
                                }
                            ],
                            globalCoord: false // 缺省为 false true为像素
                        },
                    }
                },
                zlevel: 1
            }
        ]
    };

    myChart.setOption(option);
}

//同上
function fLineChart(id) {
    var charts = document.getElementById(id);
    var myChart = echarts.init(charts);
    var option = {
        tooltip: {
            trigger: 'axis',
            formatter: function (param, index) {
                var str = '';
                for(let i=0;i<param.length;i++){
                    str += param[i].seriesName +' : ' + param[i].value + '分' + "<br>";
                }
                return str
            },
            axisPointer: {
                lineStyle: {
                    color: '#57617B'
                }
            }
        },
        legend: {
            icon: 'circle',
            data: ['北京通州店', '南宁吉安店', '桂林七星店', '厦门集美店','昆明CBD店'],
            right: 'center',
            top: 0,
            textStyle: {
                fontSize: 12,
                color: '#F1F1F3'
            }
        },
        grid: {
            top:40,
            left: 20,
            right: 30,
            bottom: 10,
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            axisLine: {
                lineStyle: {
                    color: '#57617B'
                }
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                margin: 10,
                textStyle: {
                    fontSize: 12,
                    color:'#ebebed',
                },
            },
            data: ['4-7', '4-8', '4-9', '4-10', '4-11', '4-12', '4-13']
        }],
        yAxis: [{
            type: 'value',
            axisTick: {
                show: false,
            },
            axisLine: {
                lineStyle: {
                    color: '#57617B'
                }
            },
            axisLabel: {
                margin: 10,
                textStyle: {
                    fontSize: 12,
                    color:'#ebebed',
                },
                formatter: function (value, index) {
                    return value + '分'
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    type:'dashed',
                    color: '#57617B'
                }
            }
        }],
        series: [
            {
            name: '北京通州店',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
                normal: {
                    width: 1
                }
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(0, 247, 248, 0.9)'
                    }, {
                        offset: 0.4,
                        color: 'rgba(0, 247, 248, 0.8)'
                    },{
                        offset: 0.6,
                        color: 'rgba(0, 247, 248, 0.6)'
                    },{
                        offset: 1.0,
                        color: 'rgba(0, 247, 248, 0.1)'
                    }
                    ], false),
                    shadowBlur: 10
                }
            },
            itemStyle: {
                normal: {
                    color: 'rgb(137,189,27)',
                    borderColor: 'rgba(137,189,2,0.27)',
                    borderWidth: 12

                }
            },
            data: fLineArr()
        }, {
            name: '南宁吉安店',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
                normal: {
                    width: 1
                }
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(40, 140, 253, 0.9)'
                    }, {
                        offset: 0.4,
                        color: 'rgba(40, 140, 253, 0.8)'
                    },{
                        offset: 0.6,
                        color: 'rgba(40, 140, 253, 0.6)'
                    },{
                        offset: 1.0,
                        color: 'rgba(40, 140, 253, 0.1)'
                    }
                    ], false),
                    shadowBlur: 10
                }
            },
            itemStyle: {
                normal: {
                    color: 'rgb(40, 140, 253)',
                    borderColor: 'rgba(40, 140, 253,0.2)',
                    borderWidth: 12

                }
            },
            data: fLineArr()
        }, {
            name: '桂林七星店',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
                normal: {
                    width: 1
                }
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(23, 222, 169, 0.9)'
                    }, {
                        offset: 0.4,
                        color: 'rgba(23, 222, 169, 0.8)'
                    },{
                        offset: 0.6,
                        color: 'rgba(23, 222, 169, 0.6)'
                    },{
                        offset: 1.0,
                        color: 'rgba(23, 222, 169, 0.1)'
                    }
                    ], false),
                    shadowBlur: 10
                }
            },
            itemStyle: {
                normal: {

                    color: 'rgb(23, 215, 166)',
                    borderColor: 'rgba(23, 222, 169,0.2)',
                    borderWidth: 12
                }
            },
            data: fLineArr()
        }, {
            name: '厦门集美店',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
                normal: {
                    width: 1
                }
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(202, 141, 58, 0.9)'
                    }, {
                        offset: 0.4,
                        color: 'rgba(202, 141, 58, 0.8)'
                    },{
                        offset: 0.6,
                        color: 'rgba(202, 141, 58, 0.6)'
                    },{
                        offset: 1.0,
                        color: 'rgba(202, 141, 58, 0.1)'
                    }
                    ], false),
                    shadowBlur: 10
                }
            },
            itemStyle: {
                normal: {
                    color: 'rgb(202, 141, 58)',
                    borderColor: 'rgba(202, 141, 58, 0.2)',
                    borderWidth: 12
                }
            },
            data: fLineArr()
        },{
            name: '昆明CBD店',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
                normal: {
                    width: 1
                }
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(230, 83, 55, 0.9)'
                    }, {
                        offset: 0.4,
                        color: 'rgba(230, 83, 55, 0.8)'
                    },{
                        offset: 0.6,
                        color: 'rgba(230, 83, 55, 0.6)'
                    },{
                        offset: 1.0,
                        color: 'rgba(230, 83, 55, 0.1)'
                    }

                    ], false),
                    //shadowColor: 'rgba(0, 0, 0, 0.1)',
                    shadowBlur: 10
                }
            },
            itemStyle: {
                normal: {

                    color: 'rgb(230, 83, 55)',
                    borderColor: 'rgba(230, 83, 55,0.2)',
                    borderWidth: 12
                }
            },
            data: fLineArr()
        }
        ]
    };
    myChart.setOption(option);
}

//同上
function fPieChart(id,dataAll,dataEvery) {
    var charts = document.getElementById(id);
    var myChart = echarts.init(charts);
    var option = {
        clockwise:false,
        stillShowZeroSum:false,//数据为0的时候是否显示扇区
        series: [
            {
                name:'支付来源',
                type:'pie',
                selectedMode: 'single',
                //selectedOffset:0,
                radius: [0, '32%'],

                label: {
                    normal: {
                        position: 'inner',
                        textStyle:{
                            color:'#ebebed',
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:[
                    {
                        value: dataAll.success,
                        name:'支付成功',
                        itemStyle:{
                            normal:{
                                color:'#bc9af9',
                                shadowColor: '#bc9af9',
                                /* shadowBlur: 10,
                                 shadowOffsetX: 10,
                                 shadowOffsetY: -10,*/
                            },
                            emphasis:{
                                color:'#d7c0ff'
                            }
                        },
                    },
                    {
                        value:dataAll.failed,
                        name:'支付失败',
                        itemStyle:{
                            normal:{
                                color:'#00d1f0',
                                shadowColor: '#00d1f0',
                                /* shadowBlur: 10,
                                 shadowOffsetX: 10,
                                 shadowOffsetY: -10,*/
                            },
                            emphasis:{
                                color:'#2ee3fe'
                            }
                        },
                    },
                ]
            },
            {
                name:'支付来源',
                type:'pie',
                radius: ['46%', '65%'],
                avoidLabelOverlap:false,
                labelLine: {
                    normal: {
                        show: true,
                        length:10,
                        length2:15,
                    }
                },
                data:[
                    {
                        value:dataEvery.zfb,
                        name:'支付宝支付' + fFixed(dataEvery.zfb/dataAll.success),
                        itemStyle:{
                            normal:{
                                color:'#288dff',
                                shadowColor: '#3ea6ff',
                                /* shadowBlur: 10,
                                 shadowOffsetX: 10,
                                 shadowOffsetY: -10,*/
                            },
                            emphasis:{
                                color:'#5ea9fe'
                            }
                        },
                        label:{
                            normal:{
                                textStyle:{
                                    color:'#288dff'
                                }
                            },
                            emphasis:{
                                textStyle:{
                                    color:'#5ea9fe'
                                }
                            }
                        }
                    },
                    {
                        value:dataEvery.qt,
                        name:'POS机支付' + fFixed(dataEvery.qt/dataAll.success),
                        itemStyle:{
                            normal:{
                                color:'#79f7ff',
//                                shadowColor: 'rgba(94, 169, 254, 1)',
//                                shadowBlur: 100
                            },
                            emphasis:{
                                color:'#a9faff'
                            }
                        },
                        label:{
                            normal:{
                                textStyle:{
                                    color:'#79f7ff'
                                }
                            },
                            emphasis:{
                                textStyle:{
                                    color:'#a9faff'
                                }
                            }
                        }
                    },
                    {
                        value:dataEvery.wx,
                        name:'微信支付' + fFixed(dataEvery.wx/dataAll.success),
                        itemStyle:{
                            normal:{
                                color:'#18e9ad',
//                                shadowColor: 'rgba(94, 169, 254, 1)',
//                                shadowBlur: 100
                            },
                            emphasis:{
                                color:'#6fffd6'
                            }
                        },
                        label:{
                            normal:{
                                textStyle:{
                                    color:'#18e9ad'
                                }
                            },
                            emphasis:{
                                textStyle:{
                                    color:'#6fffd6'
                                }
                            }
                        }
                    },
                    {
                        value:dataEvery.xj,
                        name:'现金支付'+ fFixed(dataEvery.xj/dataAll.success),
                        itemStyle:{
                            normal:{
                                color:'#ffae3a',
//                                shadowColor: 'rgba(94, 169, 254, 1)',
//                                shadowBlur: 100
                            },
                            emphasis:{
                                color:'#ffc571'
                            }
                        },
                        label:{
                            normal:{
                                textStyle:{
                                    color:'#ffae3a'
                                }
                            },
                            emphasis:{
                                textStyle:{
                                    color:'#ffc571'
                                }
                            }
                        }
                    },
                    {
                        value:dataEvery.qt,
                        name:'其他'+fFixed(dataEvery.qt/dataAll.success),
                        itemStyle:{
                            normal:{
                                color:'#f5533d',
//                                shadowColor: 'rgba(94, 169, 254, 1)',
//                                shadowBlur: 100
                            },
                            emphasis:{
                                color:'#ff7e6d'
                            }
                        },
                        label:{
                            normal:{
                                textStyle:{
                                    color:'#f5533d'
                                }
                            },
                            emphasis:{
                                textStyle:{
                                    color:'#ff7e6d'
                                }
                            }
                        }
                    }
                ]
            }
        ]
    };
    myChart.setOption(option);
}
function fBarChart(id,color,data) {

    var charts = document.getElementById(id);
    var myChart = echarts.init(charts);
    var option = {
        grid: {
            left: -15,
            right: 10,
            top:0,
            bottom: -10,
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                data : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],
                show:false
            }
        ],
        yAxis : [
            {
                type : 'value',
                max:750,
                min:0,
                show:true,
                splitLine:false,
            }
        ],
        series : [
            {
                name:'直接访问',
                type:'bar',
                barWidth: '5',
                itemStyle:{
                    normal:{
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 1,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: color[0].top // 0% 处的颜色
                            }, {
                                offset: 1, color: color[0].bottom // 100% 处的颜色
                            }],
                            //globalCoord: false // 缺省为 false
                        }
                    }
                },
                data:data
            }
        ]
    };
    myChart.setOption(option);
}

/**
 * fGetPosition 获取坐标数组
 * @param data 门店坐标对象
 * @returns {Array} 门店坐标数组
 */
function fGetPosition(data) {
    var aChinaPosition = [];
    $.each(data, function(key, val) {
        var obj = {};
        obj.name = key;
        obj.value = val;
        aChinaPosition.push(obj);
    });
    return aChinaPosition
}

/**
 * fValAndPosition 获取绘图所用坐标对应的门店交易值
 * @param position 带坐标的门店数据
 * @param val      带交易量的数据
 * @returns {Array} 对应门店的数据
 */
function fValAndPosition(position,val) {
    var aValAndPosition = [];
    for(let i=0;i<position.length;i++){
        var obj = {};
        obj.name = position[i].name;
        obj.value = val[i].success;
        aValAndPosition.push(obj);
    }
    return aValAndPosition
}

/**
 * fRandomBarData 获取随机数据
 * @param num  随机数据范围
 * @param val  最小数据值
 * @returns {Array} 16个数据的数组
 */
function fRandomBarData(num,val) {
    var arr = [];
    for (let i=0;i<16;i++){
        arr[i] = (Math.random() * num).toFixed(0)/1 +val;
    }
    return arr;
}

function fFixed(num) {
    var n = num*100;
    n = n.toFixed(2) + "%";
    return "("+n+")";
}

//滑动列表装填数据
function fStore(data) {
    var aArrBig = fSetArray(50,30).sort(function(a,b){return a<b?1:-1});//从大到小排序
    var aArrSmall = fSetArray(40,40).sort(function(a,b){return a>b?1:-1});//从小到大排序
    var aArrSmallP = fSetArrayP(50,30).sort(function(a,b){return a>b?1:-1});//从小到大排序
    for(let i=0,len=20;i<len;i++){
        $($(".tab1_name")[i+10]).text(data[i].name);
        $($(".tab1_val")[i+10]).text( aArrBig[i] );
        $($(".tab2_name")[i+10]).text(data[i+20].name);
        $($(".tab2_val")[i+10]).text( aArrSmall[i] );
        $($(".tab2_P")[i+10]).text( aArrSmallP[i] );
    }
    console.log(data)
}
/**
 * fSetArray   门店随机数组（得分／交易量）
 * @param val1 随机范围
 * @param val2 最小值
 * @returns {Array}
 */
function fSetArray(val1,val2) {
    var arr = [];
    for(let i=0;i<20;i++){
        arr[i] = (Math.random() * val1).toFixed(0)/1+val2;
    }
    return arr;
}
//门店随机数组可用率
function fSetArrayP() {
    var arr = [];
    for(let i=0;i<20;i++){
        arr[i] = (Math.random() * 40).toFixed(0)/1+40 +'%';
    }
    return arr;
}

//曲线图随机数据
function fLineArr() {
    var arr = [];
    for(let i=0;i<7;i++){
        arr[i] = (Math.random() * 60).toFixed(0)/1+20;
    }
    return arr;
}