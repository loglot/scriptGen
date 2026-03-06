var text
var script
var number = 0
var enabled=[]
var showfile=false

var output=document.getElementById("output")
var scriptinput=document.getElementById("script")
var selection=document.getElementById("selection")
import { addPondiverseButton } from "https://www.pondiverse.com/pondiverse.js";

addPondiverseButton(() => {
  return {
    type: "s3g",
    data: text,
    // image: canvas?.toDataURL("image/png"),
  };
});
import { fetchPondiverseCreation } from "https://www.pondiverse.com/pondiverse.js";

const creationParam = new URL(window.location).searchParams.get("id");
if (creationParam) {
  const creation = await fetchPondiverseCreation(creationParam);
  alert(JSON.stringify(creation))
  text=creation.data
  alert(text)
  init()
}else{
    fetch('./examples/script.s3g')
    .then(response => response.text())
    .then((data) => {
        text=(data)
        init()
    })

}
function tick(){

    requestAnimationFrame(tick)
}
function init(){
        scriptinput.style.display='none'
    enabled = []
    var Selection=""
    if(scriptinput.value==""){
        scriptinput.value=text
    }
    script = scriptinput.value.split("#")
    for(let i = 0; i < script.length; i++){
        script[i]=script[i].split("/|")
        if(script[i][1]){
            script[i][2]=script[i][1].split("/;")[1]
            script[i][1]=script[i][1].split("/;")[0]
            script[i][2]=script[i][2].split("\n")
            if(script[i][1]=="y"){
                enabled[i]=true
                Selection=Selection+"<input type=\"checkbox\" checked onclick=\"checkClick("+(i)+")\">"+script[(i)][0]+"<br>"
            }else{
                enabled[0]=false
                Selection=Selection+"<input type=\"checkbox\" onclick=\"checkClick("+(i)+")\">"+script[i][0]+"<br>"
                console.log(i)

            }

        }
    }
    selection.innerHTML=Selection
    drawText()
    // requestAnimationFrame(tick)
}
window.checkClick=(i) => {
    enabled[i]=!enabled[i]
    console.log(enabled)
    drawText()
}
function drawText(){
    var finalString=""

    for(let i = 0; i<script.length;i++){
        if(enabled[i]){
            finalString=finalString+"#"+script[i][0]
            for(let z=1;z<script[i][2].length;z++){
                finalString=finalString+"<br>"+script[i][2][z].replaceAll("/:h","#").replaceAll(".:/:.","")
            }
        }
    }
    output.innerHTML=finalString
}
window.copy=() => {
  var copyText = document.getElementById("output");
  navigator.clipboard.writeText(copyText.innerHTML.replaceAll("<br>","\n").replaceAll("&gt;",">"));
alert("Copied the script to the clipboard!")
}
window.change=() => {
    if(showfile){
        init()
        showfile=false
    } else{
        showfile=true
        scriptinput.style.display='block'
    }
}