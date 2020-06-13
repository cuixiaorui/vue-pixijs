import StartPage from "./StartPage";
import GamePage from "./GamePage";
import EndPage from "./EndPage";

export const PAGE = {
  start: "startPage",
  game: "gamePage",
  end: "endPage",
};

const pageMap = {
  [PAGE.start]: StartPage,
  [PAGE.game]: GamePage,
  [PAGE.end]: EndPage,
};

export const getPageComponent = (pageName)=>{
    return pageMap[pageName] 
}

