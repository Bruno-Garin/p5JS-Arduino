// cette application va communiquer entre p5JS et Arduino

int led= 2; // une led est reliée à la borne 2 avec une résistance de 220 Ohms
int valeurDuPortSerie;      // a variable to read incoming serial data into

void setup() {
  // initialisation du port Série
  Serial.begin(9600);
  // mettre le pin 2 en mode sortie
  pinMode(led, OUTPUT);
}

void loop() {
  // on regarde s'il y a une donnée sur le port série
  if (Serial.available() > 0) {
        // si oui, nous lisons la derniere valeur du port sérieread the oldest byte in the serial buffer:
        valeurDuPortSerie = Serial.read();
        // si cette valeur correspond à la lettre H , on allume la diode
          if (valeurDuPortSerie == 'H') {
              digitalWrite(led, HIGH);
              Serial.println("allumee");
                                        }
        // si cette valeur correspond à la lettre L, on eteint la diode
          if (valeurDuPortSerie == 'L') {
              digitalWrite(led, LOW); 
              Serial.println("eteinte");}

    // lire la valeur sur le pin analogique 0
    int valeurDeLaBorne = analogRead(A0);
    // Convertir cette valeur comprise entre 0 et 1023 en une tension entre 0 et 5 V
    float tension = valeurDeLaBorne  * (5.0 / 1023.0);
    // Envoyer cette valeur sur le port série
    Serial.println(tension);
                              }
            }




 
