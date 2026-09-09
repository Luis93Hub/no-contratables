(function() {
  "use strict";

  // DATOS DE CANCIONES
  const songs = [
    { title: "Granito de mostaza", url: "https://youtu.be/U5vImS5ZJTo" },
    { title: "Alaba", url: "https://youtu.be/9BH0tjYJFJU" },
    { title: "En mi casita", url: "https://youtu.be/fLnyARQUIBc" },
    { title: "Diablo mentiroso eres un payaso", url: "https://youtu.be/_njV6Qnq7S8" },
    { title: "Yo le alabo de corazón", url: "https://youtu.be/JiQjhwp2LCI" }
  ];

  // función para extraer el ID de YouTube
  function extractVideoId(url) {
    if (!url) return null;
    let match = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
    if (match) return match[1];
    match = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
    if (match) return match[1];
    match = url.match(/embed\/([a-zA-Z0-9_-]{11})/);
    if (match) return match[1];
    return null;
  }

  // Crear tarjeta de canción
  function createSongCard(song, index) {
    const videoId = extractVideoId(song.url);
    const card = document.createElement('div');
    card.className = 'song-card';

    // Título
    const titleDiv = document.createElement('div');
    titleDiv.className = 'song-title';
    titleDiv.innerHTML = `<i class="fas fa-music"></i> ${song.title}`;
    card.appendChild(titleDiv);

    // Reproductor
    const metaDiv = document.createElement('div');
    metaDiv.className = 'song-meta';

    const playerWrapper = document.createElement('div');
    playerWrapper.className = 'player-wrapper';

    // Iframe de YouTube
    const iframe = document.createElement('iframe');
    iframe.width = "120";
    iframe.height = "60";
    iframe.loading = "lazy";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;
    if (videoId) {
      iframe.src = `https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0&controls=1&showinfo=0&autohide=1&iv_load_policy=3`;
    } else {
      iframe.src = `https://www.youtube.com/embed/?modestbranding=1`;
    }
    playerWrapper.appendChild(iframe);

    // Botón YouTube
    const btnYoutube = document.createElement('a');
    btnYoutube.className = 'btn-youtube';
    btnYoutube.href = song.url;
    btnYoutube.target = '_blank';
    btnYoutube.rel = 'noopener noreferrer';
    btnYoutube.innerHTML = `<i class="fab fa-youtube"></i> YouTube`;
    playerWrapper.appendChild(btnYoutube);

    metaDiv.appendChild(playerWrapper);
    card.appendChild(metaDiv);

    // Footer (CORREGIDO: se agregó el cierre de comillas correcto)
    const footerSong = document.createElement('div');
    footerSong.className = 'song-footer';
    footerSong.innerHTML = `<i class="fas fa-headphones-alt"></i> track ${index+1} · Los Pro`;
    card.appendChild(footerSong);

    return card;
  }

  // Renderizar todas las canciones
  const grid = document.getElementById('songGrid');
  if (grid) {
    songs.forEach((song, idx) => {
      const card = createSongCard(song, idx);
      grid.appendChild(card);
    });
  }

  console.log('🎸 Los Pro · "Immeasurable God"');
})();
