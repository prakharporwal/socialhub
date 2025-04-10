export type LinkedinPost = {
  scheduled_post_id: string;
  account_id?: number;
  post_json_string: string;
  post_type: string;
  status: string;
  created_by: string;
  created_at: string;
};

export type Post = {
  post_text: string;
  post_id: string;
  post_json_string: string;
  post_type: string;
  creation_status: string;
  post_img_url?: string;
  post_video_url?: string;
  user_email: string
};