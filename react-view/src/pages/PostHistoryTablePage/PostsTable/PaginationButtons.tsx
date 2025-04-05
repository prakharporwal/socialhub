import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {
  paginatedButtonArrayToShow,
} from "./util/paginatedArrayToShow";

type PaginationButtonsProps = {
  pageCount: number;
};

const MAX_ARRAY_LENGTH = 7;

/**
 *  This component is used to render the pagination buttons for the posts table
 * It takes the pageCount as a prop and renders the buttons accordingly
 * The pageCount is the total number of pages to be displayed
 *  The buttons are rendered in a horizontal line with the first and last page buttons
 */
export default function PaginationButtons(
  props: PaginationButtonsProps
): JSX.Element {
  const { pageCount } = props;

  const [currentPage, setCurrentPage] = useState(1);
  const displayedPages = paginatedButtonArrayToShow({
    minNum: 1,
    maxNum: 10,
    arrayLength: MAX_ARRAY_LENGTH,
    currentPage,
  });

  const handlePageChange = (page: number) => {
    // Handle page change logic here
    if (page < 1 || page > pageCount) {
      console.error("Invalid page number");
      return;
    }
    setCurrentPage(page);
    console.log("Page changed to:", page);
  };

  return (
    <Flex w="30vw">
      <ButtonGroup w="full">
        <IconButton
          variant={"ghost"}
          icon={<FaChevronLeft />}
          aria-label="previous page"
          onClick={() => handlePageChange(currentPage - 1)}
        ></IconButton>
        {displayedPages.map((page, index) =>
          page ? (
            <Button
              key={index}
              variant={page === currentPage ? "solid" : "ghost"}
              aria-label={"page number " + page}
              onClick={() => handlePageChange(Number(page))}
            >
              {page}
            </Button>
          ) : (
            <Text>...</Text>
          )
        )}
        <IconButton
          variant={"ghost"}
          icon={<FaChevronRight />}
          aria-label="next page"
          onClick={() => handlePageChange(currentPage + 1)}
        ></IconButton>
      </ButtonGroup>
    </Flex>
  );
}
