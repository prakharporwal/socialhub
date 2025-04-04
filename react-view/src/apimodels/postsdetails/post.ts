export type Post = {
  scheduled_post_id: string;
  account_id?: number;
  post_json_string: string;
  post_type: string;
  status: string;
  created_by: string;
  created_at: string;
};