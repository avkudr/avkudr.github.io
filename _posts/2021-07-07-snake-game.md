---
layout: article
title: Snake game for vim learners
tags: vim
show_edit_on_github: false
mathjax: true
mathjax_autoNumber: true
mermaid: true
show_tags: true
modify_date: 2021-07-17
---

Minimalisic snake game for Vim learners: instead of using arrows you have to use h,j,k,l for navigating. If you use vimium plugin, make sure that it is disabled on this page.

Navigation: `[h]` left, `[j]` down, `[k]` up, `[l]` right

Speed: `[-]` slower, `[0]` reset speed, `[+]` faster

<!--more-->

<a class="button button--primary button--rounded button--sm" onclick="speedReset()">reset</a>
<a class="button button--primary button--rounded button--sm" onclick="speedSlower()">slower</a>
<a class="button button--primary button--rounded button--sm" onclick="speedFaster()">faster</a>

<canvas id="snake_game" width="300" height="300">
</canvas>

A slightly more advanced version can be found on [vimsnake.com](https://vimsnake.com/). There, the snake can change directions and eat food only in insert mode.

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


