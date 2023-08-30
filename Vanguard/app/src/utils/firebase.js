import { initializeApp } from "firebase/app";
import { addDoc, doc, getFirestore, setDoc } from "firebase/firestore";
import { collection, getDocs, query, where } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyAUzaC1zQjh-IkLVpQYR8PbPEulhUGzvT4",
  authDomain: "storycraft-3b974.firebaseapp.com",
  projectId: "storycraft-3b974",
  storageBucket: "storycraft-3b974.appspot.com",
  messagingSenderId: "1092976214727",
  appId: "1:1092976214727:web:29c743e961bd1765dbf4e2",
  measurementId: "G-3XYLTCPHG4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const getStories = async () => {
  try {
    let output = [];
    const querySnapshot = await getDocs(collection(db, "stories"));
    querySnapshot.forEach((doc) => {
      output.push(doc.data());
    });
    return output;
  } catch (error) {
    console.log(error);
  }
}

export const firebaseBaseAddStory = async (title, coverImage, desc, category, matureBool, chapters, author_address) => {
  try {
    await addDoc(collection(db, "stories"), {
      title : title,
      desc : desc,
      category : category,
      mature : matureBool,
      coverImage : coverImage,
      chapters : chapters,
      author : author_address,
    }); 
  } catch (error) {
    console.log(error);
  }
}

export const firebaseAddProposal = async (story, title, option1, option2, option3, content1, content2, content3) => {
  try {
    const docRef = await addDoc(collection(db, "proposals"), {
      story : story,
      title : title,
      option1 : option1,
      option2 : option2,
      option3 : option3,
      content1 : content1,
      content2 : content2,
      content3 : content3,
    }); 
    return docRef.id;
  } catch (error) {
    console.log(error);
  }
}

export const firebaseAddFirstChapter = async (story, title, content, content_hash) => {
  try {
    const docRef = await addDoc(collection(db, "chapters"), {
      story : story,
      title : title,
      content : content,
      content_hash : content_hash
    }); 
    return docRef.id;
  } catch (error) {
    console.log(error);
  }
}

export const getChaptersOfTheStory = async (title) => {
  try {
    let output = [];
    const querySnapshot = await getDocs(collection(db, "chapters"));
    querySnapshot.forEach((doc) => {
      if(doc.data().story == title) {
        output.push(doc.data());
      }
    });
    return output;
  } catch (error) {
    console.log(error);
  }
}

export const getProposalOfTheStory = async (title) => {
  try {
    let output = [];
    const querySnapshot = await getDocs(collection(db, "proposals"));
    querySnapshot.forEach((doc) => {
      if(doc.data().story == title) {
        output.push(doc.data());
      }
    });
    return output;
  } catch (error) {
    console.log(error);
  }
}