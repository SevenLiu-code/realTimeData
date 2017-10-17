var datas = null; // 实时数据
var pie_city_num = null, pie_lm_num = null, pie_member_num = null, pie_credit_money = null; // 团队任务
var service_data = [2, 2.3, 2.6, 3.4, 4.2, 4.1, 3.9, 4.0, 2.9]; // 车友服务模拟数据
function requestData() {
    $.ajax({
      type: "POST",
      dataType: "jsonp",
      jsonp: "callback",
      cache: false,
      url: "http://bns.beierniu.com/monitor",
      cache: false,
      timeout: 8000,
      success: function(data) {
        datas = data;
        $('#car_num').countDown(data['car_num']);
        $('#deal_car_num').countDown(data['deal_car_num']);
        $('#deal_car_money').countDown(data['deal_car_money']);
        // 已开运营商数据更新
         pie_city_num.series[0].setData([
            {
              name: '已运营商',
              color: 'green',
              y: data.city_num
            },
            {  name:'距目标还差',
               y: 100 - data.city_num,
               color: '#0bb5ec'
             }
           ]);
           $("#city_num_data").countDown(data.city_num);
        // 已开联盟店数据更新
         pie_lm_num.series[0].setData([
           {
               name: '已开门店',
               color: 'green',
               y: data.lm_num
           },
           {  name:'距目标还差',
              y: 5000 - data.lm_num,
              color: '#f8bd00'
            }
          ]);
          $("#lm_num_data").countDown(data.lm_num);
        // 已注册人数数据更新
         pie_member_num.series[0].setData([
            {
                name: '已在注册人数',
                color: 'green',
                y: data.member_num
            },
            {  name:'距目标还差',
               y: 100000 - data.member_num,
               color: '#e42789'
             }
         ]);
         $("#member_num_data").countDown(data.member_num);
        // 金融服务数据更新
         pie_credit_money.series[0].setData([
           {
               name: '使用额度',
               color: '#c22885',
               y: data.use_money,
               sliced: true,
               selected: true
           },
           {  name:'剩余额度',
              y: data.credit_money - data.use_money,
              color: '#8db217'
            }
          ]);
         $("#credit_money_data").countDown(data.use_money);
         pie_credit_money.setTitle({text: data.credit_money + ' 万'}); //动态设置标题
        // 一秒后继续调用本函数
         setTimeout(requestData, 60000);
       },
      error: function(){
         alert('网络错误，请检查网络连接');
      }
    });
  }
function getLangDate(){
  var dateObj = new Date(); //表示当前系统时间的Date对象
  var year = dateObj.getFullYear(); // 当前系统时间年份
  var month = dateObj.getMonth() + 1; // 当前系统时间的月份
  var date = dateObj.getDate(); //当前系统时间的月份中的日
  var hour = dateObj.getHours(); //当前系统时间的小时值
  var minute = dateObj.getMinutes(); //当前系统时间的分钟值
  var second = dateObj.getSeconds(); //当前系统时间的秒钟值
  //如果月、日、小时、分、秒的值小于10，在前面补0
  if(month<10){
    month = "0"+month;
  }
  if(date<10){
  date = "0"+date;
  }
  if(hour<10){
  hour = "0"+hour;
  }
  if(minute<10){
  minute = "0"+minute;
  }
  if(second<10){
  second = "0"+second;
  }
  var newDate = year+"年"+month+"月"+date+"日"+"<br>"+hour+":"+minute+":"+second;
  document.getElementById("mytime").innerHTML = newDate;
}

$(function(){
  getLangDate()
  setInterval("getLangDate()",1000);
  $('#city_num').highcharts({
    chart: {
        width: 400,
        height: 400,
        plotBackgroundColor: 'transparent',
        backgroundColor: 'rgba(0,0,0,0)',
        plotBorderWidth: null,
        plotShadow: false,
        spacing : [10, 0 , 0, 0]
    },
    subtitle: {
      floating: true,
      text: "目标",
      style: { 'color': '#fff', 'font-size': '18px'},
      y: 184
    },
    title: {
        floating: true,
        useHTML: true,
        style: { 'color': '#0bb5ec', 'font-family': '微软雅黑',
                'font-weight': 700, 'font-size': '24px' },
        text: '100家'
    },
    tooltip: {
        enabled: false
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: false,
              //  format: '    {point.percentage:.0f}<b> 家</b>',
              format: '    {y}<b> 家</b>',
                style: {
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'green',
                    fontSize: '22px'
                }
            },
        }
    },
    series: [{
        type: 'pie',
        size: 160,
        innerSize: '65%',
        name: '运营商',
        data: [
            {
                name: '已运营商',
                color: 'green',
                y: 4
            },
            {  name:'距目标还差',
               y: 96,
               color: '#0bb5ec'
             }
        ]
    }]
    }, function(c) {
        // 环形图圆心
        var centerY = c.series[0].center[1],
            titleHeight = parseInt(c.title.styles.fontSize);
        c.setTitle({
            y: centerY + titleHeight/2 + 10
        });
        pie_city_num = c;
  });

  $('#lm_num').highcharts({
    chart: {
        width: 400,
        height: 400,
        plotBackgroundColor: 'transparent',
        backgroundColor: 'rgba(0,0,0,0)',
        plotBorderWidth: null,
        plotShadow: false,
        spacing : [10, 0 , 0, 0]
    },
    subtitle: {
      floating: true,
      text: "目标",
      style: { 'color': '#fff', 'font-size': '18px'},
      y: 184
    },
    title: {
        floating: true,
        useHTML: true,
        style: { 'color': '#f8bd00', 'font-family': '微软雅黑',
                'font-weight': 700, 'font-size': '24px' },
        text: '5000家'
    },
    tooltip: {
        enabled: false
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: false,
                format: '    {y}<b> 家</b>',
                style: {
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'green',
                    fontSize: '22px'
                }
            },
        }
    },
    series: [{
        type: 'pie',
        size: 160,
        innerSize: '65%',
        name: '联盟店',
        data: [
            {
                name: '已开门店',
                color: 'green',
                y: 135
            },
            {  name:'距目标还差',
               y: 4865,
               color: '#f8bd00'
             }
        ]
    }]
    }, function(c) {
        // 环形图圆心
        var centerY = c.series[0].center[1],
            titleHeight = parseInt(c.title.styles.fontSize);
        c.setTitle({
            y: centerY + titleHeight/2 + 10
        });
        pie_lm_num = c;
  });

  $('#member_num').highcharts({
    chart: {
        width: 400,
        height: 400,
        plotBackgroundColor: 'transparent',
        backgroundColor: 'rgba(0,0,0,0)',
        plotBorderWidth: null,
        plotShadow: false,
        spacing : [10, 0 , 0, 0]
    },
    subtitle: {
      floating: true,
      text: "目标",
      style: { 'color': '#fff', 'font-size': '18px'},
      y: 184
    },
    title: {
        floating: true,
        useHTML: true,
        style: { 'color': '#e42789', 'font-family': '微软雅黑',
                'font-weight': 700, 'font-size': '24px' },
        text: '100000'
    },
    tooltip: {
        enabled: false
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: false,
                format: '    {y}<b> 人</b>',
                style: {
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'green',
                    fontSize: '22px'
                }
            },
        }
    },
    series: [{
        type: 'pie',
        size: 160,
        innerSize: '65%',
        name: '注册量',
        data: [
            {
                name: '已在注册人数',
                color: 'green',
                y: 403
            },
            {  name:'距目标还差',
               y: 99596,
               color: '#e42789'
             }
        ]
    }]
    }, function(c) {
        // 环形图圆心
        var centerY = c.series[0].center[1],
            titleHeight = parseInt(c.title.styles.fontSize);
        c.setTitle({
            y: centerY + titleHeight/2 + 10
        });
        pie_member_num = c;
  });

  $('#pie_credit_money').highcharts({
    chart: {
        width: 420,
        height: 420,
        plotBackgroundColor: 'transparent',
        backgroundColor: 'rgba(0,0,0,0)',
        plotBorderWidth: null,
        plotShadow: false,
        spacing : [10, 0 , 0, 0]
    },
    subtitle: {
      floating: true,
      text: "授信总额",
      style: { 'color': '#fff', 'font-size': '18px'},
      y: 186
    },
    title: {
        floating: true,
        useHTML: true,
        style: { 'color': '#d9dfe9', 'font-family': '微软雅黑',
                'font-weight': 700, 'font-size': '28px' },
        text: '8080万'
    },
    tooltip: {
        enabled: false
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: false,
                connectorWidth: 2,
                format: '    {y}<b> 万</b>',
                style: {
                    color: '#c22885',
                    fontSize: '20px'
                }
            },
        }
    },
    series: [{
        type: 'pie',
        size: 200,
        innerSize: '65%',
        name: '授信额度',
        data: [
            {
                name: '使用额度',
                color: '#c22885',
                y: 2000,
                sliced: true,
                selected: true
            },
            {  name:'剩余额度',
               y: 3000,
               color: '#8db217'
             }
        ]
    }]
    }, function(c) {
        // 环形图圆心
        var centerY = c.series[0].center[1],
            titleHeight = parseInt(c.title.styles.fontSize);
        c.setTitle({
            y: centerY + titleHeight/2 + 10
        });
        pie_credit_money = c;
  });
// 车友服务
  $('#service_order_num').highcharts({
      chart: {
          type: 'area',
          spacingBottom: 0,
          backgroundColor: 'transparent'
      },
      title: {
          text: '倍儿牛电商2017年月成交量走势图',
          style: { 'color': '#f5f5f7', 'font-size': '16px' }
      },
      legend: {
          layout: 'vertical',
          align: 'left',
          verticalAlign: 'top',
          x: 10,
          y: 10,
          floating: true,
          borderWidth: 1,
          backgroundColor: '#FFFFFF',
          enabled: false
      },
      xAxis: {
          tickWidth: 1,
          lineWidth: 2,
          tickAmount: 11, //
          lineColor: '#5187e3', // 轴线颜色
          tickColor: '#5187e3',
          tickPixelInterval: 20,
          categories: ['1月', '2月', '3月', '4月', '5月', '6月', '8月', '9月', '10月'],
          labels: {
            padding: 1,
            distance: 10,
            step: 1,
            style: { 'color': '#f5f5f7', 'font-size': '14px' }
          }
      },
      yAxis: {
          tickWidth: 1,
          tickColor: '#5187e3',
          tickAmount: 6,
          lineColor: '#5187e3',
          lineWidth: 2,
          gridLineColor: '#555',
          gridLineDashStyle: 'ShortDot',
          title: {
            text: ''
          },
          plotLines: [
            {
              color: '#5187e3'
            }
          ],
          // categories: ['1万', '2万', '3万', '4万','5万','6万'],
          labels: {
            style: { 'color': '#f5f5f7', 'font-size': '14px' },
              formatter: function () {
                  return this.value + "万";
              }
          }
      },
      tooltip: {
          formatter: function () {
              return '<b>' + this.series.name + '</b><br/>' +
                  this.x + ': ' + this.y;
          }
      },
      plotOptions: {
          area: {
              fillOpacity: 0.5,
              color: 'rgba(160,36,119,.8)',
              lineColor: '#0082ce'
          }
      },
      credits: {
          enabled: false
      },
      series: [{
          name: '各月销量',
          data: service_data
      }]
  });
    requestData()
})
