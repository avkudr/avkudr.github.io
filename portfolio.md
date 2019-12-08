---
layout: article
title: Portfolio
article_header:
  type: overlay
  height: 100px
  theme: dark
  background_color: '#203028'
  background_image:
    gradient: 'linear-gradient(-45deg, rgba(0,64,133, .6), rgba(202,68,235, .4))'
    src: /assets/images/home/cover3.jpg
---

All the curious and challenging projects I have worked on in the past 5 years.

### Table of Contents

1. Post-doc: SLAM and medical robotics
2. PhD thesis: 3D recontsruction and robot calibration
3. Master thesis: Visual servoing for microassembly
4. Teaching experience

## Post-doc - SLAM and medical robotics
*November 2017 - October 2018*

Have you ever heard about Alzheimer’s disease? I am sure you did. Recently, scientists have discovered that there is a correlation between losing the sense of smell and Alzheimer’s disease progression.

But, in order to prove this theory, medical professionals need to inspect the olfactory bulb — a group of neurons responsible for the sense of smell. However, it is not so simple, as the bulb is positioned deeply inside the nasal cavity.

My colleagues and I are working on a special type of robot, concentric tube robot (CTR), that can perform this challenging task. I’ve developed a small demonstrator for a CTR and you can check it out at [this page](https://avkudr.github.io/visa-model-ctr/). In this project I am responsible for developing the algorithm for CTR automatic navigation: making the robot to automatically advance inside the nasal cavity without touching its walls. To accomplish this, we are using a small camera installed on the tip of the robot.

<div style="text-align:center">
<img src="/assets/images/portfolio/nemro.jpg" alt="NEMRO project" class="img-responsive center-image" style="max-width:350px; width: 90%">
</div>

## PhD thesis
*October 2014 - October 2017*

3D reconstruction in Scanning Electron Microscope
The main goal of my thesis project was to obtain a 3D model of an object using its multiple views acquired with [Scanning Electron Microscope](https://en.wikipedia.org/wiki/Scanning_electron_microscope) (SEM).

I have extensively used **3D reconstruction** — a well-known application of computer vision techniques. However, due to image formation peculiarities in SEMs, and in microscale in general, the existing techniques were not applicable to the SEM images due to the parallel projection and the problems of SEM calibration as a camera.

As a result, during this project we have developed a new algorithm enabling 3D reconstruction in SEM, while taking the stated issues into account. Moreover, as the reconstruction is obtained through camera auto-calibration, there is no need for a calibration object.

The final output of the presented techniques is a dense point cloud corresponding to the surface of the object that may contain millions of points.

<div style="text-align:center">
<img src="/assets/images/portfolio/3Dreconstruction.jpg" alt="3D reconstruction in SEM" class="img-responsive center-image" style="width: 90%">
</div>


All algorithms developed during my thesis were then included in a stand-alone software **Pollen3D**. It is written in C++ using OpenCV and Qt for GUI. The license belongs to the University of Franche-Comté.

If you are interested in obtaining that software or in collaboration in general, please contact my PhD supervisor [Dr. Sounkalo Dembélé](https://www.femto-st.fr/en/femto-people/sounkalodembele). Here’s a quick snapshot of Pollen3D:

<div style="text-align:center">
<img src="/assets/images/portfolio/window_rectification.jpg" alt="3D reconstruction in SEM" class="img-responsive center-image" style="width: 90%">
</div>

## Robot calibration in Scanning Electron Microscope

Another problem I was trying to solve during my PhD was **robot calibration inside SEM**.

Here’s the gist: the sample is placed on the robot tip and as we are working at micro- and sometimes at nano-scale, the field of view is very limited. However, in order to perform 3D reconstruction, we need several images acquired from different points of view. Typically, it means that we need to be able to rotate around the object center with micrometric precision!

To make that possible, we developed a new method that allows to calibrate the geometric parameters of a robotic structure. Final results demonstrate the precision of the order of 10 micrometers. Please, check this [article](https://avkudr.github.io/assets/articles/guelpa2018accurate.pdf) and this [video](https://www.youtube.com/watch?v=ZF4LeZxdxDs) for more details.

<div style="text-align:center">
<img src="/assets/images/portfolio/sem_inside_model.png" alt="3D reconstruction in SEM" class="img-responsive center-image" style="width: 70%">
</div>

## Master thesis - Visual servoing for microassembly
*February 2014 - September 2014*

During my master internship I was working on the automatic assembly of microcomponents. The main objective was to use visual tracking to correctly estimate the pose of microcomponent (holder: about 1 mm height). Then, to use visual servoing to insert the holder in a silicon baseplate. For more details, please check this [article](https://avkudr.github.io/assets/articles/kudryavtsev2015stereovision.pdf) and this [video](https://www.youtube.com/watch?v=UC_VDCZtpzs).

<div style="text-align:center">
<img src="/assets/images/portfolio/microassembly.png" alt="3D reconstruction in SEM" class="img-responsive center-image" style="width: 70%">
</div>

## Teaching experience
- Java programming: 138h (Level: L3, M1)
- Mircocontroller programming: 40h (Level: L3, M1)