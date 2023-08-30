import React, { useState, useEffect } from 'react';

function ChapterDisplay({ chapters, proposal_active }) {
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [timeLeft, setTimeLeft] = useState(48 * 60 * 60); // 2 days in seconds

  useEffect(() => {
    (async () => {
        console.log(proposal_active);    
    })();
  }, []);

  const handleChapterChange = (index) => {
    setCurrentChapterIndex(index);
  };

  const handleNextChapter = () => {
    if (currentChapterIndex < chapters.length - 1) {
      setCurrentChapterIndex(prevIndex => prevIndex + 1);
    }
  };

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="py-4 px-6 flex flex-col items-start bg-gray-50 w-4/5 mx-auto">
      <div className="mb-4 relative inline-block">
        <select
          className="block appearance-none w-64 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          value={currentChapterIndex}
          onChange={(e) => handleChapterChange(e.target.value)}
        >
          {chapters.map((chapter, index) => (
            <option key={index} value={index}>
              {chapter.title}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M5.293 9.293L10 14l4.707-4.707-1.414-1.414L10 11.172 6.707 7.879 5.293 9.293z" />
          </svg>
        </div>
      </div>
      { proposal_active ? 
        <div className="w-1/2 mb-4">
        <div className="flex justify-start border-b">
          <button onClick={() => setActiveTab(0)} className={`py-2 px-4 ${activeTab === 0 ? 'border-b-2 border-blue-600' : ''}`}>Variation 1</button>
          <button onClick={() => setActiveTab(1)} className={`py-2 px-4 ${activeTab === 1 ? 'border-b-2 border-blue-600' : ''}`}>Variation 2</button>
          <button onClick={() => setActiveTab(2)} className={`py-2 px-4 ${activeTab === 2 ? 'border-b-2 border-blue-600' : ''}`}>Variation 3</button>
        </div>
        </div>
       : "" }
      <h1 className="text-2xl font-semibold mb-4">{chapters[currentChapterIndex].title}</h1>
      <p className="text-gray-700 mb-4">{chapters[currentChapterIndex].content}</p>
      <button
        className="bg-blue-600 text-white py-2 px-4 rounded-lg self-end mt-4"
        onClick={handleNextChapter}
      >
        Next Chapter
      </button>
      {/* Voting Box */}
      {proposal_active ?
        <div className="shadow-custom w-full mt-8 p-4 rounded-lg bg-white">
          <h2 className="text-2xl font-semibold mb-4">Vote for a Variation</h2>
          <div className="flex justify-around">
            <button className="bg-blue-600 text-white py-2 px-4 rounded-lg">Variation 1</button>
            <button className="bg-blue-600 text-white py-2 px-4 rounded-lg">Variation 2</button>
            <button className="bg-blue-600 text-white py-2 px-4 rounded-lg">Variation 3</button>
          </div>
        </div>
      : "" }
    </div>
  );
}

export default ChapterDisplay;
