import { paginatedButtonArrayToShow } from "./paginatedArrayToShow";

test("paginatedButtonArrayToShow ans when 1", function () {
  const result = paginatedButtonArrayToShow({minNum: 1, maxNum: 10,arrayLength: 7, currentPage: 1});
  expect(result).toEqual([1, 2, 3, 4, 5, undefined, 10]);
});

test("paginatedButtonArrayToShow ans when 2", function () {
  const result = paginatedButtonArrayToShow({minNum: 1, maxNum: 10,arrayLength: 7, currentPage: 2});
  expect(result).toEqual([1, 2, 3, 4, 5, undefined, 10]);
});

test("paginatedButtonArrayToShow ans when 3", function () {
  const result = paginatedButtonArrayToShow({minNum: 1, maxNum: 10,arrayLength: 7, currentPage: 3});
  expect(result).toEqual([1, 2, 3, 4, 5, undefined, 10]);
});

test("paginatedButtonArrayToShow ans when 4", function () {
  const result = paginatedButtonArrayToShow({minNum: 1, maxNum: 10,arrayLength: 7, currentPage: 4});
  expect(result).toEqual([1, 2, 3, 4, 5, undefined, 10]);
});

test("paginatedButtonArrayToShow ans when 10", function () {
  const result = paginatedButtonArrayToShow({minNum: 1, maxNum: 15,arrayLength: 7, currentPage: 10});
  expect(result).toEqual([1, undefined, 9, 10, 11, undefined, 15]);
});

test("paginatedButtonArrayToShow ans when 11", function () {
  const result = paginatedButtonArrayToShow({minNum: 1, maxNum: 15,arrayLength: 7, currentPage: 11});
  expect(result).toEqual([1, undefined, 11, 12, 13, 14, 15]);
});

test("paginatedButtonArrayToShow ans when 12", function () {
  const result = paginatedButtonArrayToShow({minNum: 1, maxNum: 15,arrayLength: 7, currentPage: 12});
  expect(result).toEqual([1, undefined, 11, 12, 13, 14, 15]);
});

test("paginatedButtonArrayToShow ans when 12 with length 9", function () {
  const result = paginatedButtonArrayToShow({minNum: 1, maxNum: 15,arrayLength: 9, currentPage: 12});
  expect(result).toEqual([1, undefined, 9, 10, 11, 12, 13, 14, 15]);
});

test("paginatedButtonArrayToShow ans when 8 with length 9", function () {
  const result = paginatedButtonArrayToShow({minNum: 1, maxNum: 15,arrayLength: 9, currentPage: 8});
  expect(result).toEqual([1, undefined, 6, 7, 8, 9, 10, undefined, 15]);
});

test("paginatedButtonArrayToShow ans when 8 with even length 8", function () {
  const result = paginatedButtonArrayToShow({minNum: 1, maxNum: 14,arrayLength: 8, currentPage: 8});
  expect(result).toEqual([1, undefined, 6, 7, 8, 9, undefined, 14]);
});

test("paginatedButtonArrayToShow ans when curr 1 with even length 8", function () {
  const result = paginatedButtonArrayToShow({minNum: 1, maxNum: 14,arrayLength: 8, currentPage: 1});
  expect(result).toEqual([1, 2, 3, 4, 5, 6, undefined, 14]);
});

test("paginatedButtonArrayToShow ans when curr 1 with even length 3", function () {
  const result = paginatedButtonArrayToShow({minNum: 1, maxNum: 14,arrayLength: 3, currentPage: 1});
  expect(result).toEqual([1, undefined, 14]);
});
