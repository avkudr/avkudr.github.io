---
layout: article
title: Projects
article_header:
  type: overlay
  height: 100px
  theme: dark
  background_color: '#203028'
  background_image:
    gradient: 'linear-gradient(-45deg, rgba(0,64,133, .6), rgba(202,68,235, .4))'
    src: /assets/images/home/cover3.jpg
---

Programming is my major geeky passion. Here you can find my modest contribution to the open source community. You can also check some of my research projects [here](https://avkudr.github.io/portfolio).

## VISA: Visp Simulation App

*Website*: [https://github.com/avkudr/visa](https://github.com/avkudr/visa)

*Language*: JavaScript (99%), HTML, CSS

**VISA** is a generic simulation platform for robotics and computer vision applications.

<div style="text-align:center"><img src="/assets/images/projects/visa_screenshot.png" alt="VISA screenshot" style="width: 90%"></div>

The simulator works with 3D scenes that can contain different objects such as: static objects, robots, and cameras. Static objects are simple 3D model files with the extensions: *stl*, *obj* or *dae*. These 3D models are static during simulation.

**Robots** are the second type of scene elements. Currently, the simulator supports one continuum robot (concentric tube robot) with deformable parts. In addition, the app comes with two serial robots: [KUKA iiwa](https://www.kuka.com/en-de/products/robot-systems/industrial-robots/lbr-iiwa) and [Viper650](http://www.ia.omron.com/products/family/3519/). It is worth noting, that any user can easily add a new serial robot: all you need to do is to provide forward kinematics model and files with 3D models of robot links.

The platform offers two mechanisms for controlling robots during the simulation. First, you can execute commands through a small menu located at the top-right corner of the page. Or you can control your robot using a TCP-IP protocol as VISA app acts like a server.

The last type of model object is cameras. VISA enables placing a virtual camera anywhere in the scene. First of all, the camera may have a fixed position in space. Alternatively, it can be positioned in relation to another objection. For example, it can be placed on the robot’s end-effector. This way the camera will follow the robot’s movements. The image can be obtained using TCP-IP protocol. Currently, we are working on a pull request to add an adapter class between simulator and visual servoing library [ViSP](https://visp.inria.fr/en/).

## robest: robust estimation library

*Website*: [https://github.com/avkudr/robest](https://github.com/avkudr/robest)

*Language*: C++

**robest** is a lightweight C++ library of robust estimators such as RANSAC or LMEDS. It helps solving issues with model fitting to noisy data containing outliers. We used these algorithms for finding a fundamental matrix of two images taken with affine cameras. You can take a look at the code [here](https://github.com/avkudr/affine-rectification).