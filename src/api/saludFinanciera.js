import axios from 'axios';

const API_URL = '/api/SaludFinanciera.asmx';

export default {
    async consultarSaludFinanciera(cedulaRnc) {
        try {
            const response = await axios.post(
                API_URL,
                `<?xml version="1.0" encoding="utf-8"?>
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
          <soapenv:Header/>
          <soapenv:Body>
            <tem:ConsultarSaludFinanciera>
              <tem:cedulaRnc>${cedulaRnc}</tem:cedulaRnc>
            </tem:ConsultarSaludFinanciera>
          </soapenv:Body>
        </soapenv:Envelope>`,
                {
                    headers: {
                        'Content-Type': 'text/xml; charset=utf-8',
                        'SOAPAction': 'http://tempuri.org/ISaludFinancieraServiceSoap/ConsultarSaludFinanciera'
                    }
                }
            );
            return this.parseSaludResponse(response.data);
        } catch (error) {
            console.error('Error fetching financial health:', error);
            throw error;
        }
    },

    parseSaludResponse(xml) {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xml, "text/xml");
        const salud = xmlDoc.getElementsByTagName("SaludFinanciera")[0];

        return {
            cedulaRnc: salud.getElementsByTagName("CedulaRnc")[0].textContent,
            indicadorSalud: salud.getElementsByTagName("IndicadorSalud")[0].textContent,
            montoTotalAdeudado: parseFloat(salud.getElementsByTagName("MontoTotalAdeudado")[0].textContent),
            fechaConsulta: new Date(salud.getElementsByTagName("FechaConsulta")[0].textContent)
        };
    }
};