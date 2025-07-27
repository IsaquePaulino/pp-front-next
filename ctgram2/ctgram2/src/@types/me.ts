type Post = {
    foto: string
    description: string | null
    post_id: string
}

export type Me = {
    posts: Post[]
    username: string
    user_foto: string | null
}