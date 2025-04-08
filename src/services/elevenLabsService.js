import { ElevenLabs } from 'elevenlabs';

const elevenLabs = new ElevenLabs({
    apiKey: import.meta.env.VITE_ELEVENLABS_API_KEY
});

export const textToSpeech = async (text) => {
    try {
        const audio = await elevenLabs.textToSpeech({
            text: text,
            voiceId: import.meta.env.VITE_VOICE_ID,
            modelId: "eleven_multilingual_v2"
        });
        return audio;
    } catch (error) {
        console.error('Error al convertir texto a voz:', error);
        throw error;
    }
}; 