import StartPage from "./StartPage";
import GamePage from "./GamePage";

export const PAGE = {
  start: "startPage",
  game: "gamePage",
  end: "endPage",
};

const pageMap = {
  [PAGE.start]: StartPage,
  [PAGE.game]: GamePage,
  [PAGE.end]: StartPage,
};

export const getPageComponent = (pageName)=>{
    return pageMap[pageName] 
}

