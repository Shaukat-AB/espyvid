const labelArr = [
  "All",
  "React js",
  "Minecraft",
  "PodCast",
  "Blender 3D",
  "Diablo 4",
  "Computer Programming",
  "Godot Game Engine",
  "Data Structures",
];

const setOptions = [ // settings Options used in Settings.jsx
    { title: "theme", options: ["light", "dark"] },
    { title: "thumbnail", options: ["low", "medium", "high"] },
    {
      title: "region-code",
      options: [
        "pk",
        "us",
        "uk",
        "cn",
        "au",
        "de",
        "jp",
        "in",
        "kr",
        "lk",
        "ca",
      ],
    },
  ];

const apiKey = import.meta.env.VITE_YouTube_API_KEY;
const base = "https://youtube.googleapis.com/youtube/v3";

let publishedAfter = new Date(Date.now() - 150 * 24 * 60 * 60 * 1000);
publishedAfter = encodeURIComponent(publishedAfter.toJSON());

export { labelArr, setOptions, apiKey, base, publishedAfter };
