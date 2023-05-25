import About from "./About";
import Section from "./Section";

export default function Home() {
  return (
    <div className="w-full">
      <img
        src="/pictures/cool-background.svg"
        alt="background"
        className=" sm:w-full h-screen"
      />
      <div className="absolute ml-5 left-0 top-[250px] flex flex-col p-4">
        <span className="text-black sm:text-[40px] font-bold">
          STAY NOTIFIED
        </span>
        <span className="text-black sm:text-[40px] font-bold">
          STAY INSPIRED
        </span>
        <button className="border-2 w-1/2 mt-4 bg-purple-800 border-purple-900 p-3 rounded-full ring-1 ring-blue-800  ring-offset-4">
          Discover
        </button>
      </div>
      <About />
      <Section />
    </div>
  );
}
