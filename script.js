console.log("Welcome to Spotify");
let songIndex = 0;
let audioElement = new Audio('songs/3.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItem = Array.from(document.getElementsByClassName('songItem'));
let songs = [
  { songName: "Tujhe Sochta hoon", filePath: "songs/1.mp3", coverPath: "1.jpg" },
  { songName: "Kya Mujhe Pyar Hai", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
  { songName: "Masakali", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
  { songName: "Dil Ibaadat", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
  { songName: "Tum Ho", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
  { songName: "Tujhe Bula Diya", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
  { songName: "Dooriya", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
  { songName: "Tu Hi Haqeeqat", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
  { songName: "Kudha Jaane", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" },
  { songName: "Zara Sa", filePath: "songs/10.mp3", coverPath: "covers/10.jpg" },
  { songName: "Tu Hi Meri Shab Hai", filePath: "songs/11.mp3", coverPath: "covers/11.jpg" },
];

$(document).ready(function() {
  var slides = $('.slideshow img');
  var currentSlide = 0;

  function showSlide(index) {
    slides.removeClass('active');
    slides.eq(index).addClass('active');
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  setInterval(nextSlide, 3300); // Change slide every 3 seconds
});

songItem.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

audioElement.play();

audioElement.addEventListener('timeupdate', () => {
  const progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
  audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.classList.remove('fa-pause-circle');
    element.classList.add('fa-play-circle');
  });
};

Array.from(document.getElementsByClassName('songItemPlay')).forEach(element => {
  element.addEventListener('click', (e) => {
    const index = parseInt(e.target.id);
    makeAllPlays();
    e.target.classList.remove('fa-play-circle');
    e.target.classList.add('fa-pause-circle');

    if (audioElement.paused || audioElement.currentTime <= 0 || songIndex !== index) {
      audioElement.src = `songs/${index + 1}.mp3`;
      audioElement.currentTime = 0;
      audioElement.play();
    } else {
      audioElement.pause();
    }

    songIndex = index;
  });
});
