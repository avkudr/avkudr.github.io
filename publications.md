---
layout: article
title: Publications
article_header:
  type: overlay
  height: 100px
  theme: dark
  background_color: '#203028'
  background_image:
    gradient: 'linear-gradient(-45deg, rgba(0,64,133, .6), rgba(202,68,235, .4))'
    src: /assets/images/home/cover3.jpg
---

### PhD thesis

{% bibliography --file _refs.bib -q @phdthesis %}

### Academic journals

{% bibliography --file _refs.bib -q @article %}

### Conference proceedings

{% bibliography --file _refs.bib -q @inproceedings %}

<!-- 

<li><div class="text-justify"><span id="tamadazte2018laser"><div class="csl-block"><b>Laser Beam Steering Along 3D Paths</b></div><div class="csl-block">B. Tamadazte, R. Renevier, J.-A. Seon, A.V. Kudryavtsev, N. Andreff</div><span style="vertical-align: baseline"><i>IEEE/ASME Transactions on Mechatronics</i></span>, <span style="font-style: normal">2018</span>.</span></div><input id="bibtexbutton" type="button" onclick="toggleBibtextamadazte2018laser()" value="bibtex ▼" readonly="readonly"><div style="display:inline-block; width: 30px;"></div><a href="https://avkudr.github.io/assets/articles/tamadazte2018laser.pdf"><input type="btnBibGreen" value="pdf" readonly=""></a> <a href="https://www.youtube.com/watch?v=lLZ_wbJpeJA"><input type="btnBibOrange" value="video" readonly=""></a><div id="atamadazte2018laser" style="display: block; font-size: 10px;"><pre style="font-size: 13px;">@article{tamadazte2018laser,
  title = {Laser Beam Steering Along 3D Paths},
  author = {Tamadazte, Brahim and Renevier, Rupert and Seon, Jean-Antoine and Kudryavtsev, Andrey V and Andreff, Nicolas},
  journal = {IEEE/ASME Transactions on Mechatronics},
  year = {2018},
  publisher = {IEEE}, 
  pdf = {https://avkudr.github.io/assets/articles/tamadazte2018laser.pdf},
  video = {https://www.youtube.com/watch?v=lLZ_wbJpeJA}
}
</pre></div><p></p><script> function toggleBibtextamadazte2018laser(parameter) { var x= document.getElementById('atamadazte2018laser'); if (x.style.display === 'none') { x.style.display = 'block'; } else { x.style.display = 'none'; } } </script></li> 

-->
