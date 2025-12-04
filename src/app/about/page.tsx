import OptimizedImage from "@/components/OptimizedImage";

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen pt-10 md:pt-14 pb-16 md:pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0">
        {/* Left: Image */}
        <div className="px-0 sm:px-8 lg:px-16">
          <OptimizedImage
            src="about.jpg"
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
              Cooking has always been a place where I can fully immerse myself- where careful thinking, connected ideas, testing, refining, and creating all come together with purpose. Unlike much of life, the kitchen offers a single, honest outcome: good or bad food. Did it put a smile on your face? Did it warm your stomach? The answer is always immediate and real.
            </p>

            <p>
              Rein, not coincidentally my nickname, is a simple moniker for my cooking persona. It's my way of pushing myself to be more deliberate, more disciplined, and more creative. A space to set deadlines, honour the process, and bring true intention to preparation and execution.
            </p>

            <p>
              This blog is where I share that journey with you. I hope you enjoy what you find here, and I'm grateful you've taken the time to stop by.
            </p>

            <p>
              See you soon.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
