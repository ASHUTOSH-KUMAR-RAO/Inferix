import speech_recognition as sr
import io


class VoiceService:

    async def transcribe(self, audio_bytes: bytes) -> str:
        """
        Transcribe audio bytes to text using SpeechRecognition library.
        Uses Google Speech Recognition (free, no API key needed).
        Audio should be in WAV, AIFF, or FLAC format.
        """
        recognizer = sr.Recognizer()

        try:
            # Convert bytes to AudioFile
            audio_file = io.BytesIO(audio_bytes)
            with sr.AudioFile(audio_file) as source:
                audio_data = recognizer.record(source)

            # Transcribe using Google Speech Recognition
            text = recognizer.recognize_google(audio_data)
            return text

        except sr.UnknownValueError:
            raise Exception("Could not understand the audio")
        except sr.RequestError as e:
            raise Exception(f"Speech recognition service error: {e}")
        except Exception as e:
            raise Exception(f"Transcription error: {str(e)}")


# Singleton instance
voice_service = VoiceService()
