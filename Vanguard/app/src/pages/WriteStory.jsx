import React, { useState, useRef, useEffect } from 'react';
import { proposeOperation } from '../utils/operations';
import { firebaseAddProposal } from '../utils/firebase';
import { useParams } from 'react-router-dom';
import { fetchStorage, fetchStoryTitle } from '../utils/tzkt';
import crypto from 'crypto';

function WriteStory() {
  const {title} = useParams();
  const [chapterTitle, setChapterTitle] = useState('');
  const [storyContent, setStoryContent] = useState(['', '', '']);
  const [activeTab, setActiveTab] = useState(0);
  const [addr, setAddr] = useState("");

  const storyTitle = "Sample Story Title"; // Placeholder, replace with actual title
  const storyImage = "https://img.wattpad.com/cover/349773878-64-ka76e5f.jpg"; // Placeholder, replace with actual image 

  const textAreaRef = useRef(null);

  useEffect(() => {
    textAreaRef.current.style.height = 'auto';
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
  }, [storyContent]);

  useEffect(() => {
    (async () => {
        const res = await fetchStorage();
        for(const i in res) {
          const temp = await fetchStoryTitle(res[i]);
          if(temp == title) {
            setAddr(res[i]);
          }
        }
        console.log(addr);         
    })();    
  }, []); 

  const onSubmit = async () => {
    console.log(storyContent[0]);
    const res0 = "0x" + crypto.createHash('sha256').update(storyContent[0]).digest('hex');
    const res1 = "0x" + crypto.createHash('sha256').update(storyContent[1]).digest('hex');
    const res2 = "0x" + crypto.createHash('sha256').update(storyContent[2]).digest('hex');

    await proposeOperation(addr, res0, res1, res2);
    await firebaseAddProposal(storyTitle, chapterTitle, res0, res1, res2, storyContent[0], storyContent[1], storyContent[2]);

  }

  const handleContentChange = (e, index) => {
    const newContent = [...storyContent];
    newContent[index] = e.target.value;
    setStoryContent(newContent);
  };

  return (
    <div className="h-full w-full bg-white flex flex-col">
      {/* Top Bar */}
      <div className="flex justify-center items-center bg-white p-4 shadow-md">
        <div className="text-center">
          <button onClick={onSubmit} className="bg-blue-600 text-white py-2 px-4 rounded-lg mr-2">Publish</button>
        </div>
      </div>

      {/* Writing Area */}
      <div className="p-16 flex flex-col items-center justify-center">
        <input 
          type="text" 
          value={chapterTitle} 
          onChange={e => setChapterTitle(e.target.value)} 
          placeholder="Chapter Title" 
          className="text-center text-2xl font-semibold w-3/4 mb-4 p-2 focus:outline-none placeholder-gray-500"
        />
        <div className="w-1/2 mb-4">
          <div className="flex justify-center border-b">
            <button onClick={() => setActiveTab(0)} className={`py-2 px-4 ${activeTab === 0 ? 'border-b-2 border-blue-600' : ''}`}>Variation 1</button>
            <button onClick={() => setActiveTab(1)} className={`py-2 px-4 ${activeTab === 1 ? 'border-b-2 border-blue-600' : ''}`}>Variation 2</button>
            <button onClick={() => setActiveTab(2)} className={`py-2 px-4 ${activeTab === 2 ? 'border-b-2 border-blue-600' : ''}`}>Variation 3</button>
          </div>
        </div>
        <textarea 
            ref={textAreaRef}
            value={storyContent[activeTab]} 
            onChange={e => handleContentChange(e, activeTab)} 
            placeholder="Start writing your story here..." 
            className="text-left p-4 focus:outline-none placeholder-gray-500 resize-none w-1/2"
          ></textarea>
      </div>
    </div>
  );
}

export default WriteStory;
