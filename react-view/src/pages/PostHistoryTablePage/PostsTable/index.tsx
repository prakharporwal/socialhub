import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Post } from "src/apimodels/postsdetails/post";
import PaginationButtons from "./PaginationButtons";

type IPostsTableProps = {
  posts: Post[];
  filter?: string;
};

export default function PostsTable(props: IPostsTableProps): JSX.Element {
  const { posts } = props;
  const navigate = useNavigate();
  const [currPageNum, setCurrPageNum] = useState(1);

  function handlePageChange(increase: boolean) {
    setCurrPageNum(increase ? currPageNum + 1 : currPageNum - 1);
  }

  return (
    <TableContainer overflowX={"hidden"} bgColor={"white"} borderRadius={"lg"}>
      <Table size="md" variant="striped">
        <Thead>
          <Tr>
            <Th>Id</Th>
            <Th>Type</Th>
            <Th>Post</Th>
            <Th>Status</Th>
            <Th>Created By</Th>
          </Tr>
        </Thead>
        <Tbody fontSize={"sm"} minH={"40vh"}>
          {posts.filter((item)=>{
            if(props.filter===undefined) return true;
            if(props.filter==="All") return true;
            return !item.creation_status.localeCompare(props.filter.toUpperCase());
          }).map((item) => (
            <Tr
              key={item.post_id}
              onDoubleClick={() => {
                navigate("/app/post/" + item.post_id);
              }}
            >
              <Td
                maxWidth={"40"}
                wordBreak={"break-word"}
                whiteSpace={"pre-wrap"}
                overflowX={"hidden"}
              >
                {item.post_id}
              </Td>
              <Td>{item.post_type}</Td>
              <Td
                maxWidth={"64"}
                wordBreak={"break-word"}
                whiteSpace={"pre-wrap"}
                overflowX={"hidden"}
              >
                <Text noOfLines={3}>{item.post_text} </Text>
              </Td>
              <Td>{item.creation_status}</Td>
              <Td>{item.user_email}</Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot
          fontSize={"xs"}
          fontWeight={"bold"}
          backgroundColor={"InfoBackground"}
          marginLeft={"auto"}
        >
          <Tr h={4}></Tr>
          <Tr>
            <Td colSpan={5}>
              <PaginationButtons pageCount={10} />
            </Td>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
}
