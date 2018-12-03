class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano 
        this.mes = mes
        this.dia = dia
        this.tipo = tipo 
        this.descricao = descricao
        this.valor = valor
    }

    validarDados() {
        for(let i in this) {
            if (this[i] == undefined || this[i] == '' || this[i] == null) {
                return false
            } 
        }
        return true
    }
}

class Bd {
    constructor() {
        let id = localStorage.getItem('id')
        
        if(id === null) {
            localStorage.setItem('id', 0)
        }
    }

    getProximoId() {
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1 
    }

    gravar(d) {
        let id = this.getProximoId()
        localStorage.setItem(id,JSON.stringify(d))
        localStorage.setItem('id', id)
    }

    recuperarTodosRegistros() {
        let listaDespesas = Array()
        let id = localStorage.getItem('id')
        
        //recupera despesas a cada item
        for( let i = 1; i <= id; i++ ) {
            let despesa = JSON.parse(localStorage.getItem(i))

            //verifica se tem item removidos
            if (despesa === null) {
                continue
            }

            listaDespesas.push(despesa)
        }

        return listaDespesas
    }
}


let bd = new Bd()

function cadastrarDespesa() {
    
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let despesa = new Despesa (
        ano.value, mes.value, dia.value,
        tipo.value, descricao.value, valor.value
    )

    if ( despesa.validarDados() ) {
        document.getElementById('exampleModalLabel').innerHTML = 'Registro Inserido com Sucesso'
        document.getElementById('exampleModalLabel').className = 'modal-title text-success'
        document.getElementById('modal_texto').innerHTML = 'Despesa foi cadastrada corretamente.'
        document.getElementById('btn_modal').className = 'btn btn-success'

        //Show modal when correctly inserted
        $('#modelRegristroDespesa').modal('show')
        bd.gravar(despesa)

        //clean inputs
        ano.value = ''
        mes.value = ''
        dia.value = ''
        tipo.value = ''
        descricao.value = ''
        valor.value = ''
         
    } else {
        document.getElementById('exampleModalLabel').innerHTML = 'Erro na inclusão do registro'
        document.getElementById('exampleModalLabel').className = 'modal-title text-danger'
        document.getElementById('modal_texto').innerHTML = 'Existem campos obrigatórios que não foram preenchidos.'
        document.getElementById('btn_modal').className = 'btn btn-danger'

        $('#modelRegristroDespesa').modal('show')
        
    }
}


function carregaListaDespesas() {
    
    //carrega a lista gerada pelo objeto bd para uma variavel
    let listaDespesaExibir = Array()
    listaDespesaExibir = bd.recuperarTodosRegistros()

    //exibe a lista carregada
    let lista = document.getElementById('tabelaDespesa')

    listaDespesaExibir.forEach( function(id) {
        
        let tableRow = lista.insertRow()
        
        tableRow.insertCell(0).innerHTML = `${id.dia}/${id.mes}/${id.ano}`  
        
        switch(id.tipo) {
            case '1': id.tipo = 'Alimentação'; break
            case '2': id.tipo = 'Educação'; break
            case '3': id.tipo = 'Lazer'; break
            case '4': id.tipo = 'Saúde'; break
            case '5': id.tipo = 'Transporte'; break
        }
        
        tableRow.insertCell(1).innerHTML = id.tipo
        tableRow.insertCell(2).innerHTML = id.descricao
        tableRow.insertCell(3).innerHTML = id.valor

    })
}