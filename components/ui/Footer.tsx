import React from "react";

interface FooterProps {
  github?: string;
  linkedin?: string;
  email?: string;
}

export function Footer({
  github = "https://github.com",
  linkedin = "https://linkedin.com",
  email = "you@example.com",
}: FooterProps) {
  return (
    <footer
      id="contact"
      className="w-full pt-12 pb-24 md:pb-16 mt-auto border-t border-white/[0.08]"
    >
      <div className="site-container flex flex-col sm:flex-row items-center justify-between gap-4 text-sm font-mono text-[#A89FC8]">
        <div>© 2026 Aadi</div>

        <div className="flex items-center gap-6">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#C8FF3D] transition-colors"
              aria-label="GitHub profile"
            >
              GitHub
            </a>
          )}
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#C8FF3D] transition-colors"
              aria-label="LinkedIn profile"
            >
              LinkedIn
            </a>
          )}
          {email && (
            <a
              href={`mailto:${email}`}
              className="hover:text-[#C8FF3D] transition-colors"
              aria-label="Send email"
            >
              Email
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
