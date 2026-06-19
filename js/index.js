const track=document.getElementById("carouselTrack");
const dotsBox=document.getElementById("dots");
const slides=document.querySelectorAll(".carousel img");
let current=0;

slides.forEach((_,i)=>{
  const b=document.createElement("button");
  b.onclick=()=>{current=i;paint()};
  dotsBox.appendChild(b);
});

function paint(){
  track.style.transform=`translateX(-${current*100}%)`;
  document.querySelectorAll(".dots button").forEach((b,i)=>b.classList.toggle("active",i===current));
}
setInterval(()=>{current=(current+1)%slides.length;paint()},3500);
paint();
