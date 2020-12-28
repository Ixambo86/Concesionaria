
export const validacionService = {
    validar,
};

function validar(campo, valor) {

    switch (campo){
        case "DOMINIO":
            var regex_nro_patente = /(^(\w{3}\d{3})+$)|(^(\w{2}\d{3}\w{2})+$)/; 
            var res = regex_nro_patente.test(valor)
            return { estado: res, descripcion: res === true? "":"Patente invalida"}
    }
    
}

