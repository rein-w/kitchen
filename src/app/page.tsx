import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-white">
      <div className="px-4 sm:px-8 lg:px-16">
        <div className="w-full">
          <Image
            src="/hero.jpg"
            alt="Kitchen hero image"
            width={1920}
            height={1080}
            className="w-full h-auto object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
}
