const fields = document.querySelectorAll("[required]")

function ValidateField(field) {
    // logica para verificar se existem erros
    function verifyErrors() {
        let foundError = false;

        for(let error in field.validity) {
            // se não for customError
            // então verifica se tem erro
            if (field.validity[error] && !field.validity.valid ) {
                foundError = error
            }
        }
        return foundError;
    }

    function customMessage(typeError) {
        const messages = {
            text: {
                valueMissing: "Por favor, preencha este campo"
            },
            email: {
                valueMissing: "Email é obrigatório",
                typeMismatch: "Por favor, preencha um email válido"
            },
			number:{
				valueMissing: "Por favor, preencha este campo"
			}
        }

        return messages[field.type][typeError]
    }

    function setCustomMessage(message) {
        const spanError = field.parentNode.querySelector("span.error")
        
        if (message) {
            spanError.classList.add("active")
            spanError.innerHTML = message
        } else {
            spanError.classList.remove("active")
            spanError.innerHTML = ""
        }
    }

    return function() {

        const error = verifyErrors()

        if(error) {
            const message = customMessage(error)

            field.style.borderColor = "red"
            setCustomMessage(message)
        } else {
            field.style.borderColor = "green"
            setCustomMessage()
        }
    }
}


function customValidation(event) {

    const field = event.target
    const validation = ValidateField(field)

    validation()

}

for( field of fields ){
    field.addEventListener("invalid", event => { 
        // eliminar o bubble
        event.preventDefault()

        customValidation(event)
    })
    field.addEventListener("blur", customValidation)
}


document.querySelector("form")
.addEventListener("submit", event => {
    console.log("Formulário enviado")

    // não vai enviar o formulário
    event.preventDefault()
})

const form = document.getElementById('form')

form.addEventListener('submit', (e) => {
	e.preventDefault();
	let nome = document.getElementById('nome').value;
	let cpf = document.getElementById('cpf').value;
	let tel = document.getElementById('tel').value;
	let cep = document.getElementById('cep').value;
	let rua = document.getElementById('rua').value;
	let num = document.getElementById('num').value;
	let comp = document.getElementById('comp').value;
	let bairro = document.getElementById('bairro').value;
	let cidade = document.getElementById('cidade').value;
	let estado = document.getElementById('estado').value;
	let email = document.getElementById('email').value;
	
	let data = {
		nome,
		cpf,
		tel,
		cep,
		rua,
		num,
		comp,
		bairro,
		cidade,
		estado,
		email
	}
	
	let arrayClientes=[]

	if(JSON.parse(localStorage.getItem("lead")) != null){
		arrayClientes.push(JSON.parse(localStorage.getItem("lead")));
	}

	arrayClientes.push(data);
	let clienteJson = JSON.stringify(arrayClientes);
	localStorage.setItem("lead", clienteJson);

	let content = document.getElementById('content')

	let carregando = `<p>Carregando...</p>`

	let sucesso = `<h2 style="color: #4f38b9">Cadastro efetuado com sucesso!</h2>`

	content.innerHTML = carregando

	setTimeout(() => {
		content.innerHTML = sucesso
	}, 1000)

})

const formProduto = document.getElementById('formProduto')

formProduto.addEventListener('submit', (e) => {
	e.preventDefault();
	let nomeProduto = document.getElementById('nomeProduto').value;
	let valor = document.getElementById('valor').value;
	let qt = document.getElementById('qt').value;
	let idProduto = document.getElementById('idProduto').value;
	
	let dataProduto = {
		nomeProduto,
		valor,
		qt,
		idProduto
	}

	let arrayProdutos=[]

	if(JSON.parse(localStorage.getItem("Produtos")) != null){
		arrayProdutos.push(JSON.parse(localStorage.getItem("Produtos")));
	}

	arrayProdutos.push(dataProduto);
	let produtoJson = JSON.stringify(arrayProdutos);
	localStorage.setItem("Produtos", produtoJson);

	let contentProduto = document.getElementById('contentProduto')

	let carregando = `<p>Carregando...</p>`

	let sucesso = `<h2 style="color: #4f38b9">Cadastro efetuado com sucesso!</h2>`

	contentProduto.innerHTML = carregando

	setTimeout(() => {
		contentProduto.innerHTML = sucesso
	}, 1000)

})