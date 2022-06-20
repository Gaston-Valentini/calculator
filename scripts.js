window.addEventListener("load", () => {
    // Se obtienen los elementos del DOM
    const display = document.querySelector(".calculatorDisplay");
    const keyboardButtons = document.getElementsByClassName("calculatorKeyboardButton");

    // Se crea un array con los botones de la calculadora
    const keyboardButtonsArray = Array.from(keyboardButtons);

    // Agrega un eventListener para ejecutar una orden según el boton que se clickee a cada elemento del array 
    keyboardButtonsArray.forEach(button => {
        button.addEventListener("click", () => {
            calculator(button, display);
        })
    })

    // Interruptor que identifica si es una operación nueva
    var interruptor = true;

    // Función que se ejecuta gracias al eventListener de cada botón, recibe el botón clickeado y el display de la calculadora
    function calculator(button, display) {
        switch (button.innerHTML) {
            // Reinicia la calculadora
            case "C":
                display.innerHTML = "0";
                interruptor = true;
                break;

            // Elimina el último número del display
            case "DEL":
                if(interruptor === false){

                    // Si es una operación finalizada inicia una nueva
                    display.innerHTML = "0";
                    interruptor = true
                    break;
                } else {

                    // Reinicia la calculadora si hay un solo dígito y no hace nada si es 0
                    if (display.innerHTML.length === 1) {
                        display.innerHTML = "0";
    
                    // Elimina el último dígito si hay más de uno
                    } else {
                        display.innerHTML = display.innerHTML.substring(0, display.innerHTML.length - 1);
                        break;
                    }
                }
            
            // Hace el cálculo y coloca el interruptor en false para iniciar una nueva operación
            case "=":
                display.innerHTML = eval(display.innerHTML);
                interruptor = false;
                break;

            // Agrega números al display
            default:

                // Evita que sean muy lárgos los números
                if(display.innerHTML.length < 15){

                    // Coloca el display vacío para agregar el primer número
                    if (display.innerHTML == 0) {
                        display.innerHTML = '';
                    }

                    // Evita que se coloquen dos operadores seguidos
                    if (isNaN(display.innerHTML.substr(-1)) && isNaN(button.innerHTML)) {
                        alert("Luego de un operador se debe colocar un número");
                        break;
                    }

                    // Agrega un número a la operación
                    if (interruptor === true) {

                        // Si es un operador le coloca el "0" antes
                        if (isNaN(button.innerHTML) && display.innerHTML == 0) {
                            display.innerHTML = "0" + button.innerHTML

                        // Si es un número se lo adiciona a la operación
                        } else {
                            display.innerHTML += button.innerHTML
                        }

                    // Cuando se está iniciando una nueva operación (interruptor en false)
                    } else {

                        // Si inicia con un operador continua la operación
                        if (isNaN(button.innerHTML)) {

                            // Si el resultado fue 0 se setea el display en "" por lo tanto adiciona el 0 en tal caso para seguir con la operación
                            if (display.innerHTML == 0) {
                                display.innerHTML = "0" + button.innerHTML;
                                interruptor = true;
                            // Continua la operación
                            } else {
                                display.innerHTML += button.innerHTML;
                                interruptor = true;
                            }

                        // Coloca el primer número de la operación
                        } else {
                            display.innerHTML = button.innerHTML;
                            interruptor = true;
                        }
                    }
                } else {
                    alert("La calculadora solo acepta un máximo de 15 dígitos");
                }
                break;
        }
    }
});