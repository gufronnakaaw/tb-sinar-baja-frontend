export function capitalize(word: string, separator: string) {
  const words = word.split(separator);

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }

  return words.join(separator);
}
