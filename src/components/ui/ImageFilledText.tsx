interface ImageFilledTextProps {
  text: string;
  imageUrl: string;
  className?: string;
}

const ImageFilledText = ({
  text = "7-9 MAR 2025",
  imageUrl = "../blue.jpg",
  className = "",
}: ImageFilledTextProps) => {
  return (
    <div className="relative inline-block">
      <div
        className={`relative font-bold ${className}`}
        style={{
          WebkitTextFillColor: "transparent",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "contrast(1.1) brightness(0.9)",
        }}
      >
        {text}
      </div>

      <div
        className="absolute inset-0 font-bold"
        style={{
          WebkitTextStroke: "1px rgba(255,255,255,0.1)",
          color: "transparent",
          userSelect: "none",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      >
        {text}
      </div>
    </div>
  );
};

export default ImageFilledText;