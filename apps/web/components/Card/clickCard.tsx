import { PlayIcon, ResumeIcon } from "@radix-ui/react-icons";
interface Props {
  stopLoading: boolean;
  setStopLoading: any;
}

export default function CardClickable({ stopLoading, setStopLoading }: Props) {
  return (
    <div
      data-oa="click-loadingSwitch"
      className="hover:shadow-inner cursor-pointer w-full shadow-sm bg-white dark:bg-gray-800 dark:border-gray-800 rounded-md border mb-6 text-center"
      onClick={() => {
        setStopLoading(!stopLoading);
      }}
    >
      {stopLoading ? (
        <p className="text-xl tracking-wide text-gray-600 dark:text-gray-400 font-light p-3.5 flex justify-center">
          <span className="w-6 h-6 mr-3 mt-0.5">
            <ResumeIcon className="w-5 h-5" />
          </span>
          Resume Loading
        </p>
      ) : (
        <p className="text-xl tracking-wide text-gray-600 dark:text-gray-400 font-light p-3.5 flex justify-center">
          <span className="w-6 h-6 mr-3 mt-0.5">
            <PlayIcon className="w-5 h-5" />
          </span>
          Terminate Loading
        </p>
      )}
    </div>
  );
}
