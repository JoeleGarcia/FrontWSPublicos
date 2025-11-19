import axios from 'axios';

const API_URL = '/api/TasaCambio.asmx';

export default {
    async obtenerTasa(codigoMoneda) {
        try {
            const response = await axios.post(
                API_URL,
                `<?xml version="1.0" encoding="utf-8"?>
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
          <soapenv:Header/>
          <soapenv:Body>
            <tem:ObtenerTasa>
              <tem:codigoMoneda>${codigoMoneda}</tem:codigoMoneda>
            </tem:ObtenerTasa>
          </soapenv:Body>
        </soapenv:Envelope>`,
                {
                    headers: {
                        'Content-Type': 'text/xml; charset=utf-8',
                        'SOAPAction': 'http://tempuri.org/ITasaCambioServiceSoap/ObtenerTasa'
                    }
                }
            );
            return this.parseTasaResponse(response.data);
        } catch (error) {
            console.error('Error fetching exchange rate:', error);
            throw error;
        }
    },

    parseTasaResponse(xml) {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xml, "text/xml");
        const tasa = xmlDoc.getElementsByTagName("TasaCambiaria")[0];

        return {
            id: parseInt(tasa.getElementsByTagName("Id")[0].textContent),
            codigoMoneda: tasa.getElementsByTagName("CodigoMoneda")[0].textContent,
            monto: parseFloat(tasa.getElementsByTagName("Monto")[0].textContent),
            fechaActualizacion: new Date(tasa.getElementsByTagName("FechaActualizacion")[0].textContent)
        };
    }
};