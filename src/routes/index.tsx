import Episode from "./episode";
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
          element: <Episode />,
          loader: async ({params}: any) => {
            return {
              id: params.episodeId
            }
          }
        }
      ]
    },
  ]