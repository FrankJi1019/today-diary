import {Box} from "@mui/material"

const HTMLBox = (props: {children: string}) => {
  return (
    <Box>
      <div
        dangerouslySetInnerHTML={{__html: props.children}}
      />
    </Box>
  )
}

export default HTMLBox
