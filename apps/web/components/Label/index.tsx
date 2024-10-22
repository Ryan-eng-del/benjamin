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
      className="cursor-pointer justify-center font-medium items-center flex w-auto lg:px-4 lg:py-1 px-2 py-1 bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 text-center rounded-md text-4 lg:text-label tracking-wide text-blue-500 dark:text-blue-300 align-middle effect-pressing"
    >
      <>{children}</>
    </label>
  );
};
export default Label;
