const btnElement = document.querySelector(".btnElement");
const cep = document.querySelector(".cep");
const logradouro = document.querySelector(".logradouro");
const bairro = document.querySelector(".bairro");
const cidade = document.querySelector(".cidade");
const uf = document.querySelector(".uf");
const menssagemErro = document.querySelector(".mens_erro");

const cepTamanho = (cep) => (cep.length === 8 ? true : false);

btnElement.addEventListener("click", async () => {
  const cepRequisicao = document.querySelector(".cepRequisicao").value.trim(); // trim para ignorar os espaços em branco
  if (!cepTamanho(cepRequisicao)) {
    cep.innerHTML = "";
    logradouro.innerHTML = "";
    bairro.innerHTML = "";
    cidade.innerHTML = "";
    uf.innerHTML = "";
    menssagemErro.innerHTML = "O CEP deve ter 8 dígitos!";
    return; // fazer o porgrama parar e não continuar
  }

  try {
    const url = `https://viacep.com.br/ws/${cepRequisicao}/json/`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.erro) {
      throw new Error("CEP não encontrado!");
    }

    cep.innerHTML = data.cep;
    logradouro.innerHTML = data.logradouro;
    bairro.innerHTML = data.bairro;
    cidade.innerHTML = data.localidade;
    uf.innerHTML = data.uf;
    menssagemErro.innerHTML = "";
  } catch (e) {
    cep.innerHTML = "";
    logradouro.innerHTML = "";
    bairro.innerHTML = "";
    cidade.innerHTML = "";
    uf.innerHTML = "";
    menssagemErro.innerHTML = "CEP inválido ou não encontrado!";
  }
});
