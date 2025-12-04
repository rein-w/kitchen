interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
}: OptimizedImageProps) {
  // Extract base name without extension
  const baseName = src.replace(/\.[^/.]+$/, "");

  // Construct optimized image paths
  const webpSrc = `/optimized/${baseName}.webp`;
  const webpMobileSrc = `/optimized/${baseName}-mobile.webp`;
  const fallbackExt = src.endsWith('.png') ? 'png' : 'jpg';
  const fallbackSrc = `/optimized/${baseName}.${fallbackExt}`;

  return (
    <picture>
      <source
        srcSet={webpMobileSrc}
        media="(max-width: 768px)"
        type="image/webp"
      />
      <source srcSet={webpSrc} type="image/webp" />
      <img
        src={fallbackSrc}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
      />
    </picture>
  );
}
