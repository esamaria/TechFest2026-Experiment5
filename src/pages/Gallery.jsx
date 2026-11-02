function Gallery() {
  const images = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwHHlxIftn3eup4U8DRQZnC_ejciVKOYCboKtEr1cqAw&s=10",

  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8D9wVCEbUnhzzcGNxzPPdw-j8STDAbGtpMMSSijAmWw&s=10",

  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQS3F_67CayIt0H_Jvif417EgIW4dTzJzbzjyJQ8PMYA&s=10",

  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4",

  "https://images.unsplash.com/photo-1531482615713-2afd69097998",

  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",

  "https://images.unsplash.com/photo-1517048676732-d65bc937f952",

  "https://images.unsplash.com/photo-1540575467063-178a50c2df87",

  "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b",

  "https://images.unsplash.com/photo-1524178232363-1fb2b075b655",

  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSJVbpKzOOPQh5P4Iu6uIuhI9tauM43E5gCn4Ut5uNFg&s=10",

  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7h-38xAM3-1AwGq6p40U8snMk7RuK3VhhCYlQ3kDJOQ&s=10"
];

  return (
    <div className="page">
      <h1>Gallery</h1>

      <div className="gallery-grid">
        {images.map((src, index) => (
          <img key={index} src={src} alt={`TechFest event gallery ${index + 1}`} loading="lazy" decoding="async" />
        ))}
      </div>
    </div>
  );
}

export default Gallery;