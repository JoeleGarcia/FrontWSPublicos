import axios from 'axios';

const API_URL = '/api/Inflacion.asmx';

export default {
    async obtenerIndiceInflacion(periodo) {
        try {
            const response = await axios.post(
                API_URL,
                `<?xml version="1.0" encoding="utf-8"?>
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
          <soapenv:Header/>
          <soapenv:Body>
            <tem:ObtenerIndiceInflacion>
              <tem:periodo>${periodo}</tem:periodo>
            </tem:ObtenerIndiceInflacion>
          </soapenv:Body>
        </soapenv:Envelope>`,
                {
                    headers: {
                        'Content-Type': 'text/xml; charset=utf-8',
                        'SOAPAction': 'http://tempuri.org/IInflacionServiceSoap/ObtenerIndiceInflacion'
                    }
                }
            );
            return this.parseIndiceResponse(response.data);
        } catch (error) {
            console.error('Error fetching inflation index:', error);
            throw error;
        }
    },

    parseIndiceResponse(xml) {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xml, "text/xml");
        const indice = xmlDoc.getElementsByTagName("IndiceInflacion")[0];

        return {
            id: parseInt(indice.getElementsByTagName("Id")[0].textContent),
            periodo: indice.getElementsByTagName("Periodo")[0].textContent,
            valor: parseFloat(indice.getElementsByTagName("Valor")[0].textContent),
            fechaActualizacion: new Date(indice.getElementsByTagName("FechaActualizacion")[0].textContent)
        };
    }
};