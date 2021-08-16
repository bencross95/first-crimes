
// False memories hover

var fmhover = document.getElementById("fm-hover");


fmhover.addEventListener("mouseover", fmmouseover, false);
fmhover.addEventListener("mouseout", fmmouseout, false);


function fmmouseover()
{
   document.querySelector("#fm-shape > path").style.fill='#D7FA6E';
}

function fmmouseout()
{
   document.querySelector("#fm-shape > path").style.fill='#BFC0BC';
}


// Rules of engagement hover

var roehover = document.getElementById("roe-hover");


roehover.addEventListener("mouseover", roemouseover, false);
roehover.addEventListener("mouseout", roemouseout, false);


function roemouseover()
{
   document.querySelector("#roe-shape > path").style.fill='#D7FA6E';
}

function roemouseout()
{
   document.querySelector("#roe-shape > path").style.fill='#BFC0BC';
}
