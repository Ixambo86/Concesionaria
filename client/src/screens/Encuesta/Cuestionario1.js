const json = {
    "title":"Encuesta de satisfacción - Concesionaria Autobot",
    "description": "Te pedimos tu opinion para mejorar nuestro servicio",
    "completedHtml": "<h3>Gracias por tu devolución.</h3> <h5>¡Tus ideas mejoran nuestro servicio!</h5>",
    "completedHtmlOnCondition": [
        {
            "expression": "{puntaje} > 3",
            "html": "<h3>Gracias por tu devolución.</h3> <h5>Nos encanta que disfrutes nuestro servicio. ¡Tus ideas nos sirven para hacer aún mejor nuestro servicio!</h5>"
        }, {
            "expression": "{puntaje} < 3",
            "html": "<h3>Gracias por tu devolución.</h3> <h5> Nos encanta que compartas tus ideas con nosotros. Apreciamos las opiniones de nuestros clientes. Nos esforzaremos por alcanzar sus expectativas.</h5><br/>"
        }
    ],
    "pages": [
        {
            "name": "page1",
            "elements": [
                {
                    "type": "rating",
                    "name": "puntaje",
                    "title": "En la escala del 1 al 5 ¿Qué tan satisfecho estás con la reserva del turno?",
                    "isRequired": true,
                    "rateMin": 1,
                    "rateMax": 5,
                    "minRateDescription": "(Nada satisfecho)",
                    "maxRateDescription": "(Muy satisfecho)"
                }, {
                    "type": "checkbox",
                    "name": "atributos",
                    "visibleIf": "{puntaje} >= 4",
                    "title": "¿Qué es lo que más te gusto de la reserva?",
                    "isRequired": true,
                    "validators": [
                        {
                            "type": "answercount",
                            "text": "Favor de seleccionar 1 como máximo.",
                            "maxCount": 1
                        }
                    ],
                    "hasOther": false,
                    "choices": [
                        "Velocidad", "Disponibilidad", "Calidad"
                    ],
                }, {
                    "type": "comment",
                    "name": "buena",
                    "visibleIf": "{puntaje} >= 3",
                    "title": "¿Querés dejarnos un comentario sobre tu experiencía?"
                }, {
                    "type": "comment",
                    "name": "mala",
                    "visibleIf": "{puntaje} <3",
                    "title": "¿Querés dejarnos alguna sugerencia de mejora en nuestra atención?"
                }
            ]
        },        
    ],
    "showQuestionNumbers": "on"
};
export default json;