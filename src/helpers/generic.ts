export const randomDelay = (
  minSeconds: number,
  maxSeconds: number,
): Promise<void> => {
  const minMs = minSeconds * 1000;
  const maxMs = maxSeconds * 1000;
  const delayTime = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
  return delay(delayTime);
};

export const delay = async (delayTime: number) => {
  await new Promise((resolve) => setTimeout(resolve, delayTime));
};
