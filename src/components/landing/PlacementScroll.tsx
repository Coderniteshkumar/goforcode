// import React from "react";

const students = [
  { id: 1, img: "/image/vinay.jpeg", name: "Vinay Kumar", company: "Talentrise Technokrate", position: "Web Development" },
  { id: 2, img: "/image/gulshan.jpeg", name: "Gulshan Kumar", company: "Talentrise Technokrate", position: "React Developer" },
  { id: 3, img: "/image/kishan.jpeg", name: "Kishan Kumar", company: "Satya Sattelite", position: "Frontend Developer" },
  { id: 4, img: "/image/deepa.jpeg", name: "Deepa Kour", company: "Talentrise Technokrate", position: "React Developer" },
  { id: 5, img: "/image/bablu.jpeg", name: "Bablu Kumar", company: "RT Tech solutions", position: "React Developer" },
  { id: 6, img: "https://i.pravatar.cc/150?u=6", name: "Neha Gupta", company: "Dzone India", position: "Full Stack Developer" },
    { id: 7, img: "/image/sonu.jpeg", name: "Sonu Kumar", company: "Talentrise Technokrate", position: "React Developer" },

];

const PlacementScroll = () => {
  return (
    <div className="py-12 bg-gray-900 overflow-hidden">
      <h1 className="text-center text-3xl font-bold mb-10 text-blue-400">
        <span className="text-white">Our</span> Placed Students
      </h1>

      {/* Scroll Container */}
      <div className="flex w-max gap-12 animate-scroll px-4">
        {/* Infinite Loop ke liye double map */}
        {[...students, ...students].map((student, index) => (
          <div key={index} className="flex flex-col items-center text-center min-w-[150px]">
            
            {/* 1. Student Photo */}
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-blue-500/30 overflow-hidden shadow-xl mb-4">
              <img
                src={student.img}
                alt={student.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* 2. Student Name */}
            <h3 className="text-white font-semibold text-lg leading-tight">
              {student.name}
            </h3>

            {/* 3. Company Name */}
            <p className="text-blue-400 font-bold text-sm uppercase tracking-wider">
              {student.company}
            </p>

            {/* 4. Position */}
            <p className="text-gray-400 text-xs italic">
              {student.position}
            </p>

          </div>
        ))}
      </div>
    </div>
  );
};

export default PlacementScroll;