"use client";
import React from "react";
interface Testimonial {
  id: number;
  stars: number;
  quote: string;
  name: string;
  handle: string;
  role: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    stars: 5,
    quote:
      "The most intuitive platform I've used. It completely transformed how I manage my brand partnerships and workflow.",
    name: "Surbhi Jadhav",
    handle: "@surbhij_creative",
    role: "UGC CREATOR - 12K FOLLOWERS",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    stars: 5,
    quote:
      "Finally a tool built for creators, by creators. The analytics are a game changer for my negotiation process.",
    name: "Neel Jain",
    handle: "@neeltech",
    role: "TECH REVIEWER - 45K FOLLOWERS",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 3,
    stars: 5,
    quote:
      "The polished interface and seamless payments have saved me hours of administrative headache every single week.",
    name: "Rashmi K",
    handle: "@rash_visuals",
    role: "VISUAL ARTIST - 28K FOLLOWERS",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 4,
    stars: 5,
    quote:
      "Scaling my content business felt impossible until I started using this. The workflow automation is magic.",
    name: "Arjun Mehta",
    handle: "@arjun_vlogs",
    role: "LIFESTYLE - 100K FOLLOWERS",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="bg-white py-24 text-white dark:bg-[#0A0A0A]">
      <div className="mx-auto mb-16 max-w-7xl space-y-4 px-6 text-center md:px-12 lg:px-24">
        <h2 className="typo-landing-section-heading text-black uppercase dark:text-white">
          What Creators Say
        </h2>
        <p className="typo-landing-section-sub-heading mx-auto max-w-2xl text-[#000000B2] uppercase dark:text-[#FFFFFFB2]">
          Join thousands of successful creators who have leveled up their
          content business.
        </p>
      </div>

      {/* Scrollable Container */}
      <div className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-8 md:px-12 lg:px-24">
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="flex min-w-[300px] snap-center flex-col justify-between rounded-2xl border border-black/8 bg-[linear-gradient(92deg,rgba(106,71,255,0.13)_0%,rgba(255,255,255,0.13)_100%)] p-8 transition-all hover:border-purple-500/30 md:min-w-[400px] dark:border-white/5 dark:bg-[#0D0D0D]"
          >
            <div>
              {/* Stars */}
              <div className="mb-6 flex gap-1">
                {[...Array(item.stars)].map((_, index) => (
                  <svg
                    key={`${item.id}-${index}`}
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="14"
                    viewBox="0 0 15 14"
                    fill="none"
                  >
                    <path
                      d="M14.0312 5.125L9.70312 8.29688L11.3281 13.375L7.03125 10.25L2.73438 13.2969L4.32812 8.29688L0 5.125H5.375L7.03125 0L8.67188 5.125H14.0312Z"
                      fill="#EAB308"
                    />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="typo-landing-body4 text-[#0F1117] dark:text-[#D1D5DB]">
                <span aria-hidden="true">&ldquo;</span>
                {item.quote}
                <span aria-hidden="true">&rdquo;</span>
              </p>
            </div>

            {/* User Info */}
            <div className="mt-10 flex items-center gap-4">
              <div className="h-12 w-12 overflow-hidden rounded-full border-3 border-purple-500/20">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full bg-gray-800 object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="typo-landing-body text-[#0F1117] dark:text-white">
                  {item.name}
                </span>
                <span className="font-dm-sans-400 text-xs text-[#0F1117] dark:text-gray-500">
                  {item.handle}
                </span>
                <span className="font-dm-sans-400 mt-1 text-xs text-[#7B5CFF] uppercase dark:text-[#8B5CF6]">
                  {item.role}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Optional: CSS to hide scrollbar while keeping functionality */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;
