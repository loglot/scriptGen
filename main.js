var text
var script
var number = 0
var enabled=[]
fetch('./script.txt')
  .then(response => response.text())
  .then((data) => {
    text=(data)
    init()
  })
var output=document.getElementById("output")
var selection=document.getElementById("selection")
function tick(){

    requestAnimationFrame(tick)
}
function init(){
    var Selection=""

    script = text.split("#")
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
function checkClick(i){
    enabled[i]=!enabled[i]
    console.log(enabled)
    drawText()
}
function drawText(){
    var finalString=""

    for(let i = 0; i<script.length;i++){
        if(enabled[i]){
            finalString=finalString+"<br>#"+script[i][0]
            for(let z=0;z<script[i][2].length;z++){
                finalString=finalString+"<br>"+script[i][2][z]
            }
        }
    }
    output.innerHTML=finalString
}