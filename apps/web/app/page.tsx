"use client";

import { ConcatLink, Emphasis, List } from "~/components";
const LanguageTechnologies = ["Golang", "Python", "TypeScript"];
const FrameworkTechnologies = ["Next.js", "Go-Zero", "Kubernetes"];
const Hobbies = ["swimming", "working out", "reading"];

export default function Home() {
  return (
    <>
      <div className="lg:pt-15 md:pt-10 pt-10">
        <div>
          <div>
            <h1 className="flex items-center font-medium !leading-14 lg:text-1 text-black dark:text-white tracking-wide mb-0.5 whitespace-nowrap lg:text-3xl text-2xl">
              <span className="animate-waveHand hover:animate-waveHandAgain inline-block cursor-pointer mr-2.5">
                👋
              </span>{" "}
              Hello, and welcome!
            </h1>

            <div className="break-words px-1 pb-1.5 pt-1 font-normal !lg:leading-10 text-gray-600  tracking-wide dark:text-gray-300 lg:text-base !leading-9 text-base ">
              <p>
                <span>My name is Bo Wang</span>
                <Emphasis
                  name="First Name"
                  className="-translate-y-0.5  !border-l-yellow-300  dark:!border-l-green-300 !border-l-4 dark:text-white dark:font-medium"
                >
                  <b>Benjamin</b>
                </Emphasis>
                <span>, and I am currently working as</span>
                <Emphasis
                  name="Full Stack Engineer"
                  className="!border-l-4 !border-l-blue-400 dark:text-white dark:!border-l-slate-50 dark:font-medium"
                ></Emphasis>{" "}
                at various technology startups base in ShenZhen, China 🇨🇳.
                <br />
                <span>
                  I am very interested in programming languages such as
                </span>
                {LanguageTechnologies.map((language) => (
                  <Emphasis
                    name={language}
                    key={language}
                    className="-translate-y-0.5 dark:text-teal-300 rounded-lg font-semibold"
                  ></Emphasis>
                ))}
                <span>. </span>
                <span>
                  In the context of microservices architecture, I am
                  particularly interested in{" "}
                  {FrameworkTechnologies.map((language) => (
                    <Emphasis
                      name={language}
                      key={language}
                      className="-translate-y-0.5  dark:text-teal-300 rounded-l font-semibold"
                    ></Emphasis>
                  ))}{" "}
                  .
                </span>
                <br />
                <span>
                  When I'm not at the computer, I'm usually{" "}
                  {Hobbies.map((hobby) => (
                    <Emphasis
                      name={hobby}
                      key={hobby}
                      className="-translate-y-0.5 dark:text-white font-semibold"
                    ></Emphasis>
                  ))}{" "}
                  and spending time with my girlfriend and a cat, or just doing
                  nothing, lying in bed and playing on my phone.
                </span>
              </p>
            </div>
          </div>
          <ConcatLink />
        </div>
        <div className="mt-7">
          <List />
        </div>
      </div>
    </>
  );
}
