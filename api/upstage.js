import OpenAI from "openai";

const apiKey = 'up_xX4bkFl0J7rKWlvyRajVo0O7HqnfE';  // Replace with your actual API key
const openai = new OpenAI({
  apiKey: apiKey,
  baseURL: 'https://api.upstage.ai/v1/solar'
});

// Function to generate a story segment
export const getStorySegment = async (location, itinerary = []) => {
    try {
      if (!Array.isArray(itinerary)) {
        throw new Error('Itinerary must be an array');
      }
      
      const chatCompletion = await openai.chat.completions.create({
        model: 'solar-1-mini-chat',
        messages: [
          {
            role: 'user',
            content: `Generate an interesting and adventurous story segment for ${location} in Jeju Island that blends local folklore and myth that will please the reader as they read. End the story segment hinting that the next story segment will be fun as well and ask reader to be excited about it. Below the story segment, pick two to five words from the story and translate them into Korean along with how to pronounce them so that the reader can learn the phrases.
            The format should be Language Learning :
            1. (Word in English): (Word in Korean) (Pronounciation)
                Meaning: (Meaning)
            2. (Word in English): (Word in Korean) (Pronounciation)
                Meaning: (Meaning)`
          }
        ],
        stream: false
      });
  
      return chatCompletion.choices[0].message.content || 'Error generating story segment.';
    } catch (error) {
      console.error('Error fetching story segment:', error);
      return 'Error generating story. Please try again later.';
    }
  };
  

// Function to get a single nearby place not in the itinerary
export const getNearbySuggestions = async (currentLocation, itinerary) => {
    try {
      const chatCompletion = await openai.chat.completions.create({
        model: 'solar-1-mini-chat',
        messages: [
          {
            role: 'user',
            content: `I am currently at ${currentLocation} in Jeju Island. Please suggest one nearby place to visit that is not already included in my itinerary: ${itinerary.join(', ')}. Start with You might also want to visit, then provide a brief introduction of why I should visit the place.`
          }
        ],
        stream: false
      });
  
      const messageContent = chatCompletion.choices[0].message.content.trim();
      console.log('Nearby Suggestions Content:', messageContent);
  
      return messageContent ? `${messageContent}.` : 'No new nearby suggestions available.';
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      return 'No new nearby suggestions available.';
    }
  };
  