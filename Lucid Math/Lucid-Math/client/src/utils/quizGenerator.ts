import { Question } from "../context/MultiplicationContext";

/**
 * Generates random quiz questions for a specific multiplication table
 * @param tableNumber - The multiplication table number
 * @param count - The number of questions to generate
 * @returns Array of quiz questions
 */
export function generateQuizQuestions(tableNumber: number, count: number): Question[] {
  // Create an array of possible multiplicands (1-12)
  const multiplicands = Array.from({ length: 12 }, (_, i) => i + 1);
  
  // Shuffle the array
  const shuffled = [...multiplicands].sort(() => 0.5 - Math.random());
  
  // Take the first n items based on count
  const selected = shuffled.slice(0, count);
  
  // Create questions
  return selected.map(num => {
    const correctAnswer = tableNumber * num;
    
    // Generate incorrect options within a reasonable range
    let options = [correctAnswer];
    
    while (options.length < 4) {
      // Generate an offset between -5 and +5, but not 0
      let offset = Math.floor(Math.random() * 11) - 5;
      if (offset === 0) offset = 1;
      
      const incorrectOption = correctAnswer + offset;
      
      // Make sure we don't have duplicates and the number is positive
      if (!options.includes(incorrectOption) && incorrectOption > 0) {
        options.push(incorrectOption);
      }
    }
    
    // Shuffle options
    options = options.sort(() => 0.5 - Math.random());
    
    return {
      multiplicand: num,
      correctAnswer,
      options,
      correctIndex: options.indexOf(correctAnswer)
    };
  });
}
