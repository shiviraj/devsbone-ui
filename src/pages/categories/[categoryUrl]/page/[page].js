import Loader from '../../../../common/components/Loader'
import { useEffect, useState } from 'react'
import { Box, Pagination, Stack, Typography } from '@mui/material'
import PageError from '../../../../common/components/PageError'
import { useRouter } from 'next/router'
import API from '../../../../API'
import PostView from '../../../../modules/posts/components/PostView'
import SideBar from '../../../../modules/posts/components/SideBar'
import { styled } from '@mui/styles'
import useMedia from '../../../../hooks/useMedia'

const PostDivider = styled('div')(({ theme }) => ({
  border: `1px dashed ${theme.palette.grey[500]}`
}))

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: theme.spacing(104),
  [theme.breakpoints.down('md')]: {
    width: '98%'
  }
}))

const AllPosts = () => {
  const router = useRouter()
  const [posts, setPosts] = useState([])
  const [loader, setLoader] = useState(true)
  const [count, setCount] = useState(0)
  const media = useMedia()
  
  useEffect(() => {
    if (router.query.page) {
      API.categories.getPostsCount(router.query.categoryUrl).then((count) => setCount(Math.ceil(count / 10)))
      API.categories.getPosts(router.query.categoryUrl, router.query.page).catch()
        .then(setPosts)
        .then(() => setLoader(false))
    }
  }, [router.query.page, router.query.categoryUrl])
  
  const handleChange = (_, page) => router.push(`/categories/${router.query.categoryUrl}/page/${page}`).then()
  
  if (loader) {
    return <Loader />
  }
  
  if (posts.length === 0) {
    return <PageError message={'No post found!!'} />
  }
  
  const category = posts[0].categories.find(({ url }) => url === router.query.categoryUrl)
  
  return <Stack direction={media.lg ? 'column' : 'row'} spacing={2} justifyContent={'center'}>
    <Container>
      <Stack mt={2}>
        <Typography variant={'h4'}>Category: {category.name}</Typography>
      </Stack>
      {posts.map((post, index) => <div key={post.postId}>
        <PostView post={post} />
        {index !== posts.length - 1 && <PostDivider />}
      </div>)}
      <Stack alignSelf={'center'} mb={2}>
        {count > 1 &&
        <Pagination color={'primary'} page={+router.query.page} onChange={handleChange} count={count} showFirstButton
                    showLastButton />}
      </Stack>
    </Container>
    <Stack mt={1}>
      <SideBar />
    </Stack>
  </Stack>
}

export default AllPosts
