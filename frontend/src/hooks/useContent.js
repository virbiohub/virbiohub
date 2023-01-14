import { useEffect, useState } from "react";
import axios from "../config/@axios";
const useContent = (contentType) => {
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");
  const [figureCapture, setFigureCapture] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getContent = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: `content`,
          params: { param: contentType },
        });
        const data = await response.data.data[0];

        setContent(data.content);
        setImage(data.photo);
        setFigureCapture(data.figureCapture);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }
    };

    setTimeout(() => {
      getContent();
    }, 400);
  }, []);

  return {
    image,
    content,
    isLoading,
    figureCapture,
  };
};

export default useContent;
