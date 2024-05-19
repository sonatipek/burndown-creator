import {
  RiGithubFill,
  RiLinkedinFill,
  RiTwitterXFill,
  RiHeartFill,
} from "@remixicon/react";

export default function Footer() {
  return (
    <footer className="container mx-auto mt-12 flex items-center justify-between border-t p-3 py-6">
      <span className="text-tremor-content-subtle font-medium">
        <a href="/">&copy; {new Date().getFullYear()}, Burndown Creator</a>
      </span>

      <p className="flex items-center justify-center space-x-2 text-tremor-default text-tremor-content">
        Made with <RiHeartFill size={16} color="red" className="mx-1" /> by
        <a
          href="https://linkedin.com/in/sonatipek"
          className="font-medium text-tremor-brand-emphasis hover:scale-105 transition-transform duration-500"
        >
          Sonat İpek
        </a>
      </p>

      <ul className="flex items-center justify-center gap-3 text-tremor-content">
        <li className="transition-color duration-300 hover:text-tremor-content-strong">
          <a href="https://github.com/sonatipek">
            <RiGithubFill />
          </a>
        </li>
        <li className="transition-color duration-300 hover:text-tremor-content-strong">
          <a href="https://x.com/sonatipek">
            <RiTwitterXFill />
          </a>
        </li>
        <li className="transition-color duration-300 hover:text-tremor-content-strong">
          <a href="https://linkedin.com/in/sonatipek">
            <RiLinkedinFill />
          </a>
        </li>
      </ul>
    </footer>
  );
}
