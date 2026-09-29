import json, base64, io, sys, time, re
import numpy as np, soundfile as sf
from kokoro_onnx import Kokoro
lines = json.load(open('lines.json'))
k = Kokoro('kokoro/kokoro-v1.0.onnx', 'kokoro/voices-v1.0.bin')
import os
old = json.load(open('voice.json')) if os.path.exists('voice.json') else {}
out, t0 = {}, time.time()
for i, text in enumerate(lines):
    if text in old: out[text] = old[text]; continue
    # pronunciation fixes for words spelled the same but said differently (all our "live" lines mean "to live": short i)
    if re.search(r"\blive[sd]?\b", text, re.I):
        ph = k.tokenizer.phonemize(text, 'en-us').replace('lˈaɪv', 'lˈɪv').replace('laɪv', 'lɪv')
        x, sr = k.create(ph, voice='af_heart', speed=0.9, lang='en-us', is_phonemes=True)
    else:
        x, sr = k.create(text, voice='af_heart', speed=0.9, lang='en-us')
    x = np.asarray(x, dtype=np.float32)
    thr = 10 ** (-45 / 20); idx = np.where(np.abs(x) > thr)[0]
    if len(idx): x = x[max(0, idx[0] - int(sr * .01)): idx[-1] + int(sr * .03)]
    f = min(len(x) // 3, int(sr * .02)); x[-f:] *= np.linspace(1, 0, f)
    x = x * (10 ** (-1.5 / 20) / max(1e-6, np.abs(x).max()))
    buf = io.BytesIO(); sf.write(buf, x, sr, format='OGG', subtype='OPUS', compression_level=0.88)
    out[text] = 'data:audio/ogg;base64,' + base64.b64encode(buf.getvalue()).decode()
    if i % 20 == 0: print(i, round(time.time() - t0), 'sec', len(buf.getvalue()), 'bytes', flush=True)
json.dump(out, open('voice.json', 'w'))
print('done', len(out), sum(len(v) for v in out.values()))
