import {
  useQuery,
  gql
} from "@apollo/client";
import { ReactElement } from "react";

const GET_DOG_PHOTO = gql`
  query Dog($breed: String!) {
    dog(breed: $breed) {
      id
      displayImage
    }
  }
`;

interface DocPhotoProps {
  breed: string;
}

const DocPhoto = (props: DocPhotoProps): ReactElement | null | string => {
    const { loading, error, data } = useQuery(GET_DOG_PHOTO, {
      variables: { breed:props.breed },
    });

    if (loading) return null;
    if (error) return `Error! ${error}`;

    return (
        <img src={ data.dog.displayImage } style={{ height: 100, width: 100 }} />
    );
};

export default DocPhoto;