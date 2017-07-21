class Utilities {
    constructor() {}

    static crearElemento(element, id, text, data) {
        let eElement = document.createElement(element);
        if (id) {
            eElement.setAttribute("id", id);
        }
        if (text) {
            eElement.textContent = text;
        }
        if (data != null) {
            for (let i in data) {
                eElement.setAttribute(i, data[i]);
            }
        }

        return eElement;
    }

    static getFormatCurrencyNumber(number) {
        return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(number);
    }
}