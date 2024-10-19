"use client";

import { ConcatLink, Emphasis } from "~/components";

const LanguageTechnologies = ["Golang", "Python", "TypeScript/JavaScript"];
const FrameworkTechnologies = ["Next.js", "Go-Zero", "Kubernetes"];

export default function Home() {
  return (
    <>
      <div className="lg:mt-15 mt-0 lg:pt-0 pt-20">
        <div>
          <h1 className="flex items-center font-medium !leading-14 lg:text-1 text-black dark:text-white tracking-wide mb-0.5 whitespace-nowrap lg:text-3xl text-2xl">
            <span className="animate-waveHand hover:animate-waveHandAgain inline-block cursor-pointer mr-2.5">
              👋
            </span>{" "}
            Hello, and welcome!
          </h1>

          <div className="break-words px-1 pb-1.5 pt-1 font-light !lg:leading-10 text-gray-600  tracking-wide dark:text-gray-300 lg:text-base !leading-9 text-sm ">
            <p>
              <span className="lg:pl-5 pl-4">My name is Bo Wang</span>
              <Emphasis
                name="Preferred First Name"
                className="-translate-y-0.5  !border-l-yellow-300 border-l-4"
              >
                <b>Benjamin</b>
              </Emphasis>
              <span>, and I am currently working as a</span>
              <Emphasis
                name="Full Stack Software Engineer"
                className="border-l-4 !border-l-blue-400"
              ></Emphasis>{" "}
              at various technology startups base in ShenZhen, China 🇨🇳.
              <br />
              <span className="lg:pl-5 pl-4">
                I am very interested in programming languages such as
              </span>
              {LanguageTechnologies.map((language) => (
                <Emphasis
                  name={language}
                  className="-translate-y-0.5 "
                ></Emphasis>
              ))}
              <span>. </span>
              <span>
                In the context of microservices architecture, I am particularly
                interested in{" "}
                {FrameworkTechnologies.map((language) => (
                  <Emphasis
                    name={language}
                    className="-translate-y-0.5"
                  ></Emphasis>
                ))}{" "}
                .
              </span>
            </p>
          </div>
        </div>
        <ConcatLink />
      </div>
    </>
  );
}
