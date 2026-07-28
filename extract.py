import subprocess

times = ['00:00:00', '00:00:23', '00:00:30', '00:00:36']
frames = ['frame_00.jpg', 'frame_23.jpg', 'frame_30.jpg', 'frame_36.jpg']

for t, f in zip(times, frames):
    subprocess.run(['/usr/bin/ffmpeg', '-y', '-i', '/root/goobet/vedio.mp4', '-ss', t, '-vframes', '1', f'/root/goobet/frames/{f}'])

print("Extracted")
