import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
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
      <Table size='md' variant="striped">
      <TableCaption>Imperial to metric conversion factors</TableCaption>
        <Thead>
          <Tr>
            <Th>Post Type</Th>
            <Th>Post</Th>
            <Th>Status</Th>
            <Th>Platform</Th>
            <Th>Created By</Th>
            <Th>Created At</Th>
          </Tr>
        </Thead>
        <Tbody fontSize={"sm"} minH={"40vh"}>
          {posts.map((item, idx) => (
            <Tr
              key={item.scheduled_post_id}
              onClick={() => {
                navigate("/app/post/" + item.scheduled_post_id);
              }}
            >
              <Td>{item.post_type}</Td>
              <Td
                maxWidth={"64"}
                wordBreak={"break-word"}
                whiteSpace={"pre-wrap"}
                overflowX={"hidden"}
              >
                {JSON.parse(item.post_json_string).commentary}
              </Td>
              <Td>{item.status}</Td>
              <Td>{""}</Td>
              <Td>{item.created_by}</Td>
              <Td>{item.created_at}</Td>
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
