import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen pt-10 md:pt-14 pb-16 md:pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0">
        {/* Left: Image */}
        <div className="px-0 sm:px-8 lg:px-16">
          <Image
            src="/about.jpg"
            alt="About Rein"
            width={1200}
            height={1600}
            className="w-full aspect-square sm:aspect-auto sm:h-auto object-cover sm:object-contain"
            priority
          />
        </div>

        {/* Right: Content */}
        <div className="px-6 sm:px-12 lg:pl-16 lg:pr-24 py-8 lg:py-20 flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-light text-black tracking-wide mb-12" style={{ fontFamily: 'var(--font-serif)' }}>
            About Rein
          </h1>

          <div className="space-y-5 text-gray-700 font-light leading-snug text-[14px]">
            <p>
              Rein is a personal culinary project born from a deep passion for cooking and a desire to share memorable dining experiences with friends and loved ones.
            </p>

            <p>
              What started as experimental dinners in a home kitchen has evolved into intimate, reservation-only events where guests can enjoy thoughtfully crafted multi-course menus in a relaxed, welcoming atmosphere.
            </p>

            <p>
              Each menu is carefully curated to highlight seasonal ingredients, drawing inspiration from global cuisines while maintaining a focus on simplicity and flavour. The goal is never perfection, but rather the joy of cooking and the connections made around the table.
            </p>

            <p>
              This is not a commercial restaurant — it is a passion project, a space to learn, experiment, and grow as a home cook. Every event is an opportunity to refine techniques, try new ideas, and create dishes that bring people together.
            </p>

            <p>
              Thank you for being part of this journey.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
