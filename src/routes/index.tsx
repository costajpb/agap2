import Episode from "../pages/episode";
import TVShow from "./tv-show";
import Root from "./root";

export default [
    {
      path: "/",
      element: <Root />,
      children: [
        {index: true, element: <TVShow />},
        {
          path: "episodes/:episodeId",
          element: <Episode id={1} />,
        }
      ]
    },
  ]