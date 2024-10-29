const menssagemErro = document.querySelector('.mensagemErro');
const cepRequisicao = document.querySelector('.cepRequisicao');
const button = document.querySelector('.button');
const cep = document.querySelector('.cep');
const logradouro = document.querySelector('.logradouro');
const bairro = document.querySelector('.bairro');
const cidade = document.querySelector('.cidade');
const uf = document.querySelector('.uf');


cepRequisicao.addEventListener('input', () => {
    const cep = cepRequisicao.value;
    if(cep.length !== 8) {
        menssagemErro.innerHTML = 'CEP inválido';
    }
});

button.addEventListener('click', async () => {
    try{
        const cepRequisicao = document.querySelector('.cepRequisicao').value;
        const response = await fetch(`https://viacep.com.br/ws/${cepRequisicao}/json/`);
        const data = await response.json();
        cep.innerHTML = data.cep;
        logradouro.innerHTML = data.logradouro;
        bairro.innerHTML = data.bairro;
        cidade.innerHTML = data.localidade;
        uf.innerHTML = data.uf;
        menssagemErro.innerHTML = '';
    }catch(err){
        cep.innerHTML = '';
        logradouro.innerHTML = '';
        bairro.innerHTML = '';
        cidade.innerHTML = '';
        uf.innerHTML = '';
        menssagemErro.innerHTML = 'CEP não encontrado';
    }
});
