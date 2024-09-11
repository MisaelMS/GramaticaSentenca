class Gramatica {
    constructor(naoTerminais, terminais, producao, inicial) {
      this.naoTerminais = naoTerminais;
      this.terminais = terminais;
      this.producao = producao;
      this.inicial = inicial;
    }
  }
  
  export default Gramatica;