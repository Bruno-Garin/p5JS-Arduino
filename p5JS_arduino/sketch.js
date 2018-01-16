// programme permettant de piloter une diode sur une carte Arduino/*

var portSerie;      // Declararation de l'objet Port Serie
var nomDuPort = "/dev/cu.usbmodem1411"; // indiquer ici le nom exact du port série utilisé par arduino pour communiquer avec la carte
var MessageEnvoye = 'L'; // message envoye à la carte , par defaut la diode est éteinte

function setup() {
  createCanvas(600, 400);   //  creation d'une fenetre
  background(100,100,100);  //  un joli fond gris
  portSerie = new p5.SerialPort(); // creation de l'objet portSerie
  portSerie.open(nomDuPort); // ouverture du port - il faut que le programme soit bien dans la carte et la carte bien branchée !
  portSerie.on('data', lectureDesDonnees); // passage d'une donnée par le port série
}

// fonction appelée pour lire les données sur le port Série.
function lectureDesDonnees() { 
    var caractere = portSerie.readLine();       // lecture ligne par ligne
    noStroke();
    if (caractere !=='' && caractere != parseFloat(caractere) ){
      fill(100,100,100);    rect(90,180,100,30);       fill(255,0,0);
      text(caractere , 100,200);} 
    
    if (caractere !=='' && caractere == parseFloat(caractere)) {
      fill(100,100,100);    rect(180,180,80,30);      fill(255,0,0);
      text(caractere + "V", 200,200);}
}

function draw() { // boucle qui redessine l'écran
  
  fill(20,20,150);              // une belle écriture bleue  
  textSize(20);
  text("Cliquer pour allumer ou éteindre la diode", 100, 100);
  text(lectureDesDonnees(), 200,200);
}
// Lorsque l'on clique sur l'ecran, la diode change d'état !
function mouseReleased() {
  portSerie.write(MessageEnvoye);
  if (MessageEnvoye === 'L') {
    MessageEnvoye = 'H';
  } else {
    MessageEnvoye = 'L';
  }
}
