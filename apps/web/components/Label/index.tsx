import React from "react";

interface Props {
  /**
   * The content inside the button
   */
  children?: React.ReactNode;
}

type NativeAttrs = Omit<React.LabelHTMLAttributes<any>, keyof Props>;
export type LabelProps = Props & NativeAttrs;

const Label = ({ children, ...props }: LabelProps) => {
  return (
    <label
      {...props}
      className="cursor-pointer justify-center font-medium items-center flex w-auto lg:px-4 lg:py-1 px-1 py-1 bg-blue-100 dark:bg-teal-400/10 hover:dark:bg-teal-300/20 hover:bg-blue-200  text-center rounded-md lg:text-lg text-base lg:text-label tracking-wide text-blue-500 dark:text-teal-300 align-middle effect-pressing"
    >
      <>{children}</>
    </label>
  );
};
export default Label;
