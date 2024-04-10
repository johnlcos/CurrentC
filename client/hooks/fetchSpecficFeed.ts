interface fetchSpecificFeedProps {
  feedID: string;
}

const fetchSpecificFeed = async ({ feedID }: fetchSpecificFeedProps) => {
  const response = await fetch(`http://localhost:8080/feed/?id=${feedID}`);
  const data = await response.json();
  console.log(data);
  return data[0];
};
export default fetchSpecificFeed;
