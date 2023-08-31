import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ChapterDisplay from './components/ChaptersDisplay';
import Navbar from './components/Navbar';
import NovelCarousel from './components/NovelCarousel';
import logo from './logo.svg';
import Home from './pages/Home';
import Novel from './pages/Novel';
import StoryForm from './pages/StoryForm';
import WriteStory from './pages/WriteStory';

function App() {
  return (
      <div className="">
        <BrowserRouter>
          <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/read/:addr/" element={<Novel />} />
                <Route path="/write" element={<StoryForm />} />
                <Route path="/write-story/:title/" element={<WriteStory />} />
            </Routes>
            </main>
        </BrowserRouter>
      </div>
      
  );
}

export default App;
