import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { Post } from "src/apimodels/postsdetails/post";

type IPostsTableProps = {
  posts: Post[];
};

export default function PostsTable(props: IPostsTableProps): JSX.Element {
  const { posts } = props;
  const navigate = useNavigate();

  return (
    <TableContainer w={"100%"} px={4}>
      <Table variant="striped" colorScheme={"gray"}>
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
        <Tbody fontSize={"sm"}>
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
        >
          <Tr>
            <Td></Td>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
}
