/*!
 *
 * Copyright 2015 
 * 
 * rewrited by Zhangdi(zhangdiwaa@163.com) and Hanyuping(yuping0713@126.com)
 */
$(function() {

  $('.dynamicsparkline').sparkline([10, 8, 5, 7, 5, 4, 1, 10, 8, 12, 7, 7, 4, 5, 8, 8, 7, 7, 11, 5, 9, 12, 7, 7, 4, 5, 8, 8], {
    type: 'line',
    lineColor: '#89b1e4',
    fillColor: '#d7e8fc'
  });

  $('.dynamicbars').sparkline([5, 6, 7, 2, 0, -4, -2, 4, 1, 10, 8, 12, 7, -2, 4, 8], {
    type: 'bar',
    barColor: '#89b1e4',
    negBarColor: '#c76868'
  });

  $(".knob").knob({
    thickness: '.05',
    font: "Open Sans",
    bgColor: "#f3eee7",
    readOnly: true
  });

  Morris.Donut({
    element: 'searchChart1',
    data: [
      {label: '男', value: 66 },
      {label: '女', value: 34 }
    ],
    colors: ["#3498db", "#34495e"],
    formatter: function (y) { return y + "%" }
  }); 

  Morris.Donut({
    element: 'searchChart2',
    data: [
      {label: '<30岁', value: 21 },
      {label: '30~50岁', value: 34 },
      {label: '50~70岁', value: 31 },
      {label: '>70岁', value: 14 }
    ],
    colors: ["#9b59b6", "#34495e", "#1abc9c", "#95a5a6"],
    formatter: function (y) { return y + "%" }
  }); 

  Morris.Donut({
    element: 'searchChart3',
    data: [
      {label: '样本库一', value: 21 },
      {label: '样本库二', value: 34 },
      {label: '样本库三', value: 45 }
    ],
    colors: ["#34495e", "#1abc9c", "#95a5a6"],
    formatter: function (y) { return y + "%" }
  }); 

  var morris_area_options = {
    element: "areachart",
    behaveLikeLine: true,
    data: [
      {
        x: "2011-01",
        y: 15,
        z: 7
      }, {
        x: "2011-02",
        y: 26,
        z: 4
      }, {
        x: "2011-03",
        y: 21,
        z: 18
      }, {
        x: "2011-04",
        y: 32,
        z: 18
      }, {
        x: "2011-05",
        y: 15,
        z: 7
      }, {
        x: "2011-06",
        y: 26,
        z: 4
      }, {
        x: "2011-07",
        y: 18,
        z: 14
      }, {
        x: "2011-08",
        y: 36,
        z: 11
      }, {
        x: "2011-09",
        y: 15,
        z: 12
      }, {
        x: "2011-10",
        y: 26,
        z: 4
      }, {
        x: "2011-11",
        y: 28,
        z: 11
      }, {
        x: "2011-12",
        y: 36,
        z: 14
      }
    ],
    xkey: "x",
    ykeys: ["y", "z"],
    labels: ["Y", "Z"],
    lineColors: ["#f9c1c1", "#c1daf9", "#3498db", "#2c3e50", "#1abc9c", "#34495e", "#9b59b6", "#e74c3c"]
  };

  Morris.Area(morris_area_options);

  Morris.Bar({
    element: 'topsellers_barchart',
    data: [
      {device: '3G', geekbench: 137},
      {device: '3GS', geekbench: 275},
      {device: '4', geekbench: 380},
      {device: '4S', geekbench: 655},
      {device: '5', geekbench: 1571}
    ],
    xkey: 'device',
    ykeys: ['geekbench'],
    labels: ['Geekbench'],
    barRatio: 0.4,
    xLabelAngle: 35,
    hideHover: 'auto'
  });


  var tax_data = [
    {"period": "2012 Q3", "licensed": 3407, "sorned": 660},
    {"period": "2012 Q1", "licensed": 2800, "sorned": 629},
    {"period": "2011 Q2", "licensed": 2700, "sorned": 618},
    {"period": "2010 Q4", "licensed": 3100, "sorned": 650},
    {"period": "2009 Q4", "licensed": 3600, "sorned": 900},
    {"period": "2008 Q4", "licensed": 2200, "sorned": 681},
    {"period": "2007 Q4", "licensed": 1800, "sorned": 620},
  ];
  Morris.Line({
    element: 'linechart',
    data: tax_data,
    xkey: 'period',
    ykeys: ['licensed', 'sorned'],
    labels: ['Licensed', 'Off the road']
  });


  $('.advanced-pie').each(function( index ) {
    var barColor = $(this).data('barColor')
    var size = $(this).data('size')
    $(this).easyPieChart({
      barColor: barColor,
      scaleColor: "#BFBDB7",
      trackColor: false,
      size: size
    });
  });

});