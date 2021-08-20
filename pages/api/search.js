import axios from 'axios';

const searchHandler = async (req, res) => {
  console.log("This is the request:",req);
  try {
    const searchResults = await axios.get('https://content.guardianapis.com/search?api-key=' + process.env.GUARDIAN_API_KEY+ '&q=' + req.query.term)
    const apiResults = searchResults.data.response.results.map(result => {
    
      return {
        title: result.webTitle,
        url: result.webUrl,
      }
    })

    res.status(200).json(apiResults);

  } catch (err) { console.log(err) }
}

export default searchHandler;