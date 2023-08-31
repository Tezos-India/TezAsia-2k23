import React, {useEffect, useState} from 'react'
import ChapterDisplay from '../components/ChaptersDisplay';
import { useParams } from 'react-router-dom';
import { fetchStoryStorage } from '../utils/tzkt';
import { getChaptersOfTheStory, getProposalOfTheStory } from '../utils/firebase';

function Novel() {

  const {addr} = useParams();

  const [activeProposal, setActiveProposal] = useState(false);

  const [chaptersData, setChapterData] = useState([{
    title : "",
    content : ""
  }]);

  useEffect(() => {
    (async () => {
      const temp_title = await fetchStoryStorage(addr);
      console.log(temp_title.current_proposal.active);
      if(temp_title.current_proposal.active == true) {
        const proposal_res = await getProposalOfTheStory(temp_title.title);
        console.log(proposal_res);
        setActiveProposal(true);
      }
      const res = await getChaptersOfTheStory(temp_title.title);
      setChapterData(res);
    })();    
  }, []); 

  return (
    <div>
        <ChapterDisplay chapters={chaptersData} proposal_active={activeProposal} />
    </div>
  )
}

export default Novel