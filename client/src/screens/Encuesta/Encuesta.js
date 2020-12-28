import React, { Component } from 'react';
import { encuestaService } from '../../_services/encuesta.service';
import "survey-react/survey.css"
import * as Survey from 'survey-react';
import Json1 from './Cuestionario1';
import Json2 from './Cuestionario2';
import Json3 from './Cuestionario3';

class Encuesta extends Component {
    constructor (props){  
        super(props)
        this.state = {
        }  
    }

    enviarEncuesta = (data, asunto) =>{
        var puntaje = data.puntaje;
        var atributo = '';
        if (puntaje>=4)
            atributo = data.atributos[0];
        var msjBueno = data.buena
        var msjMalo = data.mala
        msjBueno = msjBueno +'';
        msjMalo = msjMalo +'';
        encuestaService.enviarEncuesta(puntaje, atributo, msjBueno, msjMalo, asunto);
    }

render(){
    var surveyRender1 = 
        <Survey.Survey 
            json={Json1}
            showCompletedPage={true}
            goNextPageAutomatic={true}
            onComplete={data => this.enviarEncuesta(data.valuesHash, 'Encuesta de reserva de turno')}
        />
    var surveyRender2 = 
        <Survey.Survey 
            json={Json2}
            showCompletedPage={true}
            goNextPageAutomatic={true}
            onComplete={data => this.enviarEncuesta(data.valuesHash, 'Encuesta de reserva de personal')}
        />
    
    var surveyRender3 = 
        <Survey.Survey 
            json={Json3}
            showCompletedPage={true}
            goNextPageAutomatic={true}
            onComplete={data => this.enviarEncuesta(data.valuesHash, 'Encuesta de servicio general')}
        />

    return (
        <div className='encuesta'>
        <div>
            {surveyRender1}
        </div>
        <div>
            {surveyRender2}
        </div>
        <div>
            {surveyRender3}
        </div>
        </div>
    )
    }
}

export { Encuesta };
