const About = () => {
  return (
    <>
      <h1 className="p-4 text-2xl font-bold text-gray-900 text-center ">
        What we Offer
      </h1>
      <div className="sm:flex-row flex flex-col w-full px-4 gap-4 justify-center my-3.5">
        <div className="w-[250px] flex flex-col bg-gray-100  shadow-lg p-4">
          <div className="w-full text-center">
            <img
              src="/pictures/Schedule-amico.svg"
              alt="schedule"
              className="w-20 h-20 mx-auto"
            />
          </div>

          <div>
            <h1 className="font-bold text-gray-900 p-4 text-xl">
              Class Schedule
            </h1>
            <ul className="flex flex-col justify-between gap-4 px-4">
              <li className="text-gray-800">A weeklong plan</li>
              <li className="text-gray-800">Stay updated</li>

              <li className="text-gray-800">Just drag and drop</li>
            </ul>
          </div>
          <button className="border-2 w-1/2 mt-4 mx-auto bg-purple-800 border-purple-900 p-3 rounded-full ring-1 ring-blue-800  ring-offset-4">
            Discover
          </button>
        </div>
        <div className="w-[250px] flex flex-col  bg-gray-100  shadow-lg p-4">
          <div className="w-full text-center">
            <img
              src="/pictures/Webinar-amico.svg"
              alt="schedule"
              className="w-20 h-20 mx-auto"
            />
          </div>

          <div>
            <h1 className="font-bold text-gray-900 p-4 text-xl">
              Teacher Schedule
            </h1>
            <ul className="flex flex-col justify-between gap-4 px-4">
              <li className="text-gray-800">Know Your Lecturer</li>
              <li className="text-gray-800">Stay Informed</li>
              <li className="text-gray-800">Make Appointments</li>
            </ul>
          </div>
          <button className="border-2 w-1/2 mx-auto mt-4 bg-purple-800 border-purple-900 p-3 rounded-full ring-1 ring-blue-800  ring-offset-4">
            Discover
          </button>
        </div>
        <div className="w-[250px] flex flex-col  bg-gray-100  shadow-lg p-4">
          <div className="w-full text-center">
            <img
              src="/pictures/Advantages-amico.svg"
              alt="schedule"
              className="w-20 h-20 mx-auto"
            />
          </div>

          <div>
            <h1 className="font-bold text-gray-900 p-4 text-xl">
              Have a Task?
            </h1>
            <ul className="flex flex-col justify-between gap-4 px-4">
              <li className="text-gray-800">Make a List</li>
              <li className="text-gray-800">Get notification</li>
              <li className="text-gray-800">Stay motivated</li>
            </ul>
          </div>
          <button className="border-2 w-1/2 mt-4 mx-auto bg-purple-800 border-purple-900 p-3 rounded-full ring-1 ring-blue-800  ring-offset-4">
            Discover
          </button>
        </div>
      </div>
    </>
  );
};

export default About;
