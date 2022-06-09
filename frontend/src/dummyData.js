import d1 from './default1.jpg'; 
import d2 from './default2.jpg'; 
import d3 from './default3.jpg'; 
import d4 from './default4.jpg'; 

export const Users = [
  {
    id:1,
    profilePicture: d1,
    username: "İlayda Atmaca",
  },
  {
    id:2,
    profilePicture: d3,
    username: "Aleyna Alper",
  },
  {
    id:3,
    profilePicture: d4,
    username: "Alper Tuğşad Meydan",
  },
  {
    id:4,
    profilePicture:d2,
    username: "Taylan Özdoğan",
  }
];

export const Posts = [

  {
    id: 6,
    name : "Şevval Atmaca",
    desc: "I completed the 'The Unity Immersive Design' course that I took on Unity!",
    photo: "assets/post/aa.png",
    date: "5 mins ago",
    userId: 1,
    like: 32,
    comment: 9,
  },

  {
    id: 1,
    desc: "Love For All, Hatred For None.",
    photo: "assets/post/1.jpeg",
    date: "5 mins ago",
    userId: 1,
    like: 32,
    comment: 9,
  },
  {
    id: 2,
    photo: "assets/post/2.jpeg",
    date: "15 mins ago",
    userId: 2,
    like: 2,
    comment: 1,
  },
  {
    id: 3,
    desc: "Every moment is a fresh beginning.",
    photo: "assets/post/3.jpeg",
    date: "1 hour ago",
    userId: 3,
    like: 61,
    comment: 2,
  },
  {
    id: 4,
    photo: "assets/post/4.jpeg",
    date: "4 hours ago",
    userId: 4,
    like: 7,
    comment: 3,
  },
 
];
