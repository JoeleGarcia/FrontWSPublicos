import axios from 'axios';

const API_URL = 'https://localhost:7258/ReporteUso.asmx';

export default {
    async consultarUsoServicios(nombreServicio, fechaInicio, fechaFin) {
        try {
            const response = await axios.post(API_URL,
                `<?xml version="1.0" encoding="utf-8"?>
        <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
          <soap:Body>
            <ConsultarUsoServicios xmlns="http://tempuri.org/">
              ${nombreServicio ? `<nombreServicio>${nombreServicio}</nombreServicio>` : ''}
              ${fechaInicio ? `<fechaInicio>${fechaInicio.toISOString()}</fechaInicio>` : ''}
              ${fechaFin ? `<fechaFin>${fechaFin.toISOString()}</fechaFin>` : ''}
            </ConsultarUsoServicios>
          </soap:Body>
        </soap:Envelope>`,
                {
                    headers: {
                        'Content-Type': 'text/xml; charset=utf-8',
                        'SOAPAction': 'http://tempuri.org/IReporteUsoServiceSoap/ConsultarUsoServicios'
                    }
                }
            );
            return parseReporteResponse(response.data);
        } catch (error) {
            console.error('Error fetching usage report:', error);
            throw error;
        }
    }
};

function parseReporteResponse(xml) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, "text/xml");
    const registros = Array.from(xmlDoc.getElementsByTagName("RegistroUsoResponse"));

    return registros.map(registro => ({
        id: parseInt(registro.getElementsByTagName("Id")[0].textContent),
        nombreServicio: registro.getElementsByTagName("NombreServicio")[0].textContent,
        fechaInvocacion: new Date(registro.getElementsByTagName("FechaInvocacion")[0].textContent)
    }));
}