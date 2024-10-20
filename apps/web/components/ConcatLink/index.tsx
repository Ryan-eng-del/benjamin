import { Button } from "@benjamin/ui";
import {
  ArrowRightIcon,
  EnvelopeClosedIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";

export default function ConcatLink() {
  return (
    <div className="mt-4 grid lg:grid-cols-5 lg:gap-3">
      <div className="grid-cols-3 gap-3 col-start-1 col-span-3 hidden lg:grid">
        <a
          target="_blank"
          href="https://github.com/Ryan-eng-del"
          rel="noreferrer"
        >
          <Button
            className="!w-full text-gray-700 text-3 leading-14"
            variant="outline"
          >
            <GitHubLogoIcon />
            <span className="tracking-normal">Github</span>
          </Button>
        </a>

        <a
          target="_blank"
          href="https://www.linkedin.com/in/~lhe"
          rel="noreferrer"
        >
          <Button
            className="!w-full !text-blue-600 text-3 leading-14"
            variant="outline"
          >
            <LinkedInLogoIcon />
            <span className="tracking-normal ">LinkedIn</span>
          </Button>
        </a>
        <a target="_blank" href="mailto:cyan0908@163.com" rel="noreferrer">
          <Button
            className="!w-full text-gray-700 text-3 leading-14"
            variant="outline"
          >
            <EnvelopeClosedIcon />
            <span className="tracking-normal">Email</span>
          </Button>
        </a>
      </div>

      <div className="lg:col-start-4 lg:col-end-6">
        <Button className="!w-full">
          <ArrowRightIcon />
          <span className="tracking-normal text-4 leading-14 lg:text-3">
            More about me
          </span>
        </Button>
      </div>
    </div>
  );
}
