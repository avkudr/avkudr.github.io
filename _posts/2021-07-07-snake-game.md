---
layout: article
title: Snake game for Vim learners
tags: Vim JavaScript
show_edit_on_github: false
mathjax: true
mathjax_autoNumber: true
mermaid: true
show_tags: true
modify_date: 2021-07-17
---

Minimalisic snake game for Vim learners: instead of using arrows you have to use h,j,k,l for navigating. If you use vimium plugin, make sure that it is disabled on this page.

<canvas id="snake_game" width="300" height="300"></canvas>
<style>
canvas {
    padding-left: 0;
    padding-right: 0;
    margin-left: auto;
    margin-right: auto;
    display: block;
    border:1px solid #d3d3d3;
    background-color: #f1f1f1;
}
</style>
<script src="/assets/js/snake_game.js"></script>
<script>startGame();</script>


