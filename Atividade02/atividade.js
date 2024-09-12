const btnElement = document.querySelector(".btnElement");
const cep = document.querySelector(".cep");
const logradouro = document.querySelector(".logradouro");
const bairro = document.querySelector(".bairro");
const cidade = document.querySelector(".cidade");
const uf = document.querySelector(".uf");

btnElement.addEventListener("click", async () => {
  const cepRequisicao = document.querySelector(".cepRequisicao").value;

  
  if(cepRequisicao.length !== 8){
    throw new Error("Tamanho do cep fornecido inválido")
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
  } catch (error) {
    console.error("Erro aos buscar o cep", error);
  }
});
