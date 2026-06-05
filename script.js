const generateBtn = document.getElementById('generateBtn');
const downloadBtn = document.getElementById('downloadBtn');
const themeToggle = document.getElementById('themeToggle');
const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const audioPlayer = document.getElementById('audioPlayer');
const waveformContainer = document.getElementById('waveform');

// Theme toggle
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

// Waveform initialization
const wavesurfer = WaveSurfer.create({
  container: waveformContainer,
  waveColor: '#a855f7',
  progressColor: '#6b21a8',
  height: 80
});

// Generate TTS audio (ElevenLabs API placeholder)
generateBtn.addEventListener('click', async () => {
  const text = outputText.value.trim();
  if (!text) return alert('Myanmar script ထည့်ပါ');

  // === ElevenLabs API Integration ===
  // Replace YOUR_API_KEY and VOICE_ID with your own credentials
  try {
    const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/<VOICE_ID>', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': 'YOUR_API_KEY'
      },
      body: JSON.stringify({ text })
    });

    if (!response.ok) throw new Error('TTS API error');

    const arrayBuffer = await response.arrayBuffer();
    const blob = new Blob([arrayBuffer], { type: 'audio/mpeg' });
    const url = URL.createObjectURL(blob);

    audioPlayer.src = url;
    wavesurfer.load(url);

  } catch (err) {
    alert('TTS API failed, falling back to browser SpeechSynthesis');

    // Browser fallback
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'my-MM';
    utterance.rate = 1;
    utterance.pitch = 1;
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);

    // Dummy waveform for fallback
    const dummyUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
    audioPlayer.src = dummyUrl;
    wavesurfer.load(dummyUrl);
  }
});

// Download audio
downloadBtn.addEventListener('click', () => {
  if (!audioPlayer.src) return;
  const a = document.createElement('a');
  a.href = audioPlayer.src;
  a.download = 'MVoice_output.mp3';
  a.click();
});
