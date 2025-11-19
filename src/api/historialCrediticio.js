import axios from 'axios';

const API_URL = '/api/HistorialCrediticio.asmx';

export default {
    async consultarHistorial(cedulaRnc) {
        try {
            const response = await axios.post(
                API_URL,
                `<?xml version="1.0" encoding="utf-8"?>
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
          <soapenv:Header/>
          <soapenv:Body>
            <tem:ConsultarHistorial>
              <tem:cedulaRnc>${cedulaRnc}</tem:cedulaRnc>
            </tem:ConsultarHistorial>
          </soapenv:Body>
        </soapenv:Envelope>`,
                {
                    headers: {
                        'Content-Type': 'text/xml; charset=utf-8',
                        'SOAPAction': 'http://tempuri.org/IHistorialCrediticioServiceSoap/ConsultarHistorial'
                    }
                }
            );
            return this.parseHistorialResponse(response.data);
        } catch (error) {
            console.error('Error fetching credit history:', error);
            throw error;
        }
    },

    parseHistorialResponse(xml) {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xml, "text/xml");
        const items = xmlDoc.getElementsByTagName("HistorialCrediticio");

        return Array.from(items).map(item => ({
            id: parseInt(item.getElementsByTagName("Id")[0].textContent),
            rncEmpresa: item.getElementsByTagName("RncEmpresa")[0].textContent,
            conceptoDeuda: item.getElementsByTagName("ConceptoDeuda")[0].textContent,
            fecha: new Date(item.getElementsByTagName("Fecha")[0].textContent),
            montoAdeudado: parseFloat(item.getElementsByTagName("MontoAdeudado")[0].textContent),
            clienteCedulaRnc: item.getElementsByTagName("ClienteCedulaRnc")[0].textContent
        }));
    }
};