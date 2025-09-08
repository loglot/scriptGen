var text
var script
var number = 0
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
    var finalString=""
    var Selection=""

    script = text.split("#")
    for(let i = 0; i < script.length; i++){
        script[i]=script[i].split("/|")
        if(script[i][1]){
            script[i][2]=script[i][1].split("/;")[1]
            script[i][1]=script[i][1].split("/;")[0]
            script[i][2]=script[i][2].split("\n")
            if(script[i][1]=="n"){
                script[i][1]=false
                Selection=Selection+"<input type=\"checkbox\">"+script[i][0]+"<br>"
            }if(script[i][1]=="y"){
                script[i][1]=true
                Selection=Selection+"<input type=\"checkbox\" checked>"+script[i][0]+"<br>"
            }

        }
    }
    for(let i = 0; i<script.length;i++){
        if(script[i][1]){
            finalString=finalString+"<br>#"+script[i][0]
            for(let z=0;z<script[i][2].length;z++){
                finalString=finalString+"<br>"+script[i][2][z]
            }
        }
    }
    selection.innerHTML=Selection
    output.innerHTML=finalString

    requestAnimationFrame(tick)
}