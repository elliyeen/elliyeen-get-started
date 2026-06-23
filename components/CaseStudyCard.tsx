"use client";

import Image from "next/image";
import Link from "next/link";

interface Stat {
  value: string;
  label: string;
}

interface CaseStudyCardProps {
  category: string;
  title: string;
  description: string;
  stats: Stat[];
  coverImage: string;
  href: string;
}

export default function CaseStudyCard({
  category,
  title,
  description,
  stats,
  coverImage,
  href,
}: CaseStudyCardProps) {
  return (
    <Link
      href={href}
      className="group block bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      {/* Cover thumbnail */}
      <div className="relative aspect-[3/4] bg-[#0D1B2A] overflow-hidden" style={{ maxHeight: 240 }}>
        <Image
          src={coverImage}
          alt={title}
          fill
          className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
          quality={80}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A]/80 to-transparent" />
        {/* Category badge */}
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-sm text-white text-xs font-semibold tracking-wide uppercase">
          {category}
        </span>
        {/* Read report CTA */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#2E5F8A] text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
          Read Report →
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-[#0D1B2A] text-base mb-1 group-hover:text-[#2E5F8A] transition-colors">
          {title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-4">{description}</p>

        {/* Stats row */}
        <div className="flex gap-4 pt-3 border-t border-gray-100">
          {stats.map((stat, i) => (
            <div key={i}>
              <p className="text-[#2E5F8A] font-bold text-sm">{stat.value}</p>
              <p className="text-gray-400 text-xs">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
}
