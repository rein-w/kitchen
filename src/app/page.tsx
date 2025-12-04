import OptimizedImage from "@/components/OptimizedImage";

export default function Home() {
  return (
    <div className="bg-white">
      <div className="px-4 sm:px-8 lg:px-16 space-y-1.5">
        <div className="w-full">
          <OptimizedImage
            src="hero.jpg"
            alt="Kitchen hero image"
            width={1920}
            height={1080}
            className="w-full h-auto object-cover"
            priority
          />
        </div>
        <div className="w-full">
          <OptimizedImage
            src="hero2.jpg"
            alt="Kitchen hero image 2"
            width={1920}
            height={1080}
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </div>
  );
}
