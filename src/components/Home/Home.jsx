import Vector from "./vector";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-white dark:bg-black text-black dark:text-white">
      <Vector />
      <h2 className="mt-4 text-xl font-semibold text-center">
        It’s the beginning of a legendary timeline
      </h2>
      <p className="text-sm text-zinc-400 text-center mt-1">
        When you have inbound E-mails you'll see them here
      </p>
    </div>
  );
}
