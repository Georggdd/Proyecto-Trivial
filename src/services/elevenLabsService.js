import axios from 'axios';

export const textToSpeech = async (text) => {
    try {
        const apiKey = import.meta.env.VITE_ELEVENLABS_API_KEY;
        // Cambiamos a la voz de Antoni, que es una voz masculina con acento español
        const voiceId = "ErXwobaYiN019PkySvjV"; // Antoni - voz masculina hispana
        
        console.log('Usando API Key:', apiKey ? `${apiKey.substring(0, 5)}...${apiKey.substring(apiKey.length - 5)}` : 'No definida');
        console.log('Usando Voice ID:', voiceId || 'No definido');
        
        // Crear una instancia de axios con la configuración correcta
        const elevenlabsApi = axios.create({
            baseURL: 'https://api.elevenlabs.io',
            headers: {
                'xi-api-key': apiKey,
                'Content-Type': 'application/json'
            }
        });
        
        // Estructura correcta de la solicitud según la documentación de ElevenLabs
        const payload = {
            text: text,
            model_id: "eleven_multilingual_v2", // Esto es el modelo, no la voz
            voice_settings: {
                stability: 0.5,
                similarity_boost: 0.75
            }
        };
        
        // Hacer la solicitud directamente sin usar el proxy
        const response = await elevenlabsApi.post(
            `/v1/text-to-speech/${voiceId}`,
            payload,
            { responseType: 'arraybuffer' }
        );
        
        return response.data;
    } catch (error) {
        console.error('Error al convertir texto a voz:', error);
        
        // Intentar extraer más información del error
        if (error.response) {
            const responseData = error.response.data;
            
            // Si es un arraybuffer, convertir a texto para ver el mensaje de error
            if (responseData instanceof ArrayBuffer) {
                try {
                    const decoder = new TextDecoder('utf-8');
                    const errorText = decoder.decode(responseData);
                    console.error('Respuesta de error:', errorText);
                    
                    // Intentar analizar el JSON si es posible
                    try {
                        const errorJson = JSON.parse(errorText);
                        console.error('Detalles del error:', errorJson);
                        
                        // Si es un error de voz no encontrada, personalizamos el error
                        if (errorJson.detail && errorJson.detail.status === "voice_not_found") {
                            const customError = new Error("La voz especificada no se encuentra disponible en ElevenLabs");
                            customError.status = 404;
                            customError.code = "VOICE_NOT_FOUND";
                            throw customError;
                        }
                    } catch (e) {
                        console.error('No se pudo analizar la respuesta de error como JSON');
                    }
                } catch (e) {
                    console.error('Error al decodificar la respuesta:', e);
                }
            } else {
                console.error('Respuesta de error:', responseData);
            }
            
            console.error('Estado de error:', error.response.status);
            console.error('Cabeceras de error:', error.response.headers);
        }
        
        throw error;
    }
}; 