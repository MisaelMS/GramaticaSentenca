import Gramatica from './Gramatica';

class Derivacao {
  constructor(gramatica) {
    this.gramatica = gramatica;
  }

  geraSentenca() {
    let pilha = [this.gramatica.inicial];
    let sentenca = this.gramatica.inicial;
    let passos = [sentenca];

    while (pilha.length > 0) {
      let atual = pilha.pop();
      console.log('atual:', atual);
      
      if (this.gramatica.terminais.includes(atual) || atual === 'ε') {
        continue;
      } else if (this.gramatica.naoTerminais.includes(atual)) {
        const producao = this.gramatica.producao[atual];
        console.log(producao);

        if (!producao) {
          console.log('erro');
          return {
            erro: `Não foi adicionado o ${this.gramatica.inicial} nas Produções.`,
          };
        }
        
        const producaoAleatoria = producao[Math.floor(Math.random() * producao.length)];  // Escolhe uma produção aleatória
        //Gera um número decimal "aleatório" e multiplca pelo tamanho da producao (array), depois disso arredonda para inteiro com floor (pra baixo)
        //Tipo so o array tiver só 1 de tamanho vai ser 0 já que estou pegando literalmente o tamanho (1 a x) e não as casas (o a x)
        
        console.log('producaoAleatoria:', producaoAleatoria);

        if (producaoAleatoria === 'ε') {
          console.log('entrou', atual)
          sentenca = sentenca.replace(atual, ''); //Troca o atual pela produção escolhida aleatoriamente
        } else {
          sentenca = sentenca.replace(atual, producaoAleatoria); //Troca o atual pela produção escolhida aleatoriamente
        }
        console.log('sentenca:', sentenca);
        
        for (let i = producaoAleatoria.length - 1; i >= 0; i--) {
          pilha.push(producaoAleatoria[i]);  // Dai aqui eu empilho meu não terminal
        }

        passos.push(sentenca); //Aqui boto toda a produção para seguir o passo a passo
      } else if (atual === atual.toUpperCase()) { //Verifico se a pessoa não meteu o loco e não adicionou o não terminal lá
        console.log('erro');
        return {
          erro: `Não foi adicionado o não terminal ${atual} nos Não Terminais.`,
        };
      } else if (atual === atual.toLowerCase()) { //Verifico se a pessoa não meteu o loco e não adicionou o terminal lá
        console.log('erro');
        return {
          erro: `Não foi adicionado o terminal ${atual} nos Terminais.`,
        };
      }
    }

    console.log('Passos da derivação:', passos.join('\n'));

    passos.splice(0,1);

    return {
      sentenca,
      passos: passos.join(','),
      erro: '',
    };
  }
}

export default Derivacao;