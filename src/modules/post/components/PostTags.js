import { styled } from '@mui/styles'
import { Stack, Typography } from '@mui/material'

const Tag = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(0.25, 1),
  color: theme.palette.primary.main,
  border: `1px solid ${theme.palette.divider}`
}))

const PostTags = ({ tags }) => {
  if (tags.length === 0) {
    return <></>
  }
  return <Stack direction={'row'} spacing={1} mt={1}>
    <Typography variant={'subtitle1'}>Tags: </Typography>
    {tags.map(({ id, name, url }, index) =>
      <Tag variant={'body1'} key={`${id}-${index}`}>{name}</Tag>)
    }
  </Stack>
}

export default PostTags
