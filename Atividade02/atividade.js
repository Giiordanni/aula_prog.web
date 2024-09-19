const btnElement = document.querySelector(".btnElement");
const cep = document.querySelector(".cep");
const logradouro = document.querySelector(".logradouro");
const bairro = document.querySelector(".bairro");
const cidade = document.querySelector(".cidade");
const uf = document.querySelector(".uf");
const menssagemErro = document.querySelector(".mens_erro");

btnElement.addEventListener("click", async () => {
  const cepRequisicao = document.querySelector(".cepRequisicao").value;

  if (cepRequisicao.length !== 8) {
    throw new Error("Tamanho do cep fornecido inválido. Deve conter 8 dígitos");
    return; //impedir a requisição de continuar
  }
  try {
    const response = await fetch(
      `https://viacep.com.br/ws/${cepRequisicao}/json/`
    );

    const data = await response.json();
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
    menssagemErro.innerHTML = "CEP inválido";
  }
});
