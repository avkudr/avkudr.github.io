---
layout: article
title: 'Background to Kalman filter: normal distribution'
tags: Kalman normal-distribution
show_edit_on_github: false
mathjax: true
mathjax_autoNumber: false
show_tags: true
highcharts: true
nouislider: true
show_subscribe: true
modify_date: 2022-01-02
private_nbTries_: 20
comments: true
---

Let's say we want to know the altitude of the drone we are flying. On one hand, our drone has a pressure sensor that allows us to measure the altitude. On the other hand, we know the altitude of the drone a second ago and the thrust produced by propellers, so the current altitude can be calculated from it. The question is how to combine these data to get one more accurate result, and often the answer is to use a Kalman filter. Kalman filter can provide an optimal estimate given a model and a measurement in the form of a normal (aka Gaussian) distribution. In this article, I will try to explain why normal distribution works and how it gives Kalman filter its superpower.   

<!--more-->

![header image with a drone](/assets/blog/gaussian/article_klman_image.jpg)

### Accepting the uncertainty

As you most certainly know, the world isn't perfect. Every time you measure something, you never get the true value because every measuring device has an uncertainty that defines its quality. 
One of the most common ways to define the measuring uncertainty is to use a plus-minus sign. We could say that the drone is flying at *15* ± *5* m above the ground. What does this say about the true value of the altitude? It can be either *12*, *19*, *15*, or *13.486*. All of these values are equally likely. In probability theory, this case is described by a **uniform distribution**. 

<!-- It may also be referred to as rectangular distribution. In order to say that the variable $$X$$ takes its value from the uniform distribution with the range $$[a,b]$$ we will use the following notation: $$ X \sim U(a,b) $$ -->

With the uniform distribution, it is quite easy to calculate the probability that a random variable equals any particular value inside the uncertainty range (±*5* in our case). For example, the probability of the true value of the altitude to be *16* m:

$$ P(X = 16) = {1 \over {b - a}} = {1 \over {5 - (-5)}} = 0.1 = 10\%$$

<!-- The probability that a normal random variable X equals any particular value is 0. -->

At the same time, for all the values outside of our uncertainty range, the probability equals zero. 

The drawback of the uniform distribution is that it can't represent measurement uncertainty. If the sensor gives the value of 12 m you expect it to be close to this value. In other words, it is common to think that the value of 11.99 m is much more likely than the value of 10 m even knowing that the measurement uncertainty of the device is 2 m. One way to model this situation is to switch to a **normal distribution**.

### Why normal distribution?

Why not any other non-uniform distribution? The main reason for that is the central limit theorem. It states that "when independent random variables are added, their properly normalized sum tends toward a normal distribution (informally a "bell curve") even if the original variables themselves are not normally distributed" [\[wiki\]](https://en.wikipedia.org/wiki/Central_limit_theorem).

To confirm this fact, let's use a coin flip simulation. The experiment consists in the following. We toss a coin {{ page.private_nbTries_ }} times and write down the number of heads which can go from 0 to {{ page.private_nbTries_ }}. Then we repeat the experiment 50 or 5000 times. When running the experiment 50 times it is difficult to see any pattern. However, after 5000 tries we see that the graph starts to look like a bell curve which can be closely approximated by Gaussian distribution. As you've already guessed, this is one of the reasons why we assume normal distribution in the Kalman filter.

<input type="btnBlue" onclick="simulateGauss(50)"   value="Run 50 times"   readonly="readonly"/>
<input type="btnBlue" onclick="simulateGauss(5000)" value="Run 5000 times" readonly="readonly"/>
<div class="graph_responsive" id="gaussSimulation"></div>
<script>
{
  var nbTries = {{ page.private_nbTries_ }};
  var data = new Array(nbTries+1).fill(0);
  var labels = new Array(nbTries+1).fill(0);
  for (var i = 0; i < nbTries+1; i++) labels[i] = i;

  var headerPostFix = "/" + nbTries + " flipping heads";
  var myChartSimu = Highcharts.chart('gaussSimulation', {
    chart: {
      type: 'column'
    },
    title: {
      text:''
    },
    credits: {
      enabled: true
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
    },{
      name: 'Probability density function',
      type: 'spline',
      dashStyle: 'DashDot',
      color: '#1d7892',
      data: data,
      tooltip: {
        pointFormat: ""
      }
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
    myChartSimu.series[0].setData(data);
    myChartSimu.yAxis[0].update({
      max: yMax
    })
    myChartSimu.series[1].setData(data);
    myChartSimu.redraw();
  }

  simulateGauss(5000)
  }
</script>

### Properties of normal distribution

Another nice fact about normal distribution is that we need only two variables to define it: mean $$\mu$$ and variance $$\sigma^2$$. The notation is the following:

$$ X \sim \mathcal{N}(\mu,\,\sigma^{2}) $$

which says that some random variable $$X$$ follows a normal distribution with mean $$\mu$$ and variance $$\sigma^2$$.

However, to extract the probability we have to use a probability density function (PDF). And in the case of Gaussian, it has the following form:

$$
\begin{equation} \label{gaussiandistrib} 
\begin{aligned} 
f(x) = \frac{1}{\sigma\sqrt{2 \pi}}e^{ - {1\over{2}} \left ( \frac{x-\mu}{\sigma} \right )^2}
\end{aligned} 
\end{equation}
$$

One of the important properties of this function is that the total area under the curve is equal to 1. In other words, we are 100% sure that the random variable $$X$$ will take the value from the range $$(-\infty,\infty)$$; something will happen, we guarantee. Could we do better than that? What is the probability of one exact value? 

To find the probability from the probability density function, we need to find the area under the curve in the given range. In the case of one particular value, the width of the range equals zero, so the probability is also zero. It means that we can only estimate the probability in a range: $$ P(x_1 < X \leq x_2) $$.

Some interesting properties of the normal distribution:
* the probability density function is symmetric around the mean
* the probability of a variable to be in the range of $$[\mu-3\sigma,\mu+3\sigma]$$ is 99.73%
* the probability of a variable to be in the range of $$[\mu-2\sigma,\mu+2\sigma]$$ is 95.45%
* the probability of a variable to be in the range of $$[\mu-\sigma,\mu+\sigma]$$ is 68.27%
* the probability of a variable to be in the range of $$(-\infty,\mu]$$ or $$(\mu,\infty)$$ is 50.00%

<div id="double-slider"></div>
<div id="gaussProba" style="width:100%;height:400px"></div>
<script>
{
  var y = [0.001338, 0.008727, 0.044318, 0.175283, 0.539910, 1.295176, 2.419707, 3.520653, 3.989423, 3.520653, 2.419707, 1.295176, 0.539910, 0.175283, 0.044318, 0.008727, 0.001338];
  var x = [-0.400000, -0.350000, -0.300000, -0.250000, -0.200000, -0.150000, -0.100000, -0.050000, 0.000000, 0.050000, 0.100000, 0.150000, 0.200000, 0.250000, 0.300000, 0.350000, 0.400000];

  var dataXY = [];
  for (var i = 0; i < x.length; i++) dataXY.push({
    x: x[i],
    y: y[i]
  })
  var headerPostFix = "/" + nbTries + " flipping heads";
  var myChartProba = Highcharts.chart('gaussProba', {
    chart: {
      type: 'areaspline',
      animation: false
    },
    title: {
      text: ''
    },
    credits: {
      enabled: true
    },
    xAxis: {
      gridLineWidth: 1,
      min: -0.4,
      max: 0.4,
      minorTickInterval: 0.05,
      plotBands: [{
        color: 'rgb(200,0,0,0.1)', // Color value
        from: -0.2, // Start of the plot band
        to: 0.2, // End of the plot band
        zIndex: 1,
        label: {
          text: 'Plot band',
          x: -10,
          style: {
            fontSize: '0.9rem',
            fontWeight: 'bold'
          }
        }
      }],
    },
    yAxis: {
      min: 0,
      minorTickInterval: 0.5,
      gridLineWidth: 1,
      title: {
        text: 'f(x)'
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:12px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">f(x) = </td>' +
        '<td style="padding:0"><b>{point.y:.0f}</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    },
    plotOptions: {
      column: {
        pointPadding: 0.01,
        borderWidth: 1
      },
      series: {
        animation: {
          duration: 0
        }
      }
    },
    drilldown: {
      animation: {
        duration: 0
      }
    },
    series: [{
      name: 'Random variable X ~ N(0,0.1)',
      color: 'rgb(63, 184, 175,0.6)',
      data: dataXY,
      zIndex: 2
    }]
  });

  var slider = document.getElementById('double-slider');

  noUiSlider.create(slider, {
    start: [-0.2, 0.2],
    connect: true,
    step: 0.1,
    range: {
      'min': -0.4,
      'max': 0.4
    }
  });

  slider.noUiSlider.on('update', function (values, handle) {
    var sl = values[0] / 0.1;
    var sr = values[1] / 0.1;
    var P = 0;
    if (sl == sr) P = 0;
    else {
      var signL = sl / Math.abs(sl);
      var signR = sr / Math.abs(sr);

      if (Math.abs(sl) < 0.1) sl = 0;
      else if (Math.abs(sl) < 1.1) sl = signL * 68.27/2;
      else if (Math.abs(sl) < 2.1) sl = signL * 95.45/2;
      else if (Math.abs(sl) < 3.1) sl = signL * 99.73/2;
      else if (Math.abs(sl) < 4.1) sl = signL * 50;

      if (Math.abs(sr) < 0.1) sr = 0;
      else if (Math.abs(sr) < 1.1) sr = signR * 68.27/2;
      else if (Math.abs(sr) < 2.1) sr = signR * 95.45/2;
      else if (Math.abs(sr) < 3.1) sr = signR * 99.73/2;
      else if (Math.abs(sr) < 4.1) sr = signR * 50;

      P = Math.abs(sr - sl);
    }

    myChartProba.xAxis[0].plotLinesAndBands[0].options.from = parseFloat(values[0]);
    myChartProba.xAxis[0].plotLinesAndBands[0].options.to = parseFloat(values[1]);
    myChartProba.xAxis[0].plotLinesAndBands[0].label.attr({
      text: 'P(x1 < X <= x2) = ' + P.toFixed(2) + '%'
    });
    myChartProba.xAxis[0].redraw(false);
  });

  function resize() {
    document.getElementById("double-slider").style.marginLeft = myChartProba.plotBox.x + 'px';
    document.getElementById("double-slider").style.marginBottom = '10px';
    document.getElementById("double-slider").style.width = myChartProba.plotBox.width + 'px';
  }

  resize();
  window.onresize = resize;
}
</script>


### Multiple measurements

Now, let's get back to the Kalman filter and the drone example. The altitude given by our pressure sensor can be modeled as a normal distribution $$ \color{#ff8000}{\mathcal{N}_{s} (\mu_{s}, \sigma_{s}^2 )} $$ with $$s$$ for sensor; it also can be calculated given motion equations that define the model $$ \color{royalblue}{\mathcal{N}_{m} (\mu_{m}, \sigma_{m}^2 )} $$. These distributions represent probability distributions and to combine them, we need to use the probability rule of product:

$$
\begin{equation} \label{fusionformula_1} 
\begin{aligned} 
P &= \color{royalblue}{\mathcal{N}_{m} (\mu_{m}, \sigma_{m}^2 )} \cdot \color{#ff8000}{\mathcal{N}_{s} (\mu_{s}, \sigma_{s}^2 )}\\
  &= \mathcal{N} (\mu, \sigma^2 )
\end{aligned} 
\end{equation}
$$

with

$$
\begin{equation} \label{fusionformularearranged} 
\begin{aligned} 
\mu &= \frac{\sigma_s^2 \mu_m + \sigma_m^2 \mu_s} {\sigma_m^2 + \sigma_s^2}\\ 
\sigma &= \frac{\sigma_m^2 \sigma_s^2} {\sigma_m^2 + \sigma_s^2}
\end{aligned} 
\end{equation}
$$

Let's use the following graph to get the intuition behind these expressions:

| $$ \color{royalblue}{\mathcal{N}_{m}} $$ | $$ \color{#ff8000}{\mathcal{N}_{s}} $$| $$ \color{royalblue}{\mathcal{N}_{m}} \cdot \color{#ff8000}{\mathcal{N}_{s}} $$ |
|:----:|:----:|:----:|
| $$\color{royalblue}{\mu_m} = $$ <output id="mean1value"></output> <input class="slider" style="background: #70D6FF;" type="range" id="mean1"  min="2" max="8" step="0.01" value="4"   oninput="updateGauss1()"> | $$ \color{#ff8000}{\mu_s} = $$ <output id="mean2value"></output> <input class="slider" style="background: #F4E773;" type="range" id="mean2"  min="2" max="8" step="0.01" value="6"   oninput="updateGauss2()"> | $$ \mu = $$ <output id="meanRvalue"></output> |
| $$\color{royalblue}{\sigma_m} = $$ <output id="sigma1value"></output> <input class="slider" style="background: #70D6FF;" type="range" id="sigma1" min="0.2" max="2" step="0.01" value="0.25" oninput="updateGauss1()"> | $$ \color{#ff8000}{\sigma_s} = $$ <output id="sigma2value"></output> <input class="slider" style="background: #F4E773;" type="range" id="sigma2" min="0.2" max="2" step="0.01" value="0.4" oninput="updateGauss2()"> | $$ \sigma = $$<output id="sigmaRvalue"></output>|

<div id="gaussCombination" class="graph_responsive"></div>
<script>
{
  var mean1,mean2,sigma1,sigma2,mean,sigma;
  var nbPoints = 18;
  var yMin = 0;
  var yMax = 3;
  var colors = ['#70D6FF', '#F4E773', '#E56399'];
  var myChart = Highcharts.chart('gaussCombination', {
    chart: {
        type: 'areaspline',
        animation: false
    },
    title: {
        text: ''
    },
    credits: {
      enabled: true
    },
    xAxis: {
      min: 2,
      max: 8,
      gridLineWidth: 1
    },
    yAxis: {
        title: {
            text: ''
        },
        min: yMin,
        max: yMax
    },
    tooltip: {
      headerFormat: '<span style="font-size:12px">x = {point.x:.3f}</span></br>',
      pointFormat: '<span style="font-size:12px">f(x) = {point.y:.3f}</span>',
      shared: false,
      useHTML: true
    },
    plotOptions: {
      series: {
        marker: {
          enabled: false
        }
      }
    },
    navigator: {
      series: {
        label: {
          enabled: false
        }
      }
    },
    series: [{
        dashStyle: 'shortdot',
        shadow: false,
        useHTML: true,
        name: '<span id="MJXc-Node-238" class="mjx-msubsup"><span class="mjx-base" style="margin-right: -0.159em;"><span id="MJXc-Node-239" class="mjx-texatom"><span id="MJXc-Node-240" class="mjx-mrow"><span id="MJXc-Node-241" class="mjx-mi"><span class="mjx-char MJXc-TeX-cal-R" style="padding-top: 0.505em; padding-bottom: 0.354em; padding-right: 0.159em;">N</span></span></span></span></span><span class="mjx-sub" style="font-size: 100%; vertical-align: -0.212em; padding-right: 0.071em;"><span id="MJXc-Node-242" class="mjx-mn" style=""><span class="mjx-char MJXc-TeX-main-R" style="padding-top: 0.354em; padding-bottom: 0.354em;">m</span></span></span></span>',
        color: colors[0],
        data: [],
    }, {
        dashStyle: 'shortdot',
        shadow: false,
        useHTML: true,
        name: '<span id="MJXc-Node-238" class="mjx-msubsup"><span class="mjx-base" style="margin-right: -0.159em;"><span id="MJXc-Node-239" class="mjx-texatom"><span id="MJXc-Node-240" class="mjx-mrow"><span id="MJXc-Node-241" class="mjx-mi"><span class="mjx-char MJXc-TeX-cal-R" style="padding-top: 0.505em; padding-bottom: 0.354em; padding-right: 0.159em;">N</span></span></span></span></span><span class="mjx-sub" style="font-size: 100%; vertical-align: -0.212em; padding-right: 0.071em;"><span id="MJXc-Node-242" class="mjx-mn" style=""><span class="mjx-char MJXc-TeX-main-R" style="padding-top: 0.354em; padding-bottom: 0.354em;">s</span></span></span></span>',
        color: colors[1],
        data: []
    }, {
        useHTML: true,
        name: '<span id="MJXc-Node-238" class="mjx-msubsup"><span class="mjx-base" style="margin-right: -0.159em;"><span id="MJXc-Node-239" class="mjx-texatom"><span id="MJXc-Node-240" class="mjx-mrow"><span id="MJXc-Node-241" class="mjx-mi"><span class="mjx-char MJXc-TeX-cal-R" style="padding-top: 0.505em; padding-bottom: 0.354em; padding-right: 0.159em;">N</span></span></span></span></span><span class="mjx-sub" style="font-size: 100%; vertical-align: -0.212em; padding-right: 0.071em;"><span id="MJXc-Node-242" class="mjx-mn" style=""><span class="mjx-char MJXc-TeX-main-R" style="padding-top: 0.354em; padding-bottom: 0.354em;">m</span></span></span></span><span id="MJXc-Node-238" class="mjx-msubsup"><span class="mjx-base" style="margin-right: -0.159em;"><span id="MJXc-Node-239" class="mjx-texatom"><span id="MJXc-Node-240" class="mjx-mrow"><span id="MJXc-Node-241" class="mjx-mi"><span class="mjx-char MJXc-TeX-cal-R" style="padding-top: 0.505em; padding-bottom: 0.354em; padding-right: 0.159em;">N</span></span></span></span></span><span class="mjx-sub" style="font-size: 100%; vertical-align: -0.212em; padding-right: 0.071em;"><span id="MJXc-Node-242" class="mjx-mn" style=""><span class="mjx-char MJXc-TeX-main-R" style="padding-top: 0.354em; padding-bottom: 0.354em;">s</span></span></span></span>',
        lineWidth: 2,
        color: colors[2],
        data: []
    },{
      showInLegend:false, 
      name: 'mu_1',
      color: colors[0],
      type:'line',
      dashStyle: 'shortdash',
      lineWidth: 2,
      dataLabels: { 
        enabled: false,
        color:'black',
        crop:false,
        overflow:'none',
        x: 25, 
        y: 35,
        formatter: function() {
          return mean1.toFixed(2);
        }
      }
    },{
      showInLegend:false, 
      name: 'mu_2',
      color: colors[1],
      type:'line',
      dashStyle: 'shortdash',
      lineWidth: 2,
      dataLabels: { 
        enabled: false,
        color:'black',
        crop:false,
        overflow:'none',
        x: 25, 
        y: 35,
        formatter: function() {
          return mean2.toFixed(2);
        }
      }
    },{
      showInLegend:false, 
      name: 'mu_2',
      color: colors[2],
      type:'line',
      dashStyle: 'shortdash',
      lineWidth: 2,
      dataLabels: { 
        enabled: false,
        color:'black',
        crop:false,
        overflow:'none',
        x: 25, 
        y: 35,
        formatter: function() {
          return mean.toFixed(2);
        }
      }
    }]
  });

  function estimateGauss(mean,sigma){
    data = [];
    var sigmasigma2 = 2*sigma*sigma;
    var scale = 1.0/(sigma*Math.sqrt(2*Math.PI));
    for (var i = 0; i < nbPoints; ++i){
      var x = -4*sigma + mean + i*8*sigma/nbPoints;
      var y = scale * Math.exp(-Math.pow(x-mean,2)/sigmasigma2);

      data.push({
        x: x,
        y: y,
      })
    }
    return data;
  }

  function updateGauss1(){
    mean1  = parseFloat(document.getElementById("mean1").value);
    sigma1 = parseFloat(document.getElementById("sigma1").value);

    document.getElementById('mean1value').value = mean1.toFixed(3);
    document.getElementById('sigma1value').value = sigma1.toFixed(3);

    data1 = estimateGauss(mean1,sigma1);
    myChart.series[0].setData(data1,false);
    myChart.series[0].redraw(false);
    myChart.series[3].setData([{x:mean1,y:yMin},{x:mean1,y:yMax, dataLabels: { enabled: true }}],false);
    myChart.series[3].redraw(false);

    updateGaussProduct();
  }

  function updateGauss2(){
    mean2  = parseFloat(document.getElementById("mean2").value);
    sigma2 = parseFloat(document.getElementById("sigma2").value);

    document.getElementById('mean2value').value = mean2.toFixed(3);
    document.getElementById('sigma2value').value = sigma2.toFixed(3);

    data2 = estimateGauss(mean2,sigma2);
    myChart.series[1].setData(data2,false);
    myChart.series[1].redraw(false);
    myChart.series[4].setData([{x:mean2,y:yMin},{x:mean2,y:yMax, dataLabels: { enabled: true }}],false);
    myChart.series[4].redraw(false);
    updateGaussProduct();
  }

  function updateGaussProduct(){
    sigma22 = sigma2 * sigma2; 
    sigma12 = sigma1 * sigma1;
    mean = (sigma22 * mean1 + sigma12 * mean2) / (sigma22 + sigma12);
    sigma = Math.sqrt((sigma22 * sigma12) / (sigma22 + sigma12));

    document.getElementById('meanRvalue').value = mean.toFixed(3);
    document.getElementById('sigmaRvalue').value = sigma.toFixed(3);

    dataR = estimateGauss(mean,sigma);
    myChart.series[2].setData(dataR,false);
    myChart.series[2].redraw(false);
    myChart.series[5].setData([{x:mean,y:yMin},{x:mean,y:yMax, dataLabels: { enabled: true }}],false);
    myChart.series[5].redraw(false);
  }

  updateGauss1(); 
  mean1value.value = mean1.toFixed(3);
  sigma1value.value = sigma1.toFixed(3);
  updateGauss2(); 
  mean2value.value = mean2.toFixed(3);
  sigma2value.value = sigma2.toFixed(3);
}
</script>

Note that:
- the resulting distribution is also a normal distribution
- the mean of the new resulting distribution is located always "in between" the two initial means and closer to the distribution with lower variance (lower uncertainty). The lower the variance, the more we "trust" the given source of the information. 
- it has a variance smaller than each individual variance of the measurement or the model. Given more sources of information, we become more and more certain about the state of our system, the altitude of the drone

While in the example above we have only one variable, the Kalman filter often works with systems defined by many variables. Multidimensional Kalman filter involves some linear algebra but the main principle stays the same: get the information from different sources in the form of a normal distribution and then combine it to get a result with higher certainty/smaller variance. 

> **KEY TAKEAWAYS**
> 
> * Kalman filter allows combining multiple sources of information about the system to provide an optimal estimate of the system state.
> * Each piece of information needs to be presented in the form of a normal distribution defined by a mean and a variance.
> * A product of two normal distributions is also a normal distribution with smaller variance.
{:.keypoints}


<!-- 
<div id="uniformDistribution" style="width:100%; height:400px;"></div>
<script>
{
Highcharts.chart('uniformDistribution', {

  title: {
      text: 'Uniform distribution'
  },
  yAxis: {
      title: {
          text: 'Number of Employees'
      }
  },
  legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle'
  },
  credits: {
    enabled: false
  },
  series: [{
      name: 'Uniform',
      data: [
        {x:0,y:0},
        {x:10,y:0},
        {x:10,y:0.1},
        {x:15,y:0.1},
        {x:20,y:0.1},
        {x:20,y:0},
        {x:30,y:0},
      ]
  }],

  tooltip: {
    enabled:
  }
  plotOptions: {
    lineWidth: 2
  },
  responsive: {
      rules: [{
          condition: {
              maxWidth: 400,
              maxHeight: 400
          },
          chartOptions: {
              legend: {
                  layout: 'horizontal',
                  align: 'center',
                  verticalAlign: 'bottom'
              }
          }
      }]
  }
});
}
</script>

 -->
