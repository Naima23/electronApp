const fs = require("fs");
const path = require("path");

var Promise = require("bluebird");
const btnAnalyse = document.getElementById('btn-Analyser');
const analyser = 'C:/Users/Youcode/Desktop/temporai/'


const directory = "C:/Users/Youcode/Desktop/temporai";
// const coci =' C:/Users/youcode/AppData/Local/Google/Chrome/User Data';
document.getElementById("btn2").style.display = "none";
let i = 0;
const move = () => {
  if (i == 0) {
    i = 1;
    let elem = document.getElementById("myBar");
    document.getElementById("myProgress").style.display = "block";
    document.getElementById("btn").style.display = "none";

    let width = 1;
    let id = setInterval(frame, 10);

    function frame() {
      if (width >= 120) {
        // -----------------------------------
        fs.readdir(directory, (err, files) => {
          if (err) throw err;
          if (files.length === 0) {
            document.getElementById("txt").innerHTML = "No file found!";
            document.getElementById("btn2").style.display = "block";
            return;
          } else {
            for (const file of files) {
              document.getElementById("txt").innerHTML =
                files.length + " files deleted!";
              fs.unlink(path.join(directory,file), (err) => {
                if (err) throw err;
                document.getElementById("btn2").style.display = "block";
                return;
              });
            }
          }
        });




        // -----------------------------------
        clearInterval(id);
        i = 0;
        elem.style.display = "none";
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }
  }
};

const home = () =>{
  location.reload(); 
}



btnAnalyse.addEventListener('click', ()=>{
  var totalSizeBytes=0;
  fs.readdir(analyser, function(err, files) {
      if (err) throw err;

      Promise.mapSeries(files, function(file){
          return new Promise((resolve, reject) => {
              fs.stat(analyser + file,function(errr, stats) {
                  if (errr) {throw errr;}
                  if (stats.isFile()) { totalSizeBytes += stats.size / 1000000; resolve(); }
              });
          })
      }).then(()=>{
          let nbrFiles = files.length;
          let sizeFolder = totalSizeBytes;
          alert( nbrFiles + ''+'files'+'  '+sizeFolder + 'MB');
          statistics.push(nbrFiles,sizeFolder);

      });

  });
});


let statistics = [];
const btnHis = document.getElementById('btn-Historique');

btnHis.addEventListener('click',function(){

    let stat = statistics.join(" / ");
    alert(stat.toString())
})



