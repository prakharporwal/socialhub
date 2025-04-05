type Props = {
  minNum: number;
  maxNum: number;
  arrayLength: number;
  currentPage: number;
};

export function paginatedButtonArrayToShow({
  minNum,
  maxNum,
  arrayLength,
  currentPage,
}: Props): Array<number | undefined> {
  const cutoff = arrayLength - 2;
  const displayedPages = [];

  let leftTruncate = false;
  let rightTruncate = false;
  if (currentPage >= minNum + cutoff) {
    displayedPages.push(minNum);
    displayedPages.push(undefined);
    leftTruncate = true;
  }

  if (currentPage <= maxNum - cutoff) rightTruncate = true;

  const remainingSpace =
    arrayLength - (leftTruncate ? 2 : 0) - (rightTruncate ? 2 : 0);
  if (leftTruncate && rightTruncate) {
    const rangeStart = currentPage - Math.floor(remainingSpace / 2);
    const rangeEnd =
      currentPage + remainingSpace - Math.floor(remainingSpace / 2);
    for (let i = rangeStart; i < rangeEnd; i++) {
      displayedPages.push(i);
    }
  } else if (leftTruncate) {
    for (let i = remainingSpace - 1; i >= 0; i--) {
      displayedPages.push(maxNum - i);
    }
  } else if (rightTruncate) {
    for (let i = 0; i < remainingSpace; i++) {
      displayedPages.push(minNum + i);
    }
  }

  if (rightTruncate) {
    displayedPages.push(undefined);
    displayedPages.push(maxNum);
  }
  return displayedPages;
}
