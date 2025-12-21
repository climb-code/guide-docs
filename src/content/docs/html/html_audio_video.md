---
title: HTML Audio and Video
description: Learn how to embed and control audio and video in HTML using the audio and video elements, with formats, controls, and accessibility features.
---

Audio and video elements allow you to embed multimedia directly into web pages without plugins. Learn how to use them effectively.

## HTML Video Element

### Basic Video

```html
<video src="movie.mp4" controls>
    Your browser does not support the video element.
</video>
```

### Video with Attributes

```html
<video 
    src="movie.mp4"
    controls              <!-- Show playback controls -->
    width="640"
    height="360"
    poster="thumbnail.jpg"  <!-- Thumbnail before play -->
    preload="metadata"      <!-- How to preload -->
    loop                    <!-- Loop playback -->
    muted                   <!-- Start muted -->
    autoplay                <!-- Auto play (use carefully!) -->
>
    Your browser does not support the video element.
</video>
```

### Multiple Video Sources

Provide multiple formats for browser compatibility:

```html
<video controls width="640" height="360">
    <source src="movie.mp4" type="video/mp4">
    <source src="movie.webm" type="video/webm">
    <source src="movie.ogv" type="video/ogg">
    Your browser does not support the video element.
</video>
```

## Video Attributes

### Controls

```html
<!-- Show default browser controls -->
<video src="movie.mp4" controls></video>

<!-- No controls (custom controls via JavaScript) -->
<video src="movie.mp4"></video>
```

### Autoplay and Muted

```html
<!-- Autoplay (must be muted in most browsers) -->
<video src="movie.mp4" autoplay muted></video>

<!-- Autoplay with sound (often blocked) -->
<video src="movie.mp4" autoplay></video>
```

**Note:** Most browsers block autoplay with sound to improve user experience.

### Loop

```html
<!-- Loop video continuously -->
<video src="background.mp4" loop autoplay muted></video>
```

### Poster

```html
<!-- Show thumbnail before playing -->
<video src="movie.mp4" controls poster="thumbnail.jpg"></video>
```

### Preload

```html
<!-- Don't preload (save bandwidth) -->
<video src="movie.mp4" controls preload="none"></video>

<!-- Preload metadata only (duration, dimensions) -->
<video src="movie.mp4" controls preload="metadata"></video>

<!-- Preload entire video -->
<video src="movie.mp4" controls preload="auto"></video>
```

### Playback Speed

```html
<!-- Default playback rate -->
<video src="movie.mp4" controls playbackRate="1.0"></video>

<!-- Faster playback -->
<video src="movie.mp4" controls playbackRate="1.5"></video>
```

## Video Formats

### Common Video Formats

| Format | MIME Type | Browser Support |
|--------|-----------|-----------------|
| MP4 (H.264) | video/mp4 | Excellent (all modern browsers) |
| WebM | video/webm | Good (Chrome, Firefox, Edge) |
| Ogg | video/ogg | Fair (Firefox, Chrome) |

### Best Practice: Multiple Formats

```html
<video controls width="640" height="360" poster="poster.jpg">
    <!-- MP4 for broad compatibility -->
    <source src="video.mp4" type="video/mp4">
    
    <!-- WebM for better compression -->
    <source src="video.webm" type="video/webm">
    
    <!-- Fallback message -->
    <p>
        Your browser doesn't support HTML5 video. 
        <a href="video.mp4">Download the video</a> instead.
    </p>
</video>
```

## HTML Audio Element

### Basic Audio

```html
<audio src="music.mp3" controls>
    Your browser does not support the audio element.
</audio>
```

### Audio with Attributes

```html
<audio 
    src="music.mp3"
    controls
    loop
    autoplay
    muted
    preload="auto"
>
    Your browser does not support the audio element.
</audio>
```

### Multiple Audio Sources

```html
<audio controls>
    <source src="audio.mp3" type="audio/mpeg">
    <source src="audio.ogg" type="audio/ogg">
    <source src="audio.wav" type="audio/wav">
    Your browser does not support the audio element.
</audio>
```

## Audio Formats

### Common Audio Formats

| Format | MIME Type | Browser Support |
|--------|-----------|-----------------|
| MP3 | audio/mpeg | Excellent (all browsers) |
| Ogg Vorbis | audio/ogg | Good (Firefox, Chrome, Opera) |
| WAV | audio/wav | Good (most browsers) |
| AAC | audio/aac | Good (Safari, Chrome) |

### Best Practice: Multiple Formats

```html
<audio controls>
    <!-- MP3 for broad compatibility -->
    <source src="audio.mp3" type="audio/mpeg">
    
    <!-- Ogg for Firefox -->
    <source src="audio.ogg" type="audio/ogg">
    
    <!-- Fallback -->
    <p>
        Your browser doesn't support HTML5 audio.
        <a href="audio.mp3">Download the audio</a> instead.
    </p>
</audio>
```

## Subtitles and Captions

### Adding Subtitles with Track

```html
<video controls width="640" height="360">
    <source src="movie.mp4" type="video/mp4">
    
    <!-- English subtitles (default) -->
    <track 
        kind="subtitles"
        src="subtitles-en.vtt"
        srclang="en"
        label="English"
        default
    >
    
    <!-- Spanish subtitles -->
    <track 
        kind="subtitles"
        src="subtitles-es.vtt"
        srclang="es"
        label="Español"
    >
    
    <!-- Closed captions -->
    <track 
        kind="captions"
        src="captions-en.vtt"
        srclang="en"
        label="English Captions"
    >
</video>
```

### Track Kinds

```html
<!-- Subtitles (translation) -->
<track kind="subtitles" src="subs.vtt" srclang="en">

<!-- Captions (includes sound effects) -->
<track kind="captions" src="captions.vtt" srclang="en">

<!-- Descriptions (for visually impaired) -->
<track kind="descriptions" src="desc.vtt" srclang="en">

<!-- Chapters (navigation) -->
<track kind="chapters" src="chapters.vtt" srclang="en">

<!-- Metadata -->
<track kind="metadata" src="metadata.vtt">
```

### VTT File Format

```
WEBVTT

00:00:00.000 --> 00:00:05.000
Welcome to our video tutorial.

00:00:05.000 --> 00:00:10.000
Today we'll learn about HTML video elements.

00:00:10.000 --> 00:00:15.000
Let's get started!
```

## Practical Examples

### Video Player with Poster

```html
<figure>
    <video 
        controls
        width="800"
        height="450"
        poster="video-poster.jpg"
        preload="metadata"
    >
        <source src="tutorial.mp4" type="video/mp4">
        <source src="tutorial.webm" type="video/webm">
        
        <track 
            kind="subtitles"
            src="subtitles.vtt"
            srclang="en"
            label="English"
            default
        >
        
        <p>
            Your browser doesn't support HTML5 video.
            <a href="tutorial.mp4">Download the video</a>.
        </p>
    </video>
    <figcaption>Tutorial: Getting Started with HTML</figcaption>
</figure>
```

### Background Video

```html
<div class="hero-section">
    <video 
        autoplay
        muted
        loop
        playsinline
        class="background-video"
    >
        <source src="background.mp4" type="video/mp4">
        <source src="background.webm" type="video/webm">
    </video>
    
    <div class="hero-content">
        <h1>Welcome to Our Site</h1>
        <p>Amazing content over video background</p>
    </div>
</div>
```

### Audio Playlist

```html
<section>
    <h2>Music Playlist</h2>
    
    <article>
        <h3>Track 1: Summer Vibes</h3>
        <audio controls>
            <source src="track1.mp3" type="audio/mpeg">
            <source src="track1.ogg" type="audio/ogg">
        </audio>
    </article>
    
    <article>
        <h3>Track 2: Chill Beats</h3>
        <audio controls>
            <source src="track2.mp3" type="audio/mpeg">
            <source src="track2.ogg" type="audio/ogg">
        </audio>
    </article>
    
    <article>
        <h3>Track 3: Upbeat Energy</h3>
        <audio controls>
            <source src="track3.mp3" type="audio/mpeg">
            <source src="track3.ogg" type="audio/ogg">
        </audio>
    </article>
</section>
```

### Podcast Player

```html
<article class="podcast-episode">
    <h2>Episode 42: Web Development Tips</h2>
    <p>Published on <time datetime="2024-01-15">January 15, 2024</time></p>
    
    <audio controls preload="metadata">
        <source src="episode-42.mp3" type="audio/mpeg">
        <source src="episode-42.ogg" type="audio/ogg">
        Your browser doesn't support the audio element.
    </audio>
    
    <p>
        In this episode, we discuss modern web development practices...
    </p>
    
    <a href="episode-42.mp3" download>Download Episode</a>
</article>
```

### Video Gallery

```html
<section class="video-gallery">
    <h2>Video Tutorials</h2>
    
    <div class="video-grid">
        <article>
            <video controls width="400" poster="thumb1.jpg">
                <source src="tutorial1.mp4" type="video/mp4">
            </video>
            <h3>HTML Basics</h3>
        </article>
        
        <article>
            <video controls width="400" poster="thumb2.jpg">
                <source src="tutorial2.mp4" type="video/mp4">
            </video>
            <h3>CSS Styling</h3>
        </article>
        
        <article>
            <video controls width="400" poster="thumb3.jpg">
                <source src="tutorial3.mp4" type="video/mp4">
            </video>
            <h3>JavaScript Intro</h3>
        </article>
    </div>
</section>
```

## JavaScript Control (Bonus)

### Basic Video Control

```html
<video id="myVideo" width="640" height="360">
    <source src="movie.mp4" type="video/mp4">
</video>

<button onclick="playVideo()">Play</button>
<button onclick="pauseVideo()">Pause</button>
<button onclick="stopVideo()">Stop</button>

<script>
    const video = document.getElementById('myVideo');
    
    function playVideo() {
        video.play();
    }
    
    function pauseVideo() {
        video.pause();
    }
    
    function stopVideo() {
        video.pause();
        video.currentTime = 0;
    }
</script>
```

### Volume Control

```html
<video id="myVideo" src="movie.mp4" controls></video>

<input type="range" min="0" max="1" step="0.1" value="1" 
       oninput="changeVolume(this.value)">

<script>
    const video = document.getElementById('myVideo');
    
    function changeVolume(volume) {
        video.volume = volume;
    }
</script>
```

## Accessibility Best Practices

### Always Provide Alternatives

```html
<video controls>
    <source src="video.mp4" type="video/mp4">
    
    <!-- Captions for hearing impaired -->
    <track kind="captions" src="captions.vtt" srclang="en" default>
    
    <!-- Audio description for visually impaired -->
    <track kind="descriptions" src="descriptions.vtt" srclang="en">
    
    <!-- Fallback content -->
    <p>
        Your browser doesn't support video.
        <a href="video.mp4">Download the video</a> or
        <a href="transcript.html">read the transcript</a>.
    </p>
</video>
```

### Provide Transcripts

```html
<video controls src="lecture.mp4"></video>

<details>
    <summary>Video Transcript</summary>
    <p>
        Welcome to today's lecture on HTML...
        [Full transcript here]
    </p>
</details>
```

### Keyboard Controls

```html
<!-- Ensure controls are keyboard accessible -->
<video controls src="movie.mp4"></video>

<!-- Custom controls should be keyboard accessible -->
<button aria-label="Play video" onclick="playVideo()">▶</button>
<button aria-label="Pause video" onclick="pauseVideo()">⏸</button>
```

## Performance Tips

### Lazy Loading

```html
<!-- Don't preload unless necessary -->
<video src="movie.mp4" controls preload="none"></video>

<!-- For below-fold videos -->
<video src="movie.mp4" controls preload="metadata" loading="lazy"></video>
```

### Optimize Video Files

```html
<!-- Compressed videos -->
<video controls>
    <!-- Lower quality for mobile -->
    <source 
        src="video-mobile.mp4" 
        type="video/mp4"
        media="(max-width: 600px)"
    >
    
    <!-- Higher quality for desktop -->
    <source 
        src="video-desktop.mp4"
        type="video/mp4"
    >
</video>
```

### Poster Images

```html
<!-- Show poster while loading -->
<video 
    src="large-video.mp4"
    controls
    poster="optimized-poster.jpg"
    preload="none"
></video>
```

## Best Practices

1. **Always include fallback content**: For browsers that don't support video/audio
2. **Provide multiple formats**: MP4 for video, MP3 for audio at minimum
3. **Use captions and subtitles**: Improves accessibility
4. **Don't autoplay with sound**: Most browsers block it anyway
5. **Optimize file sizes**: Compress videos and audio
6. **Use appropriate preload settings**: Balance UX and performance
7. **Include poster images**: Improve perceived performance
8. **Provide transcripts**: Essential for accessibility
9. **Test on multiple devices**: Ensure compatibility
10. **Use appropriate dimensions**: Match your layout

## Common Mistakes

```html
<!-- ❌ Autoplay with sound (blocked by browsers) -->
<video src="ad.mp4" autoplay></video>

<!-- ❌ No fallback content -->
<video src="movie.mp4" controls></video>

<!-- ❌ Single format only -->
<video src="movie.mov" controls></video>

<!-- ❌ Missing captions -->
<video src="tutorial.mp4" controls></video>

<!-- ✅ Correct approach -->
<video controls width="640" height="360" poster="thumb.jpg">
    <source src="video.mp4" type="video/mp4">
    <source src="video.webm" type="video/webm">
    
    <track kind="captions" src="captions.vtt" srclang="en" default>
    
    <p>
        Your browser doesn't support video. 
        <a href="video.mp4">Download</a> or
        <a href="transcript.html">read transcript</a>.
    </p>
</video>
```

## Summary

- Use `<video>` for video, `<audio>` for audio
- Provide multiple formats for browser compatibility
- Include controls for user interaction
- Add captions/subtitles for accessibility
- Use poster images for videos
- Don't autoplay with sound
- optimize file sizes for performance
- Provide fallback content and transcripts
- Use appropriate preload settings
- Test across browsers and devices

Multimedia elements enhance user experience when used properly and accessibly!
