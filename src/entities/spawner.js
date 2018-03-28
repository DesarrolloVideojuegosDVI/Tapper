var Spawner = function(barra, numCLientes, frecuencia, retardo) {
  GameManager.inicializar(numCLientes);
  this.barra = barra;
  this.numCLientes = numCLientes;
  this.frecuencia = 0;
  this.retardo = retardo;

  this.step = function(dt){
    if (this.retardo < 0 && this.numCLientes > 0){
      this.frecuencia -=dt;
      if(this.frecuencia < 0 && this.numCLientes > 0) {
        GameManager.actualiza("numClientesEsperando", "+");
        this.board.add(new Client(0, this.barra.y - 10));
        this.frecuencia = frecuencia;
        this.numCLientes--;
      }
    }else if(this.numCLientes > 0){
      this.retardo -= dt;
    }
  };

  this.draw = function(){};
};
