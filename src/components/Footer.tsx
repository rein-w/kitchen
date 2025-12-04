import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white py-12 md:py-20 text-[12.5px]">
      <div className="px-4 sm:px-8 lg:px-16">
        <div className="flex flex-col md:flex-row md:justify-between gap-9 md:gap-12">
          <div className="space-y-6">
            <div className="font-light text-gray-700">
              <p>Sydney</p>
              <p>New South Wales</p>
            </div>

            <div className="font-light text-gray-700 space-y-1">
              <p>t: 0447 121 343</p>
              <p>e: reincooking@gmail.com</p>
            </div>

            <div>
              <Link
                href="/newsletter"
                className="font-light text-gray-700 hover:text-black transition-colors"
              >
                Sign up to our newsletter
              </Link>
            </div>

            <div>
              <Link
                href="https://www.instagram.com/rya.en/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-light text-gray-700 hover:text-black transition-colors"
              >
                Instagram
              </Link>
            </div>
          </div>

          <div className="md:text-right md:max-w-sm">
            <div className="font-light text-gray-700 space-y-4">
              <p>Bookings are available by private reservation only.</p>
              <p>
                To view the menu for your event night, please visit rein.my/events using the navigation menu above.
              </p>
              <p>
                Please note: this is not a commercial restaurant. It is a personal hobby project created to share my passion for cooking with friends while I continue to improve, curate, and develop my culinary skills.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
