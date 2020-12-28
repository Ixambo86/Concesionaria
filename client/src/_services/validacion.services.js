export const validacionService ={
    validar,
    datosValidos,
    validarClient
};

var camposValidos = true;
var res = true;

function datosValidos(){
    return camposValidos;
}

function validar(e,campo, valor){

    var regex = "";
    camposValidos = true;

    switch (campo) {

        case "dominio":
            regex = /(^(\w{3}\d{3})$)|(^(\w{2}\d{3}\w{2})$)/; 
            mostrarAlerta(e,res,valor,regex,"dominioid")
            return {estado: res, descripcion: res === true? "":"Patente inválida"};

        case "nro_motor":
            regex  = /^(([A-Za-z]{2,3}-[0123456789]{4,6}-[A-Za-z]{2,3})|0)$/; 
            mostrarAlerta(e,res,valor,regex,"nromotorid")
            return {estado: res, descripcion: res === true? "":"Numero de Motor inválido"};

        case "nro_chasis":
            regex  = /^((8[AE][A-Za-z]{2}[0123456789]{10,17})|0)$/;
            mostrarAlerta(e,res,valor,regex,"nrochasisid")
            return {estado: res, descripcion: res === true? "":"Numero de Chasis inválido"};    

        case "km":
            regex  = /^(\d{1,7})$/;
            mostrarAlerta(e,res,valor,regex,"kmid")
            return {estado: res, descripcion: res === true? "":"Kilometraje inválido"};
            
        case "costo":
            regex  = /^\d{1,9}$/;  
            mostrarAlerta(e,res,valor,regex,"costoid")
            return {estado: res, descripcion: res === true? "":"Costo inválido"};
     
        case "producto_costo":
            regex  = /^\d{1,9}$/;  
            mostrarAlerta(e,res,valor,regex,"costoid")
            return {estado: res, descripcion: res === true? "":"Costo inválido"};
                      
        case "precio":
            regex  = /^\d{1,9}$/; 
            mostrarAlerta(e,res,valor,regex,"precioid")
            return {estado: res, descripcion: res === true? "":"Precio inválido"};

        case "producto_precio":
            regex  = /^\d{1,9}$/;  
            mostrarAlerta(e,res,valor,regex,"precioid")
            return {estado: res, descripcion: res === true? "":"Costo inválido"};
        
        case "producto_stock_minimo":
            regex  = /^\d{1,9}$/;    
            mostrarAlerta(e,res,valor,regex,"stockid")
            return {estado: res, descripcion: res === true? "":"Stock inválido"}; 

        case "producto_compra_minima":
            regex  = /^\d{1,9}$/;    
            mostrarAlerta(e,res,valor,regex,"compraminimaid")
            return {estado: res, descripcion: res === true? "":"Stock inválido"};    

        case "producto_plazo_entrega":
            regex  = /^\d{1,9}$/;  
            mostrarAlerta(e,res,valor,regex,"plazoid")
            return {estado: res, descripcion: res === true? "":"Stock inválido"};
            
        case "cilindrada":
            regex  = /^(\d{1}\.\d{1}|^$)$/;
            mostrarAlerta(e,res,valor,regex,"cilindradaid")
            return {estado: res, descripcion: res === true? "":"Cilindrada inválida"};
            
        case "hp":
            regex  = /^\d{1,3}$/;
            mostrarAlerta(e,res,valor,regex,"hpid")
            return {estado: res, descripcion: res === true? "":"Hp/kW inválido"};
            
        case "marca_id":
             mostrarAlertaSelect(e,valor,"marcaid")

             return {estado: res, descripcion: res === true? "":"Selección inválida"};
        
        case "modelo_id":
             mostrarAlertaSelect(e,valor,"modeloid")
                   
             return {estado: res, descripcion: res === true? "":"Selección inválida"};             
             
        case "version_id":
             mostrarAlertaSelect(e,valor,"versionid")
                   
             return {estado: res, descripcion: res === true? "":"Selección inválida"};        
             
        case "anio_id":
             mostrarAlertaSelect(e,valor,"anioid")
                   
             return {estado: res, descripcion: res === true? "":"Selección inválida"};
             
        case "carroceria_id":
            mostrarAlertaSelect(e,valor,"carroceriaid")
                  
            return {estado: res, descripcion: res === true? "":"Selección inválida"};    
        
        case "tipo_motor_id":
             mostrarAlertaSelect(e,valor,"tipomotorid")
                   
             return {estado: res, descripcion: res === true? "":"Selección inválida"};    
  
        case "color_id":
            mostrarAlertaSelect(e,valor,"colorid")
                  
            return {estado: res, descripcion: res === true? "":"Selección inválida"};

        case "turbo":
             mostrarAlertaSelect(e,valor,"turboid")
    
             return {estado: res, descripcion: res === true? "":"Selección inválida"};        
        
        case "proveedor_id":
            mostrarAlertaSelect(e,valor,"proveedorid")    
            
            return {estado: res, descripcion: res === true? "":"Selección inválida"};

        case "categoria_id":
            mostrarAlertaSelect(e,valor,"categoriaid")    
            
            return {estado: res, descripcion: res === true? "":"Selección inválida"};

        case "producto_descripcion":
            regex  = /^(?!\s*$).+/;
            mostrarAlerta(e,res,valor,regex,"descripcionid")
            return {estado: res, descripcion: res === true? "":"Descripcion inválida"};
            
        case "producto_detalle":
            regex = /^(?!\s*$).+|^$/;
            mostrarAlerta(e,res,valor,regex,"detallesid")
            return {estado: res, descripcion: res === true? "": "Detalle inválido"};    

        case "nombre":
            regex = /^([A-Za-z]{3,15}\s[A-Za-z]{3,15}|[A-Za-z]{3,15})$/;
            mostrarAlerta(e,res,valor,regex,"nombreid")
            return {estado: res, descripcion: res === true? "": "Nombre inválido"};

        case "dni":
            regex = /^(\d{7,8})$/;
            mostrarAlerta(e,res,valor,regex,"dniid");
            return {estado: res, descripcion: res === true? "": "DNI inválido"};
        
        case "usuario":
            regex = /^([A-Za-z]{3,15})$/;
            mostrarAlerta(e,res,valor,regex,"usuarioid");
            return {estado: res, descripcion: res === true? "": "Usuario inválido"};

        case "password":
            regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
            mostrarAlerta(e,res,valor,regex,"passwordid");
            return {estado: res, descripcion: res === true? "": "Password inválida"};

        case "email":
            regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
            mostrarAlerta(e,res,valor,regex,"emailid");
            return {estado: res, descripcion: res === true? "": "Email inválido"};
    
        case "sucursal_id":
            mostrarAlertaSelect(e,valor,"sucursalid")    
            
            return {estado: res, descripcion: res === true? "":"Selección inválida"};

        case "proveedor_nombre":
            regex = /^(([A-Za-z]{3,15}\s[A-Za-z]{3,15}|[A-Za-z]{3,15})|[A-Za-z]{3,15})$/;
            mostrarAlerta(e,res,valor,regex,"prov_nombre_id");
            return {estado: res, descripcion: res === true?"": "Nombre inválido"};    

        case "proveedor_apellido":
            regex = /^(([A-Za-z]{3,15}\s[A-Za-z]{3,15}|[A-Za-z]{3,15})|[A-Za-z]{3,15})$/;
            mostrarAlerta(e,res,valor,regex,"prov_apellido_id");
            return {estado: res, descripcion: res === true?"": "Apellido inválido"}; 

        case "proveedor_razon_social":
            regex = /^(?!\s*$).+/;
            mostrarAlerta(e,res,valor,regex,"prov_razon_id");
            return {estado: res, descripcion: res === true?"": "Razon social inválida"}; 
        
        case "proveedor_documento":
            regex = /^([0-9]){7,}$/;
            mostrarAlerta(e,res,valor,regex,"prov_cuil_id");
            return {estado: res, descripcion: res === true?"": "Cuil/Cuit inválido"}; 

        case "proveedor_telefono":
            regex = /^((\d{10})|(\d{2}-\d{4}-\d{4}))$/;
            mostrarAlerta(e,res,valor,regex,"prov_telefono_id");
            return {estado: res, descripcion: res === true?"": "Telefono inválido"}; 

        case "proveedor_email":
            regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
            mostrarAlerta(e,res,valor,regex,"prov_email_id");
            return {estado: res, descripcion: res === true?"": "Email inválido"}; 

        case "proveedor_calle":
            regex = /^(\w{1,} ?\w{1,}? ?\w{1,}?|^$)$/;
            mostrarAlerta(e,res,valor,regex,"prov_calle_id");
            return {estado: res, descripcion: res === true?"": "Calle inválida"}; 

        case "proveedor_altura":
            regex = /^\d{1,4}$/;
            mostrarAlerta(e,res,valor,regex,"prov_altura_id");
            return {estado: res, descripcion: res === true?"": "Altura inválida"}; 

        case "proveedor_piso":
            regex = /^\d{1,2}$/;
            mostrarAlerta(e,res,valor,regex,"prov_piso_id");
            return {estado: res, descripcion: res === true?"": "Piso inválido"}; 

        case "proveedor_dpto":
            regex = /^([A-Za-z]{1}|^$)/;
            mostrarAlerta(e,res,valor,regex,"prov_dpto_id");
            return {estado: res, descripcion: res === true?"": "Dpto inválido"};

        case "localidad_id":
            mostrarAlertaSelect(e,valor,"prov_localidad_id")      
            return {estado: res, descripcion: res === true? "":"Selección inválida"};         
            
        case "descripcion":
            regex = /^(?!\s*$).+/;
            mostrarAlerta(e,res,valor,regex,"descripcionid");
            return {estado: res, descripcion: res === true?"": "Descripcion inválida"};

        case "cantidad_modulos":
            regex = /^[1-9]$/;
            mostrarAlerta(e,res,valor,regex,"modulosid");
            return {estado: res, descripcion: res === true?"": "Modulos inválidos"};

        case "modelo_descripcion":
            regex = /^(?!\s*$).+/;
            mostrarAlerta(e,res,valor,regex,"descripcionid");
            return {estado: res, descripcion: res === true?"": "Descripcion inválida"};

        case "iva_id":
            mostrarAlertaSelect(e,valor,"prov_iva_id");
            return {estado: res, descripcion: res === true?"": "Iva inválido"};

        case "sucursal_nombre":
            regex = /^(?!\s*$).+/;
            mostrarAlerta(e,res,valor,regex,"sucursalnombreid");
            return {estado: res, descripcion: res === true?"": "Nombre de sucursal invalido"};
        
        case "sucursal_calle":
            regex = /^(?!\s*$).+/;
            mostrarAlerta(e,res,valor,regex,"calleid");
            return {estado: res, descripcion: res === true?"": "Calle inválida"};    

        case "sucursal_altura":
            regex = /^\d{1,4}$/;
            mostrarAlerta(e,res,valor,regex,"alturaid");
            return {estado: res, descripcion: res === true?"": "Altura inválida"};
            
        case "sucursal_cant_mecanicos":
            regex = /^\d{1,2}$/;
            mostrarAlerta(e,res,valor,regex,"mecanicosid");
            return {estado: res, descripcion: res === true?"": "Cantidad inválida"};

        case "sucursal_telefono":
            regex = /^((\d{10})|(\d{2}-\d{4}-\d{4}))$/;
            mostrarAlerta(e,res,valor,regex,"telefonoid");
            return {estado: res, descripcion: res === true?"": "Telefono inválido"};

        case "sucursal_email":
            regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
            mostrarAlerta(e,res,valor,regex,"emailid");
            return {estado: res, descripcion: res === true?"": "Email inválido"};

        case "sucursal_localidad_id":
            mostrarAlertaSelect(e,valor,"localidadid")      
            return {estado: res, descripcion: res === true? "":"Localidad inválida"};

        case "pais_id":
            mostrarAlertaSelect(e,valor,"paisid")      
            return {estado: res, descripcion: res === true? "":"Pais inválido"};
        
        case "provincia_id":
            mostrarAlertaSelect(e,valor,"provinciaid")      
            return {estado: res, descripcion: res === true? "":"Provincia inválida"};

        case "sucursal_descripcion_id":
            regex = /^(?!\s*$).+/;
            mostrarAlerta(e,res,valor,regex,"descripcionid");
            return {estado: res, descripcion: res === true?"": "Descripcion inválida"};

        case "plazo_entrega_0km":
            regex = /^\d{1,3}$/;
            mostrarAlerta(e,res,valor,regex,"plazoid");
            return {estado: res, descripcion: res === true?"": "Plazo inválido"};
    
        case "fecha_desde":
            mostrarAlertaFecha(e,valor,"vigentedesdeid");
            return {estado: res, descripcion: res === true? "":"Fecha inválida"}; 
      


        default:
             return {estado: res, descripcion: res === true? "":"Nada seleccionado"};
    }

}

function validarClient(e,campo, valor){

    var regex = "";
    camposValidos = true;

    switch (campo) {
        case "cliente_nombre":
            regex = /^(([A-Za-z]{3,15}\s[A-Za-z]{3,15}|[A-Za-z]{3,15})|[A-Za-z]{3,15})$/;
            mostrarAlerta(e,res,valor,regex,"cli_nombre_id");
            return {estado: res, descripcion: res === true?"": "Nombre inválido"};    
    
        case "cliente_apellido":
            regex = /^(([A-Za-z]{3,15}\s[A-Za-z]{3,15}|[A-Za-z]{3,15})|[A-Za-z]{3,15})$/;
            mostrarAlerta(e,res,valor,regex,"cli_apellido_id");
            return {estado: res, descripcion: res === true?"": "Apellido inválido"}; 
    
        case "cliente_razon_social":
            regex = /^(?!\s*$).+/;
            mostrarAlerta(e,res,valor,regex,"cli_razon_id");
            return {estado: res, descripcion: res === true?"": "Razon social inválida"}; 
            
        case "cliente_documento":
            regex = /^([0-9]){7,}$/;
            mostrarAlerta(e,res,valor,regex,"cli_dni_id");
            return {estado: res, descripcion: res === true?"": "D.N.I. inválido"};
            
        case "cliente_persona_fisica":
            mostrarAlertaSelect(e,valor,"cli_fisica_id")      
            return {estado: res, descripcion: res === true? "":"Selección inválida"}; 
        
        case "cliente_genero":
            mostrarAlertaSelect(e,valor,"cli_genero_id")      
            return {estado: res, descripcion: res === true? "":"Selección inválida"}; 

        case "cliente_fecha_nac":
            mostrarAlertaFecha(e,valor,"cli_fecha_nac_id")      
            return {estado: res, descripcion: res === true? "":"Selección inválida"}; 

        case "cliente_telefono":
            regex = /^((\d{10})|(\d{2}-\d{4}-\d{4}))$/;
            mostrarAlerta(e,res,valor,regex,"cli_telefono_id");
            return {estado: res, descripcion: res === true?"": "Telefono inválido"}; 
    
        case "cliente_email":
            regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
            mostrarAlerta(e,res,valor,regex,"cli_email_id");
            return {estado: res, descripcion: res === true?"": "Email inválido"}; 
    
        case "cliente_calle":
            regex = /^(\w{1,} ?\w{1,}? ?\w{1,}?|^$)$/;
            mostrarAlerta(e,res,valor,regex,"cli_calle_id");
            return {estado: res, descripcion: res === true?"": "Calle inválida"}; 
    
        case "cliente_altura":
            regex = /^\d{1,4}$/;
            mostrarAlerta(e,res,valor,regex,"cli_altura_id");
            return {estado: res, descripcion: res === true?"": "Altura inválida"}; 
    
        case "cliente_piso":
            regex = /^\d{1,2}$/;
            mostrarAlerta(e,res,valor,regex,"cli_piso_id");
            return {estado: res, descripcion: res === true?"": "Piso inválido"}; 
    
        case "cliente_dpto":
            regex = /^([A-Za-z]{1}|^$)/;
            mostrarAlerta(e,res,valor,regex,"cli_dpto_id");
            return {estado: res, descripcion: res === true?"": "Dpto inválido"};
        
        case "pais_id":
            mostrarAlertaSelect(e,valor,"cli_pais_id")      
            return {estado: res, descripcion: res === true? "":"Pais inválido"};  

        case "provincia_id":
            mostrarAlertaSelect(e,valor,"cli_prov_id")      
            return {estado: res, descripcion: res === true? "":"Provincia inválida"};  
        
        case "loc_id":
            mostrarAlertaSelect(e,valor,"cli_loc_id")      
            return {estado: res, descripcion: res === true? "":"Localidad inválida"};  
    
        case "ci_id":
            mostrarAlertaSelect(e,valor,"cli_iva_id");
            return {estado: res, descripcion: res === true?"": "Iva inválido"};

        case "cliente_motivo_eliminado":
            regex = /^(?!\s*$).+/;
            mostrarAlerta(e,res,valor,regex,"cli_motivo");
            return {estado: res, descripcion: res === true?"": "Motivo inválido"};

        default:
             return {estado: res, descripcion: res === true? "":"Nada seleccionado"};
    }

}


//En base a la evaluación de la expresión muestra u oculta las alertas
function mostrarAlerta(e,res,valor,regex,alerta){
    res = regex.test(valor);
    camposValidos = camposValidos & res;
    if (!res){document.getElementById(alerta).style.display = "block"}
    else{
      document.getElementById(alerta).style.display = "none"
    }
}

function mostrarAlertaSelect(e,valor,alerta){

    if(valor === "0" || valor <= 0 || valor === "" || valor === undefined){
        document.getElementById(alerta).style.display = "block"; 
        camposValidos = false;
     }
     else{
        document.getElementById(alerta).style.display = "none";
        camposValidos = true;
     }
}

function mostrarAlertaFecha(e,valor,alerta){
    var desde = '1900-01-01';
    var hasta = '2003-01-01';

    if(alerta == "vigentedesdeid"){hasta = '3000-01-01'}

    if(valor >= hasta || valor <= desde || valor == undefined || valor == null){
        document.getElementById(alerta).style.display = "block"; 
        camposValidos = false;
     }
     else{
        document.getElementById(alerta).style.display = "none";
        camposValidos = true;
     }
}