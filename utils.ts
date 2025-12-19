/**
 * Formats seconds into MM:SS string
 */
export const formatTime = (seconds: number): string => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

/**
 * Calculates the dash offset for the SVG circle progress
 */
export const calculateDashOffset = (
  timeLeft: number,
  totalTime: number,
  circumference: number
): number => {
  const progress = timeLeft / totalTime;
  // Determine offset: when full (100%), offset is 0. When empty (0%), offset is circumference.
  // We want it to shrink counter-clockwise or clockwise. 
  // Let's make it reduce the stroke length as time passes.
  return circumference - (progress * circumference);
};