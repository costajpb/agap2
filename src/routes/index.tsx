import Episode from "../pages/episode";
import TVShow from "../pages/tv-show";
import Root from "./root";

export default [
    {
      path: "/",
      element: <Root />,
      children: [
        {index: true, element: <TVShow id={1} />},
        {
          path: "episodes/:episodeId",
          element: <Episode id={1} />,
        }
      ]
    },
  ]