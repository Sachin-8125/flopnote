import axios from 'axios';
import * as cheerio from 'cheerio';

export const fetchPageTitle = async (url) => {
  try {
    const response = await axios.get(url, {
      timeout: 5000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    const $ = cheerio.load(response.data);
    
    let title = $('meta[property="og:title"]').attr('content');
    
    if (!title) {
      title = $('title').text();
    }
    
    if (!title) {
      title = $('h1').first().text();
    }

    return title ? title.trim() : null;
  } catch (error) {
    return null;
  }
};