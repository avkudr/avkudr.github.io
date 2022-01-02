---
layout: article
title: 'Measurement uncertainty'
tags: Kalman Guassian
show_edit_on_github: false
mathjax: true
mathjax_autoNumber: true
show_tags: true
highcharts: true
show_subscribe: true
modify_date: 2019-12-08

private_nbTries_: 20
---

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lorem ex, vulputate ut vestibulum sit amet, dignissim ut dolor. Fusce venenatis sit amet tortor sit amet porttitor. Aliquam posuere luctus lorem id finibus. Curabitur ultrices vulputate nulla mattis luctus. Nunc ligula urna, porttitor id tortor sed, consectetur ultrices ipsum. Vestibulum eleifend a libero posuere congue. Morbi non finibus quam. Etiam accumsan pharetra tellus, non iaculis nisi laoreet id. Praesent ut semper tellus. Curabitur placerat luctus turpis, id rutrum elit posuere a. Proin quam nunc, vestibulum eget elementum ac, viverra eu dolor.

<!--more-->

Quisque tincidunt nisi quis fermentum finibus. Praesent fringilla ullamcorper maximus. Pellentesque rhoncus mattis neque, sed egestas massa gravida in. Cras maximus finibus odio et mollis. Vestibulum lobortis lorem a metus volutpat, in accumsan dui hendrerit. In vel turpis enim. Vivamus eros ante, gravida in elit eget, congue convallis eros. Sed accumsan tortor nec porttitor commodo. Nullam ullamcorper augue odio, et imperdiet velit hendrerit in. Nullam risus ante, posuere nec imperdiet eget, pulvinar feugiat metus. Proin justo augue, dapibus vitae augue sed, malesuada accumsan lectus. Etiam ante lacus, tempor non tortor at, dignissim cursus erat. In hac habitasse platea dictumst.

When $$a \ne 0$$, there are two solutions to $$ax^2 + bx + c = 0$$ and they are

$$x_1 = {-b + \sqrt{b^2-4ac} \over 2a}$$

$$x_2 = {-b - \sqrt{b^2-4ac} \over 2a} \notag$$

#### Number of heads after {{ page.private_nbTries_ }} coin flips

<input type="btnBlue" onclick="simulateGauss(50)"   value="Run 50 times"   readonly="readonly"/>
<input type="btnBlue" onclick="simulateGauss(5000)" value="Run 5000 times" readonly="readonly"/>
<div id="gaussSimulation" style="width:100%; height:400px;"></div>
<script>
{
  var nbTries = {{ page.private_nbTries_ }};
  var data = new Array(nbTries+1).fill(0);
  var labels = new Array(nbTries+1).fill(0);
  for (var i = 0; i < nbTries+1; i++) labels[i] = i;

  var headerPostFix = "/" + nbTries + " flipping heads";
  var myChart = Highcharts.chart('gaussSimulation', {
    chart: {
      type: 'column'
    },
    title: {
      text:''
    },
    credits: {
      enabled: false
    },
    xAxis: {
      categories: labels,
      gridLineWidth: 1,
    },
    yAxis: {
      min: 0,
      gridLineWidth: 1,
      title: {
        text: 'Number of experiments'
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:12px">{point.key}' + headerPostFix + '</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">Number of outcomes: </td>' +
        '<td style="padding:0"><b>{point.y:.0f}</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    },
    plotOptions: {
      column: {
        pointPadding: 0.01,
        borderWidth: 1
      }
    },
    series: [{
      name: 'Number of heads',
      data: data,
      color: '#5bc0de'
    }]
  });

  function runSimulation(nTimes) {
    var out = 0;
    for (var i = 0; i < nbTries; i++) {
      var heads = Math.random() >= 0.5;
      if (heads) out++;
    }
    return out;
  }

  function simulateGauss(nbRuns) {
    data = new Array(nbTries+1).fill(0);
    for (var i = 0; i < nbRuns; i++) {
      var res = runSimulation(nbTries);
      data[res]++;
    }
    var yMax = (nbRuns == 50) ? 15 : 1250;
    myChart.series[0].setData(data);
    myChart.yAxis[0].update({
      max: yMax
    })
    myChart.redraw();
  }

  simulateGauss(5000)
  }
</script>


