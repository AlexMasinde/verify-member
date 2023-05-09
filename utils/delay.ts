export default function delay(delayDuration: number) {
  return new Promise((resolve) => setTimeout(resolve, delayDuration));
}
